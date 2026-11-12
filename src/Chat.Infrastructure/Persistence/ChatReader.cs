using Chat.Application.Abstractions;
using Chat.Application.Common;
using Chat.Domain.Attachments;
using Chat.Domain.Common;
using Chat.Domain.Conversations;
using Chat.Domain.Messages;
using Chat.Infrastructure.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Chat.Infrastructure.Persistence;

/// <summary>Views for the API. Families are small: a few queries per conversation are cheaper to read than one clever one.</summary>
internal sealed class ChatReader(ChatDbContext db, IMediaLinks links, TimeProvider time) : IChatReader
{
    public async Task<IReadOnlyList<ConversationView>> ConversationsAsync(Guid householdId, Actor actor, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(actor);
        var userId = actor.UserId;
        var conversations = await db.Conversations
            .Where(c => c.HouseholdId == householdId
                && (c.Kind == ConversationKind.Household || c.Participants.Any(p => p.UserId == userId)))
            .AsNoTracking()
            .ToListAsync(cancellationToken);
        var ids = conversations.Select(c => c.Id).ToList();
        var markers = await db.ReadMarkers.Where(m => ids.Contains(m.ConversationId)).AsNoTracking().ToListAsync(cancellationToken);
        var mutes = await db.Mutes.Where(m => m.UserId == userId && ids.Contains(m.ConversationId)).AsNoTracking().ToListAsync(cancellationToken);
        var now = time.GetUtcNow();

        var views = new List<ConversationView>(conversations.Count);
        foreach (var conversation in conversations)
        {
            var mine = markers.FirstOrDefault(m => m.ConversationId == conversation.Id && m.UserId == userId);
            var others = conversation.Kind == ConversationKind.Direct
                ? markers.FirstOrDefault(m => m.ConversationId == conversation.Id && m.UserId != userId)
                : null;
            var mute = mutes.FirstOrDefault(m => m.ConversationId == conversation.Id);
            var readsFrom = conversation.ReadsFrom(actor);
            var unread = await UnreadInAsync(conversation.Id, userId, mine?.LastReadSentAt, readsFrom, cancellationToken);

            views.Add(new ConversationView(
                conversation.Id,
                conversation.Kind,
                conversation.Kind == ConversationKind.Household ? Conversation.HouseholdName : conversation.Name?.Value,
                conversation.KeeperId,
                conversation.Participants.Select(p => p.UserId).ToList(),
                conversation.CreatedAt,
                conversation.LastMessageAt,
                conversation.IsArchived,
                unread,
                mine?.LastReadMessageId,
                others?.LastReadMessageId,
                mute?.IsActive(now) ?? false,
                mute?.IsActive(now) == true ? mute.Until : null,
                readsFrom));
        }

        return views
            .OrderBy(v => v.Kind != ConversationKind.Household)
            .ThenByDescending(v => v.LastMessageAt ?? v.CreatedAt)
            .ToList();
    }

    public async Task<UnreadView> UnreadAsync(Guid householdId, Actor actor, CancellationToken cancellationToken)
    {
        var conversations = await ConversationsAsync(householdId, actor, cancellationToken);
        return new UnreadView(conversations.Sum(c => c.Unread), conversations.Count(c => c.Unread > 0));
    }

    public async Task<IReadOnlyList<MessageView>> MessagesAsync(
        Guid conversationId, DateTimeOffset? readsFrom, MessagePage page, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(page);
        var query = db.Messages.Where(m => m.ConversationId == conversationId && (readsFrom == null || m.SentAt >= readsFrom));

        List<Message> found;
        if (page.Before is { } before || page.After is not null)
        {
            var cursorId = page.Before ?? page.After!.Value;
            var cursor = await db.Messages
                .Where(m => m.Id == cursorId && m.ConversationId == conversationId)
                .Select(m => (long?)EF.Property<long>(m, MessageConfiguration.Number))
                .FirstOrDefaultAsync(cancellationToken);
            if (cursor is not { } number)
            {
                return [];
            }

            found = page.Before is not null
                ? await query.Where(m => EF.Property<long>(m, MessageConfiguration.Number) < number)
                    .OrderByDescending(m => EF.Property<long>(m, MessageConfiguration.Number)).Take(page.Limit)
                    .AsNoTracking().ToListAsync(cancellationToken)
                : await query.Where(m => EF.Property<long>(m, MessageConfiguration.Number) > number)
                    .OrderBy(m => EF.Property<long>(m, MessageConfiguration.Number)).Take(page.Limit)
                    .AsNoTracking().ToListAsync(cancellationToken);
        }
        else
        {
            found = await query.OrderByDescending(m => EF.Property<long>(m, MessageConfiguration.Number)).Take(page.Limit)
                .AsNoTracking().ToListAsync(cancellationToken);
        }

        if (page.After is null)
        {
            found.Reverse();
        }

        return await ViewsAsync(found, readsFrom, cancellationToken);
    }

    public async Task<MessageView?> MessageAsync(Guid messageId, DateTimeOffset? readsFrom, CancellationToken cancellationToken)
    {
        var message = await db.Messages.AsNoTracking().FirstOrDefaultAsync(m => m.Id == messageId, cancellationToken);
        return message is null || !message.IsVisibleFrom(readsFrom)
            ? null
            : (await ViewsAsync([message], readsFrom, cancellationToken))[0];
    }

    private Task<int> UnreadInAsync(
        Guid conversationId, Guid userId, DateTimeOffset? readUpTo, DateTimeOffset? readsFrom, CancellationToken cancellationToken) =>
        db.Messages.CountAsync(
            m => m.ConversationId == conversationId
                && m.AuthorId != userId
                && m.DeletedAt == null
                && (readUpTo == null || m.SentAt > readUpTo)
                && (readsFrom == null || m.SentAt >= readsFrom),
            cancellationToken);

    private async Task<IReadOnlyList<MessageView>> ViewsAsync(
        IReadOnlyList<Message> messages, DateTimeOffset? readsFrom, CancellationToken cancellationToken)
    {
        var attachmentIds = messages.SelectMany(m => m.AttachmentIds).Distinct().ToList();
        var attachments = attachmentIds.Count == 0
            ? new Dictionary<Guid, Attachment>()
            : await db.Attachments.Where(a => attachmentIds.Contains(a.Id)).AsNoTracking().ToDictionaryAsync(a => a.Id, cancellationToken);

        var replyIds = messages.Where(m => m.ReplyToId is not null).Select(m => m.ReplyToId!.Value).Distinct().ToList();
        var replies = replyIds.Count == 0
            ? new Dictionary<Guid, Message>()
            : await db.Messages.Where(m => replyIds.Contains(m.Id)).AsNoTracking().ToDictionaryAsync(m => m.Id, cancellationToken);

        return messages.Select(m => new MessageView(
                m.Id,
                m.ConversationId,
                m.AuthorId,
                m.AuthorKind,
                m.ClientMessageId,
                m.Text?.Value,
                m.ReplyToId is { } replyId ? Quote(replyId, replies.GetValueOrDefault(replyId), readsFrom) : null,
                m.SentVia,
                m.SentAt,
                m.EditedAt,
                m.IsDeleted,
                m.AttachmentIds.Where(attachments.ContainsKey).Select(id => AttachmentView.From(attachments[id], links)).ToList(),
                m.Reactions
                    .GroupBy(r => r.Emoji)
                    .OrderBy(g => g.Min(r => r.At))
                    .Select(g => new ReactionView(g.Key, g.OrderBy(r => r.At).Select(r => r.UserId).ToList()))
                    .ToList(),
                m.Actions))
            .ToList();
    }

    private static MessageQuoteView Quote(Guid id, Message? message, DateTimeOffset? readsFrom)
    {
        if (message is null || !message.IsVisibleFrom(readsFrom))
        {
            return new MessageQuoteView(id, false, null, null, 0, false);
        }

        var text = message.Text?.Value;
        if (text is { Length: > MessageQuoteView.MaxLength })
        {
            text = text[..MessageQuoteView.MaxLength];
        }

        return new MessageQuoteView(id, true, message.AuthorId, text, message.AttachmentIds.Count, message.IsDeleted);
    }
}

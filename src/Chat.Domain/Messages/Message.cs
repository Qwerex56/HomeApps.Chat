using Chat.Domain.Attachments;
using Chat.Domain.Common;
using Chat.Domain.Conversations;
using FluentResults;

namespace Chat.Domain.Messages;

/// <summary>
/// One message in a conversation (plan section 2): Markdown text, photos and videos, or both. Its conversation decides who
/// reads and writes; the message adds the rules about its author. Ids are UUIDv7, so they sort by time.
/// </summary>
public sealed class Message
{
    /// <summary>C2: at most 10 photos and videos in one message.</summary>
    public const int MaxAttachments = 10;

    private readonly List<Guid> _attachmentIds = [];
    private readonly List<Reaction> _reactions = [];

    private Message() { }

    private Message(Guid id, Conversation conversation, Guid authorId, MessageText? text, Guid? replyToId, Guid clientMessageId,
        SentVia via, DateTimeOffset now)
    {
        Id = id;
        ConversationId = conversation.Id;
        HouseholdId = conversation.HouseholdId;
        AuthorId = authorId;
        Text = text;
        ReplyToId = replyToId;
        ClientMessageId = clientMessageId;
        SentVia = via;
        SentAt = now;
    }

    public Guid Id { get; private set; }

    public Guid ConversationId { get; private set; }

    public Guid HouseholdId { get; private set; }

    public Guid AuthorId { get; private set; }

    /// <summary><c>null</c> for photos without words, and for a deleted message.</summary>
    public MessageText? Text { get; private set; }

    /// <summary>The message this one answers, from the same conversation. It may be deleted or too old for a guest by now.</summary>
    public Guid? ReplyToId { get; private set; }

    /// <summary>Chosen by the sender's device: sending again after a lost answer finds this message instead of a copy.</summary>
    public Guid ClientMessageId { get; private set; }

    public SentVia SentVia { get; private set; }

    public MessageEncryption Encryption { get; private set; }

    public DateTimeOffset SentAt { get; private set; }

    /// <summary>Shown as "(edytowano)" (C6).</summary>
    public DateTimeOffset? EditedAt { get; private set; }

    /// <summary>Shown as "Wiadomość usunięta"; the text, files and reactions are gone.</summary>
    public DateTimeOffset? DeletedAt { get; private set; }

    public IReadOnlyList<Guid> AttachmentIds => _attachmentIds;

    public IReadOnlyList<Reaction> Reactions => _reactions;

    public bool IsDeleted => DeletedAt is not null;

    /// <summary>
    /// Writes into <paramref name="conversation"/>: text, attachments or both, perhaps answering another message. The
    /// attachments must be the author's own and ready; they become part of the message.
    /// </summary>
    public static Result<Message> Send(
        Conversation conversation,
        Actor actor,
        string? text,
        IReadOnlyList<Attachment> attachments,
        Message? replyTo,
        Guid clientMessageId,
        SentVia via,
        TimeProvider time)
    {
        ArgumentNullException.ThrowIfNull(conversation);
        ArgumentNullException.ThrowIfNull(actor);
        ArgumentNullException.ThrowIfNull(attachments);
        ArgumentNullException.ThrowIfNull(time);
        if (clientMessageId == Guid.Empty)
        {
            throw new ArgumentException("The client message id cannot be empty.", nameof(clientMessageId));
        }

        var allowed = conversation.CanWrite(actor);
        if (allowed.IsFailed)
        {
            return allowed.ToResult<Message>();
        }

        var validText = MessageText.Create(text);
        if (validText.IsFailed)
        {
            return validText.ToResult<Message>();
        }

        var files = attachments.DistinctBy(a => a.Id).ToList();
        if (validText.Value is null && files.Count == 0)
        {
            return Result.Fail<Message>(ChatErrors.MessageEmpty);
        }

        if (files.Count > MaxAttachments)
        {
            return Result.Fail<Message>(ChatErrors.TooManyAttachments);
        }

        if (replyTo is not null && (replyTo.ConversationId != conversation.Id || !replyTo.IsVisibleFrom(conversation.ReadsFrom(actor))))
        {
            return Result.Fail<Message>(ChatErrors.ReplyInvalid);
        }

        var attachable = Result.Merge(files.Select(f => f.CanAttach(conversation.HouseholdId, actor)).ToArray());
        if (attachable.IsFailed)
        {
            return attachable.ToResult<Message>();
        }

        var now = time.GetUtcNow();
        var message = new Message(Guid.CreateVersion7(now), conversation, actor.UserId, validText.Value, replyTo?.Id, clientMessageId, via, now);
        foreach (var file in files)
        {
            file.AttachTo(message.Id, conversation.HouseholdId, actor);
            message._attachmentIds.Add(file.Id);
        }

        conversation.MessageArrived(now);
        return message;
    }

    /// <summary>Whether someone who sees the conversation from <paramref name="readsFrom"/> on sees this message (C3).</summary>
    public bool IsVisibleFrom(DateTimeOffset? readsFrom) => readsFrom is null || SentAt >= readsFrom;

    /// <summary>The author changes the text any time (C6); attachments stay as they were.</summary>
    public Result Edit(Conversation conversation, Actor actor, string? text, TimeProvider time)
    {
        ArgumentNullException.ThrowIfNull(time);
        var allowed = CanChange(conversation, actor);
        if (allowed.IsFailed)
        {
            return allowed;
        }

        if (AuthorId != actor.UserId)
        {
            return Result.Fail(ChatErrors.NotAuthor);
        }

        var validText = MessageText.Create(text);
        if (validText.IsFailed)
        {
            return validText.ToResult();
        }

        if (validText.Value is null && _attachmentIds.Count == 0)
        {
            return Result.Fail(ChatErrors.MessageEmpty);
        }

        if (validText.Value?.Value != Text?.Value)
        {
            Text = validText.Value;
            EditedAt = time.GetUtcNow();
        }

        return Result.Ok();
    }

    /// <summary>
    /// The author deletes their message any time; a moderator deletes anyone's in the household's conversation, never
    /// in rooms or direct ones (C6). What stays is "Wiadomość usunięta". Returns the attachments whose files must go.
    /// </summary>
    public Result<IReadOnlyList<Guid>> Delete(Conversation conversation, Actor actor, TimeProvider time)
    {
        ArgumentNullException.ThrowIfNull(conversation);
        ArgumentNullException.ThrowIfNull(time);
        var allowed = CanSee(conversation, actor);
        if (allowed.IsFailed)
        {
            return allowed.ToResult<IReadOnlyList<Guid>>();
        }

        var moderates = actor.Moderates && conversation.Kind == ConversationKind.Household;
        if (AuthorId != actor.UserId && !moderates)
        {
            return Result.Fail<IReadOnlyList<Guid>>(ChatErrors.NotAuthor);
        }

        if (IsDeleted)
        {
            return Result.Fail<IReadOnlyList<Guid>>(ChatErrors.MessageDeleted);
        }

        if (conversation.IsArchived)
        {
            return Result.Fail<IReadOnlyList<Guid>>(ChatErrors.ConversationArchived);
        }

        return Clear(time);
    }

    /// <summary>The author's account was erased (<c>UserErased</c>, C5): text and files go, "Wiadomość usunięta" stays.</summary>
    public IReadOnlyList<Guid> AuthorErased(TimeProvider time)
    {
        ArgumentNullException.ThrowIfNull(time);
        return IsDeleted ? [] : Clear(time);
    }

    /// <summary>One emoji per person once; giving it again changes nothing.</summary>
    public Result React(Conversation conversation, Actor actor, string? emoji, TimeProvider time)
    {
        ArgumentNullException.ThrowIfNull(time);
        var allowed = CanChange(conversation, actor);
        if (allowed.IsFailed)
        {
            return allowed;
        }

        if (!Emoji.IsValid(emoji))
        {
            return Result.Fail(ChatErrors.ReactionInvalid);
        }

        if (!_reactions.Any(r => r.UserId == actor.UserId && r.Emoji == emoji))
        {
            _reactions.Add(new Reaction(emoji!, actor.UserId, time.GetUtcNow()));
        }

        return Result.Ok();
    }

    public Result Unreact(Conversation conversation, Actor actor, string? emoji)
    {
        var allowed = CanChange(conversation, actor);
        if (allowed.IsFailed)
        {
            return allowed;
        }

        _reactions.RemoveAll(r => r.UserId == actor.UserId && r.Emoji == emoji);
        return Result.Ok();
    }

    /// <summary>An erased account's reactions disappear from everyone's messages (C5).</summary>
    public void RemoveReactionsOf(Guid userId) => _reactions.RemoveAll(r => r.UserId == userId);

    private Result CanSee(Conversation conversation, Actor actor)
    {
        ArgumentNullException.ThrowIfNull(conversation);
        ArgumentNullException.ThrowIfNull(actor);
        if (conversation.Id != ConversationId)
        {
            throw new ArgumentException("The message belongs to another conversation.", nameof(conversation));
        }

        var readable = conversation.CanRead(actor);
        if (readable.IsFailed)
        {
            return readable;
        }

        return IsVisibleFrom(conversation.ReadsFrom(actor)) ? Result.Ok() : Result.Fail(ChatErrors.MessageNotFound);
    }

    private Result CanChange(Conversation conversation, Actor actor)
    {
        var visible = CanSee(conversation, actor);
        if (visible.IsFailed)
        {
            return visible;
        }

        var writable = conversation.CanWrite(actor);
        if (writable.IsFailed)
        {
            return writable;
        }

        return IsDeleted ? Result.Fail(ChatErrors.MessageDeleted) : Result.Ok();
    }

    private List<Guid> Clear(TimeProvider time)
    {
        var files = _attachmentIds.ToList();
        Text = null;
        _attachmentIds.Clear();
        _reactions.Clear();
        DeletedAt = time.GetUtcNow();
        return files;
    }
}

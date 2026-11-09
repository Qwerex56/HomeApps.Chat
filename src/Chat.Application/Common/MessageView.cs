using Chat.Domain.Messages;

namespace Chat.Application.Common;

/// <param name="Text">Markdown as typed; <c>null</c> for attachments only or a deleted message.</param>
public sealed record MessageView(
    Guid Id,
    Guid ConversationId,
    Guid AuthorId,
    Guid ClientMessageId,
    string? Text,
    MessageQuoteView? ReplyTo,
    SentVia SentVia,
    DateTimeOffset SentAt,
    DateTimeOffset? EditedAt,
    bool Deleted,
    IReadOnlyList<AttachmentView> Attachments,
    IReadOnlyList<ReactionView> Reactions);

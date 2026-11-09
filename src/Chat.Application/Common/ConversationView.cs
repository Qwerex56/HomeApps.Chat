using Chat.Domain.Conversations;

namespace Chat.Application.Common;

/// <param name="Name">"Dom", the room's name, or <c>null</c> for a direct conversation (the UI shows the other person).</param>
/// <param name="Unread">Messages of others after <paramref name="LastReadMessageId"/>.</param>
/// <param name="OtherReadMessageId">C7, direct conversations only: how far the other person has read.</param>
/// <param name="MutedUntil">With <paramref name="Muted"/>: <c>null</c> means for good.</param>
/// <param name="ReadsFrom">A guest sees nothing older (C3).</param>
public sealed record ConversationView(
    Guid Id,
    ConversationKind Kind,
    string? Name,
    Guid? KeeperId,
    IReadOnlyList<Guid> ParticipantIds,
    DateTimeOffset CreatedAt,
    DateTimeOffset? LastMessageAt,
    bool Archived,
    int Unread,
    Guid? LastReadMessageId,
    Guid? OtherReadMessageId,
    bool Muted,
    DateTimeOffset? MutedUntil,
    DateTimeOffset? ReadsFrom);

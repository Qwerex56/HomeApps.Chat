namespace Chat.Domain.Mutes;

/// <summary>
/// One person silenced one conversation (plan 5, "Wycisz"): no push notifications from it until <see cref="Until"/>, or
/// for good. Unread counts stay. Who may read the conversation is checked before.
/// </summary>
public sealed class Mute
{
    private Mute() { }

    private Mute(Guid conversationId, Guid userId, DateTimeOffset? until)
    {
        ConversationId = conversationId;
        UserId = userId;
        Until = until;
    }

    public Guid ConversationId { get; private set; }

    public Guid UserId { get; private set; }

    /// <summary><c>null</c>: until they unmute it.</summary>
    public DateTimeOffset? Until { get; private set; }

    public static Mute Start(Guid conversationId, Guid userId, DateTimeOffset? until) => new(conversationId, userId, until);

    public void Change(DateTimeOffset? until) => Until = until;

    public bool IsActive(DateTimeOffset now) => Until is null || Until > now;
}

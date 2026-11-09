using Chat.Domain.Messages;

namespace Chat.Domain.ReadMarkers;

/// <summary>
/// How far one person has read one conversation: unread counts come from it, and in a direct conversation "Przeczytane"
/// under the last message (C7). It only moves forward, so an older tab cannot take it back.
/// </summary>
public sealed class ReadMarker
{
    private ReadMarker() { }

    private ReadMarker(Guid conversationId, Guid userId, Message message, DateTimeOffset now)
    {
        ConversationId = conversationId;
        UserId = userId;
        LastReadMessageId = message.Id;
        LastReadSentAt = message.SentAt;
        ReadAt = now;
    }

    public Guid ConversationId { get; private set; }

    public Guid UserId { get; private set; }

    public Guid LastReadMessageId { get; private set; }

    /// <summary>The read message's time: what is newer is unread.</summary>
    public DateTimeOffset LastReadSentAt { get; private set; }

    public DateTimeOffset ReadAt { get; private set; }

    /// <summary>The first time someone reads a conversation. Who may read it is checked before.</summary>
    public static ReadMarker Start(Guid userId, Message message, TimeProvider time)
    {
        ArgumentNullException.ThrowIfNull(message);
        ArgumentNullException.ThrowIfNull(time);
        return new ReadMarker(message.ConversationId, userId, message, time.GetUtcNow());
    }

    /// <summary>Moves to <paramref name="message"/> if it is newer than what was read; returns whether it moved.</summary>
    public bool MoveTo(Message message, TimeProvider time)
    {
        ArgumentNullException.ThrowIfNull(message);
        ArgumentNullException.ThrowIfNull(time);
        if (message.ConversationId != ConversationId)
        {
            throw new ArgumentException("The message belongs to another conversation.", nameof(message));
        }

        if (message.SentAt <= LastReadSentAt)
        {
            return false;
        }

        LastReadMessageId = message.Id;
        LastReadSentAt = message.SentAt;
        ReadAt = time.GetUtcNow();
        return true;
    }

    /// <summary>Whether <paramref name="message"/> counts as unread for this person (their own never does).</summary>
    public bool IsUnread(Message message)
    {
        ArgumentNullException.ThrowIfNull(message);
        return message.AuthorId != UserId && !message.IsDeleted && message.SentAt > LastReadSentAt;
    }
}

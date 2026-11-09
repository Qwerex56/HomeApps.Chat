namespace Chat.Application.Abstractions;

/// <summary>Who has a conversation open right now: they see new messages live and get no push notification (plan 5).</summary>
public interface IPresence
{
    bool IsViewing(Guid userId, Guid conversationId);
}

namespace Chat.Application.Assistant;

/// <summary>The chat's pointer for JARVIS (jarvis-v1.md 5.3): <c>{conversationId}/{messageId}</c> of the message that asked.</summary>
public sealed record AssistantReference(Guid ConversationId, Guid MessageId)
{
    public const string Channel = "chat";

    public override string ToString() => $"{ConversationId}/{MessageId}";

    public static AssistantReference? Parse(string? reference)
    {
        var parts = reference?.Split('/') ?? [];
        return parts.Length == 2 && Guid.TryParse(parts[0], out var conversation) && Guid.TryParse(parts[1], out var message)
            ? new AssistantReference(conversation, message)
            : null;
    }
}

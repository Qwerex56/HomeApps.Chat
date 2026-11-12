namespace Chat.Api.Mcp;

/// <summary>
/// Somewhere a tool can write or read, by the name a person would use: "Dom", a room, or someone, whose direct
/// conversation may not exist yet (<see cref="ConversationId"/> <c>null</c>, <see cref="PersonId"/> set).
/// </summary>
internal sealed record ChatTarget(string Name, Guid? ConversationId, Guid? PersonId)
{
    public Guid Id => ConversationId ?? PersonId ?? Guid.Empty;
}

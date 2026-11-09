namespace Chat.Domain.Conversations;

/// <summary>Someone listed in a room or a direct conversation.</summary>
/// <param name="AddedAt">A guest sees a room's messages from this moment on (C3); others see the whole history (C13).</param>
public sealed record Participant(Guid UserId, DateTimeOffset AddedAt);

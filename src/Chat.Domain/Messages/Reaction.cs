namespace Chat.Domain.Messages;

/// <summary>One person's emoji on a message; each person gives each emoji at most once.</summary>
public sealed record Reaction(string Emoji, Guid UserId, DateTimeOffset At);

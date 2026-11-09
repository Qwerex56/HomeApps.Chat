namespace Chat.Application.Common;

/// <summary>One emoji and who gave it, in order.</summary>
public sealed record ReactionView(string Emoji, IReadOnlyList<Guid> UserIds);

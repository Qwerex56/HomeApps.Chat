namespace Chat.Application.Common;

/// <summary>
/// A small event for connected browsers (plan 5): ids, never content or files, so whoever hears it fetches what they may
/// see. It goes to the household's group (its conversation, everyone watching the household) or to people's own groups.
/// </summary>
public sealed record ChatSignal(string Name, object Payload, Guid? Household, IReadOnlyList<Guid> Users);

using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Households.MemberLeft;

/// <summary>
/// Someone left a household (C5): out of its rooms (the room handed on, an empty one archived), their direct
/// conversations read-only, their open connections stop hearing it. Their messages stay. Sent by the consumer of
/// Households' events, without a user, so it is not an <c>IHouseholdRequest</c>.
/// </summary>
public sealed record MemberLeftCommand(Guid HouseholdId, Guid UserId) : ICommand;

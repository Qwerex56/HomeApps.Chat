using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Contracts.Households;

namespace Chat.Application.Households.MemberRoleChanged;

/// <summary>
/// Someone's role changed: their browser re-reads what it may do (<c>AccessChanged</c>), and a keeper who may no longer
/// write hands their rooms on. Sent by the consumer of Households' events.
/// </summary>
public sealed record MemberRoleChangedCommand(Guid HouseholdId, Guid UserId, HouseholdRole NewRole) : ICommand;

using HomeApps.Contracts.Households;

namespace Chat.Application.Abstractions;

/// <param name="Name">The nickname in the household, otherwise the display name.</param>
public sealed record HouseholdMember(Guid UserId, string Name, HouseholdRole Role, DateTimeOffset JoinedAt);

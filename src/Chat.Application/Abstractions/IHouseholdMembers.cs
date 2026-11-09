namespace Chat.Application.Abstractions;

/// <summary>
/// The household's members from Households (<c>GET /households/{id}/members</c>), asked with the caller's own token: only
/// for callers who may list them (Member and up, so not for guests). The plugin keeps no copy (docs/plugins.md).
/// </summary>
public interface IHouseholdMembers
{
    Task<IReadOnlyList<HouseholdMember>> ListAsync(Guid householdId, CancellationToken cancellationToken);
}

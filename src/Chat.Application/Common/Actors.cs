using Chat.Domain.Common;
using HomeApps.BuildingBlocks.Application.Abstractions;
using HomeApps.Contracts.Households;
using HomeApps.Plugins;
using HomeApps.Plugins.Manifest;

namespace Chat.Application.Common;

/// <summary>
/// The caller as the domain sees them (<see cref="Actor"/>): the id from the token, and from their household role
/// whether they write and moderate, and for a guest from when they read (C3). The membership comes from
/// <see cref="IHouseholdAccess"/>, which the permission check has just asked, so this is a cache hit.
/// </summary>
public sealed class Actors(IHouseholdAccess access, ICurrentUser user, PluginManifest manifest)
{
    public async Task<Actor> GetAsync(Guid householdId, CancellationToken cancellationToken)
    {
        var membership = await access.GetMembershipAsync(householdId, cancellationToken)
            ?? throw new InvalidOperationException("The permission check lets only members through.");
        var writes = membership.Role >= MinRole(ChatPlugin.Write);
        return new Actor(user.RequiredUserId, writes, membership.Role >= MinRole(ChatPlugin.Moderate), writes ? null : membership.JoinedAt);
    }

    /// <summary>The lowest household role with <paramref name="permission"/>, as the manifest says.</summary>
    public HouseholdRole MinRole(string permission) =>
        manifest.FindPermission(permission)?.MinRole
        ?? throw new InvalidOperationException($"The manifest does not declare '{permission}'.");
}

using Chat.Application.Abstractions;
using Chat.Application.Common;
using Microsoft.AspNetCore.SignalR;

namespace Chat.Api.Realtime;

/// <summary><see cref="IRealtime"/> through the hub's groups.</summary>
internal sealed class HubRealtime(IHubContext<ChatHub> hub, ConnectionRegistry registry) : IRealtime
{
    public Task SendAsync(ChatSignal signal, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(signal);
        if (signal.Household is { } householdId)
        {
            return hub.Clients.Group(ChatHub.HouseholdGroup(householdId)).SendAsync(signal.Name, signal.Payload, cancellationToken);
        }

        return signal.Users.Count == 0
            ? Task.CompletedTask
            : hub.Clients.Groups(signal.Users.Select(ChatHub.UserGroup).ToList()).SendAsync(signal.Name, signal.Payload, cancellationToken);
    }

    public async Task EvictAsync(Guid householdId, Guid userId, CancellationToken cancellationToken)
    {
        foreach (var connectionId in registry.Unwatch(householdId, userId))
        {
            await hub.Groups.RemoveFromGroupAsync(connectionId, ChatHub.HouseholdGroup(householdId), cancellationToken);
        }
    }
}

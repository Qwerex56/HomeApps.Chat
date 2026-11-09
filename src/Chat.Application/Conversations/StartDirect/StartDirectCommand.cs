using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Conversations.StartDirect;

/// <summary>The open direct conversation with <paramref name="OtherUserId"/>, created if there is none. Both need <c>chat.direct</c>.</summary>
public sealed record StartDirectCommand(Guid HouseholdId, Guid OtherUserId) : ICommand<Guid>, IHouseholdRequest
{
    public string Permission => ChatPlugin.Direct;
}

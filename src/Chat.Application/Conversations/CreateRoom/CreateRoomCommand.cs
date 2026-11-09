using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Conversations.CreateRoom;

/// <summary>A room with the caller as keeper and people from the household, guests included (C13).</summary>
public sealed record CreateRoomCommand(Guid HouseholdId, string? Name, IReadOnlyList<Guid> ParticipantIds) : ICommand<Guid>, IHouseholdRequest
{
    public string Permission => ChatPlugin.Rooms;
}

using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Conversations.LeaveRoom;

/// <summary>
/// Anyone leaves a room, guests too (C13). The keeper names the next keeper among the others who may write
/// (owner, 2026-11-09); the last one out archives the room.
/// </summary>
public sealed record LeaveRoomCommand(Guid HouseholdId, Guid ConversationId, Guid? SuccessorId) : ICommand, IHouseholdRequest
{
    public string Permission => ChatPlugin.Read;
}

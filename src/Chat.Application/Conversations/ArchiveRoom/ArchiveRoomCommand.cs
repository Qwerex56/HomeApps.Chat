using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Conversations.ArchiveRoom;

/// <summary>Only the keeper (C13); an archived room is read-only.</summary>
public sealed record ArchiveRoomCommand(Guid HouseholdId, Guid ConversationId) : ICommand, IHouseholdRequest
{
    public string Permission => ChatPlugin.Write;
}

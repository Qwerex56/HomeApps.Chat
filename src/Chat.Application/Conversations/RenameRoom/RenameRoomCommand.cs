using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Conversations.RenameRoom;

/// <summary>Only the keeper (C13); the domain says <c>conversation.not_keeper</c>.</summary>
public sealed record RenameRoomCommand(Guid HouseholdId, Guid ConversationId, string? Name) : ICommand, IHouseholdRequest
{
    public string Permission => ChatPlugin.Write;
}

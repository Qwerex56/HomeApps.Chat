using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Conversations.RemoveParticipant;

/// <summary>Only the keeper removes others (C13); everyone else leaves with <c>LeaveRoomCommand</c>.</summary>
public sealed record RemoveParticipantCommand(Guid HouseholdId, Guid ConversationId, Guid UserId) : ICommand, IHouseholdRequest
{
    public string Permission => ChatPlugin.Write;
}

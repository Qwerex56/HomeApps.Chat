using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Conversations.AddParticipants;

/// <summary>Any participant with <c>chat.rooms</c> adds people from the household; they see the whole history (C13).</summary>
public sealed record AddParticipantsCommand(Guid HouseholdId, Guid ConversationId, IReadOnlyList<Guid> UserIds) : ICommand, IHouseholdRequest
{
    public string Permission => ChatPlugin.Rooms;
}

using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Conversations.UnmuteConversation;

public sealed record UnmuteConversationCommand(Guid HouseholdId, Guid ConversationId) : ICommand, IHouseholdRequest
{
    public string Permission => ChatPlugin.Read;
}

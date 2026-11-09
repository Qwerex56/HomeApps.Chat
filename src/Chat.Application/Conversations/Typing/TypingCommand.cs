using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Conversations.Typing;

/// <summary>"… pisze": only a signal to the others, nothing is stored.</summary>
public sealed record TypingCommand(Guid HouseholdId, Guid ConversationId) : ICommand, IHouseholdRequest
{
    public string Permission => ChatPlugin.Write;
}

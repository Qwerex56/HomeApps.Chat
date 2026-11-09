using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Conversations.MuteConversation;

/// <summary>"Wycisz" (plan 5): no push notifications from the conversation until <paramref name="Until"/>, or for good.</summary>
public sealed record MuteConversationCommand(Guid HouseholdId, Guid ConversationId, DateTimeOffset? Until) : ICommand, IHouseholdRequest
{
    public string Permission => ChatPlugin.Read;
}

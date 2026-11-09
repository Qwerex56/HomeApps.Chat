using Chat.Application.Abstractions;
using Chat.Domain.Conversations;
using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Events;

/// <summary>The first switch-on in a household creates its conversation "Dom", in the same transaction (plan 2).</summary>
internal sealed class SeedHouseholdConversation(IConversationRepository conversations, TimeProvider time) : IDomainEventHandler<PluginSwitchedOn>
{
    public Task Handle(DomainEventNotification<PluginSwitchedOn> notification, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(notification);
        var e = notification.DomainEvent;
        if (e.FirstTime)
        {
            conversations.Add(Conversation.CreateForHousehold(e.HouseholdId, time));
        }

        return Task.CompletedTask;
    }
}

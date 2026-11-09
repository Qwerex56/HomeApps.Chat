using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Conversations.MarkRead;

/// <summary>The caller has read their conversation up to <paramref name="MessageId"/>; it never moves back.</summary>
public sealed record MarkReadCommand(Guid HouseholdId, Guid ConversationId, Guid MessageId) : ICommand, IHouseholdRequest
{
    public string Permission => ChatPlugin.Read;
}

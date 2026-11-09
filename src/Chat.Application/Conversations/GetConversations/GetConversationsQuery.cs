using Chat.Application.Common;
using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Conversations.GetConversations;

/// <summary>"Dom" and the caller's own rooms and direct conversations with unread counts; nobody sees others' rooms (C13).</summary>
public sealed record GetConversationsQuery(Guid HouseholdId) : IQuery<IReadOnlyList<ConversationView>>, IHouseholdRequest
{
    public string Permission => ChatPlugin.Read;
}

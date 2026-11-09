using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Conversations.Watch;

/// <summary>
/// A hub connection asks to hear a household (plan 5). Answering it at all is the point: it runs the same permission
/// check as every HTTP request (member, plugin switched on, <c>chat.read</c>).
/// </summary>
public sealed record WatchQuery(Guid HouseholdId) : IQuery<bool>, IHouseholdRequest
{
    public string Permission => ChatPlugin.Read;
}

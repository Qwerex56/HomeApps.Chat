using Chat.Application.Common;
using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Messages.GetUnread;

/// <summary>The badge in the menu and the widget: unread messages in every conversation the caller reads.</summary>
public sealed record GetUnreadQuery(Guid HouseholdId) : IQuery<UnreadView>, IHouseholdRequest
{
    public string Permission => ChatPlugin.Read;
}

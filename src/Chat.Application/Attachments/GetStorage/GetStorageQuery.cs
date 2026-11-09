using Chat.Application.Common;
using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Attachments.GetStorage;

/// <summary>C11: what the household's photos and videos take, for its admins.</summary>
public sealed record GetStorageQuery(Guid HouseholdId) : IQuery<StorageView>, IHouseholdRequest
{
    public string Permission => ChatPlugin.Moderate;
}

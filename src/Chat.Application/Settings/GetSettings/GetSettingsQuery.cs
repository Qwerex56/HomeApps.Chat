using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Settings.GetSettings;

/// <summary>Everyone who reads the chat sees whether JARVIS listens (the <c>@</c> hint shows him only then).</summary>
public sealed record GetSettingsQuery(Guid HouseholdId) : IQuery<SettingsView>, IHouseholdRequest
{
    public string Permission => ChatPlugin.Read;
}

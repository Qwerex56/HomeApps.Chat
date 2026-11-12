using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Settings.ChangeSettings;

/// <summary>The household's Admin turns JARVIS in the chat on or off (JV10).</summary>
public sealed record ChangeSettingsCommand(Guid HouseholdId, bool Assistant) : ICommand<SettingsView>, IHouseholdRequest
{
    public string Permission => ChatPlugin.Settings;
}

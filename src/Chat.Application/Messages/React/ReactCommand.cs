using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Messages.React;

/// <summary>One emoji per person; giving it twice changes nothing.</summary>
public sealed record ReactCommand(Guid HouseholdId, Guid MessageId, string? Emoji) : ICommand, IHouseholdRequest
{
    public string Permission => ChatPlugin.Write;
}

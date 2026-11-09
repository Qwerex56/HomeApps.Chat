using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Messages.Unreact;

public sealed record UnreactCommand(Guid HouseholdId, Guid MessageId, string? Emoji) : ICommand, IHouseholdRequest
{
    public string Permission => ChatPlugin.Write;
}

using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Messages.EditMessage;

/// <summary>The author changes the text any time; it shows "(edytowano)" (C6).</summary>
public sealed record EditMessageCommand(Guid HouseholdId, Guid MessageId, string? Text) : ICommand, IHouseholdRequest
{
    public string Permission => ChatPlugin.Write;
}

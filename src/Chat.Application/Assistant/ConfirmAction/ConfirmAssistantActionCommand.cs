using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Assistant.ConfirmAction;

/// <summary>"Potwierdź" / "Anuluj" on JARVIS's card (JV9): only the person who asked; JARVIS answers with the new card line.</summary>
public sealed record ConfirmAssistantActionCommand(Guid HouseholdId, Guid MessageId, Guid ConfirmationId, bool Approve)
    : ICommand, IHouseholdRequest
{
    public string Permission => ChatPlugin.Write;
}

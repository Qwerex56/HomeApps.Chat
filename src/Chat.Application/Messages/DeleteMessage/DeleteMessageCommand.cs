using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Messages.DeleteMessage;

/// <summary>
/// The author any time; a moderator anyone's in the household's conversation (C6). "Wiadomość usunięta" stays; the text
/// and the files go at once.
/// </summary>
public sealed record DeleteMessageCommand(Guid HouseholdId, Guid MessageId) : ICommand, IHouseholdRequest
{
    public string Permission => ChatPlugin.Write;
}

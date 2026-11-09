using Chat.Domain.Messages;
using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Messages.SendMessage;

/// <summary>
/// Text, attachments uploaded before, or both, perhaps answering a message. Sending again with the same
/// <paramref name="ClientMessageId"/> returns the message already sent (a retry after a lost answer). Returns its id.
/// </summary>
/// <param name="Via">Who typed it: the app, or JARVIS on the person's behalf (MCP, after 1.0).</param>
public sealed record SendMessageCommand(
    Guid HouseholdId,
    Guid ConversationId,
    Guid ClientMessageId,
    string? Text,
    IReadOnlyList<Guid> AttachmentIds,
    Guid? ReplyToId,
    SentVia Via = SentVia.App) : ICommand<Guid>, IHouseholdRequest
{
    public string Permission => ChatPlugin.Write;
}

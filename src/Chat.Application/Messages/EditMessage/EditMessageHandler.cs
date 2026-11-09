using Chat.Application.Abstractions;
using Chat.Application.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Messages.EditMessage;

internal sealed class EditMessageHandler(
    IConversationRepository conversations, IMessageRepository messages, Actors actors, AfterCommit after, TimeProvider time)
    : ICommandHandler<EditMessageCommand>
{
    public async Task<Result> Handle(EditMessageCommand command, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(command.HouseholdId, cancellationToken);
        var found = await messages.FindReadableAsync(conversations, command.HouseholdId, command.MessageId, actor, cancellationToken);
        if (found.IsFailed)
        {
            return found.ToResult();
        }

        var (message, conversation) = found.Value;
        var edited = message.Edit(conversation, actor, command.Text, time);
        if (edited.IsSuccess)
        {
            after.Signal(conversation, SignalNames.MessageEdited, new { command.HouseholdId, ConversationId = conversation.Id, command.MessageId });
        }

        return edited;
    }
}

using Chat.Application.Abstractions;
using Chat.Application.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Messages.DeleteMessage;

internal sealed class DeleteMessageHandler(
    IConversationRepository conversations,
    IMessageRepository messages,
    IAttachmentRepository attachments,
    Actors actors,
    AfterCommit after,
    TimeProvider time)
    : ICommandHandler<DeleteMessageCommand>
{
    public async Task<Result> Handle(DeleteMessageCommand command, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(command.HouseholdId, cancellationToken);
        var found = await messages.FindReadableAsync(conversations, command.HouseholdId, command.MessageId, actor, cancellationToken);
        if (found.IsFailed)
        {
            return found.ToResult();
        }

        var (message, conversation) = found.Value;
        var deleted = message.Delete(conversation, actor, time);
        if (deleted.IsFailed)
        {
            return deleted.ToResult();
        }

        foreach (var attachment in await attachments.ListAsync(deleted.Value, cancellationToken))
        {
            attachments.Remove(attachment);
            after.DeleteFiles(attachment);
        }

        after.Signal(conversation, SignalNames.MessageDeleted, new { command.HouseholdId, ConversationId = conversation.Id, command.MessageId });
        return Result.Ok();
    }
}

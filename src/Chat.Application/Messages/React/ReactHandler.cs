using Chat.Application.Abstractions;
using Chat.Application.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Messages.React;

internal sealed class ReactHandler(
    IConversationRepository conversations, IMessageRepository messages, Actors actors, AfterCommit after, TimeProvider time)
    : ICommandHandler<ReactCommand>
{
    public async Task<Result> Handle(ReactCommand command, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(command.HouseholdId, cancellationToken);
        var found = await messages.FindReadableAsync(conversations, command.HouseholdId, command.MessageId, actor, cancellationToken);
        if (found.IsFailed)
        {
            return found.ToResult();
        }

        var (message, conversation) = found.Value;
        var reacted = message.React(conversation, actor, command.Emoji, time);
        if (reacted.IsSuccess)
        {
            after.Signal(conversation, SignalNames.ReactionChanged, new { command.HouseholdId, ConversationId = conversation.Id, command.MessageId });
        }

        return reacted;
    }
}

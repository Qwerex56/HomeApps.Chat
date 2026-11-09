using Chat.Application.Abstractions;
using Chat.Application.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Messages.Unreact;

internal sealed class UnreactHandler(IConversationRepository conversations, IMessageRepository messages, Actors actors, AfterCommit after)
    : ICommandHandler<UnreactCommand>
{
    public async Task<Result> Handle(UnreactCommand command, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(command.HouseholdId, cancellationToken);
        var found = await messages.FindReadableAsync(conversations, command.HouseholdId, command.MessageId, actor, cancellationToken);
        if (found.IsFailed)
        {
            return found.ToResult();
        }

        var (message, conversation) = found.Value;
        var removed = message.Unreact(conversation, actor, command.Emoji);
        if (removed.IsSuccess)
        {
            after.Signal(conversation, SignalNames.ReactionChanged, new { command.HouseholdId, ConversationId = conversation.Id, command.MessageId });
        }

        return removed;
    }
}

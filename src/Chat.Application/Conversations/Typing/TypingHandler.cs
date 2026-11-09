using Chat.Application.Abstractions;
using Chat.Application.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Conversations.Typing;

internal sealed class TypingHandler(IConversationRepository conversations, Actors actors, AfterCommit after) : ICommandHandler<TypingCommand>
{
    public async Task<Result> Handle(TypingCommand command, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(command.HouseholdId, cancellationToken);
        var conversation = await conversations.FindReadableAsync(command.HouseholdId, command.ConversationId, actor, cancellationToken);
        if (conversation.IsFailed)
        {
            return conversation.ToResult();
        }

        var writable = conversation.Value.CanWrite(actor);
        if (writable.IsSuccess)
        {
            after.Signal(conversation.Value, SignalNames.Typing, new { command.HouseholdId, command.ConversationId, actor.UserId });
        }

        return writable;
    }
}

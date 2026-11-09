using Chat.Application.Abstractions;
using Chat.Application.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Conversations.RemoveParticipant;

internal sealed class RemoveParticipantHandler(IConversationRepository conversations, Actors actors, AfterCommit after)
    : ICommandHandler<RemoveParticipantCommand>
{
    public async Task<Result> Handle(RemoveParticipantCommand command, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(command.HouseholdId, cancellationToken);
        var room = await conversations.FindReadableAsync(command.HouseholdId, command.ConversationId, actor, cancellationToken);
        if (room.IsFailed)
        {
            return room.ToResult();
        }

        var removed = room.Value.RemoveParticipant(actor, command.UserId);
        if (removed.IsSuccess)
        {
            after.Signal(room.Value, SignalNames.ConversationChanged, new { command.HouseholdId, command.ConversationId }, [command.UserId]);
        }

        return removed;
    }
}

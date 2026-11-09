using Chat.Application.Abstractions;
using Chat.Application.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Conversations.ArchiveRoom;

internal sealed class ArchiveRoomHandler(IConversationRepository conversations, Actors actors, AfterCommit after, TimeProvider time)
    : ICommandHandler<ArchiveRoomCommand>
{
    public async Task<Result> Handle(ArchiveRoomCommand command, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(command.HouseholdId, cancellationToken);
        var room = await conversations.FindReadableAsync(command.HouseholdId, command.ConversationId, actor, cancellationToken);
        if (room.IsFailed)
        {
            return room.ToResult();
        }

        var archived = room.Value.Archive(actor, time);
        if (archived.IsSuccess)
        {
            after.Signal(room.Value, SignalNames.ConversationChanged, new { command.HouseholdId, command.ConversationId });
        }

        return archived;
    }
}

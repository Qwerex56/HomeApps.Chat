using Chat.Application.Abstractions;
using Chat.Application.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Conversations.RenameRoom;

internal sealed class RenameRoomHandler(IConversationRepository conversations, Actors actors, AfterCommit after) : ICommandHandler<RenameRoomCommand>
{
    public async Task<Result> Handle(RenameRoomCommand command, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(command.HouseholdId, cancellationToken);
        var room = await conversations.FindReadableAsync(command.HouseholdId, command.ConversationId, actor, cancellationToken);
        if (room.IsFailed)
        {
            return room.ToResult();
        }

        var renamed = room.Value.Rename(actor, command.Name);
        if (renamed.IsSuccess)
        {
            after.Signal(room.Value, SignalNames.ConversationChanged, new { command.HouseholdId, command.ConversationId });
        }

        return renamed;
    }
}

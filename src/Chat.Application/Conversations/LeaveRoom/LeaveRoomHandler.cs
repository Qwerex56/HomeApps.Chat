using Chat.Application.Abstractions;
using Chat.Application.Common;
using Chat.Domain.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Conversations.LeaveRoom;

internal sealed class LeaveRoomHandler(
    IConversationRepository conversations, IHouseholdMembers members, Actors actors, AfterCommit after, TimeProvider time)
    : ICommandHandler<LeaveRoomCommand>
{
    public async Task<Result> Handle(LeaveRoomCommand command, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(command.HouseholdId, cancellationToken);
        var room = await conversations.FindReadableAsync(command.HouseholdId, command.ConversationId, actor, cancellationToken);
        if (room.IsFailed)
        {
            return room.ToResult();
        }

        // A keeper still able to write may list the members (guests may not): the next keeper must be able to write too.
        if (room.Value.KeeperId == actor.UserId && actor.Writes && command.SuccessorId is { } successor)
        {
            var minRole = actors.MinRole(ChatPlugin.Write);
            var household = await members.ListAsync(command.HouseholdId, cancellationToken);
            if (!household.Any(m => m.UserId == successor && m.Role >= minRole))
            {
                return Result.Fail(ChatErrors.SuccessorInvalid);
            }
        }

        var left = room.Value.Leave(actor, command.SuccessorId, time);
        if (left.IsSuccess)
        {
            after.Signal(room.Value, SignalNames.ConversationChanged, new { command.HouseholdId, command.ConversationId }, [actor.UserId]);
        }

        return left;
    }
}

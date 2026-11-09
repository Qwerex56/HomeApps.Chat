using Chat.Application.Abstractions;
using Chat.Application.Common;
using Chat.Domain.Common;
using Chat.Domain.Conversations;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Conversations.CreateRoom;

internal sealed class CreateRoomHandler(
    IConversationRepository conversations, IHouseholdMembers members, Actors actors, AfterCommit after, TimeProvider time)
    : ICommandHandler<CreateRoomCommand, Guid>
{
    public async Task<Result<Guid>> Handle(CreateRoomCommand command, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(command.HouseholdId, cancellationToken);
        var household = (await members.ListAsync(command.HouseholdId, cancellationToken)).Select(m => m.UserId).ToHashSet();
        if (!command.ParticipantIds.All(household.Contains))
        {
            return Result.Fail<Guid>(ChatErrors.ParticipantsInvalid);
        }

        var room = Conversation.CreateRoom(command.HouseholdId, actor, command.Name, command.ParticipantIds, time);
        if (room.IsFailed)
        {
            return room.ToResult<Guid>();
        }

        conversations.Add(room.Value);
        after.Signal(room.Value, SignalNames.ConversationChanged, new { command.HouseholdId, ConversationId = room.Value.Id });
        return room.Value.Id;
    }
}

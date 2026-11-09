using Chat.Application.Abstractions;
using Chat.Application.Common;
using Chat.Domain.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Conversations.AddParticipants;

internal sealed class AddParticipantsHandler(
    IConversationRepository conversations, IHouseholdMembers members, Actors actors, AfterCommit after, TimeProvider time)
    : ICommandHandler<AddParticipantsCommand>
{
    public async Task<Result> Handle(AddParticipantsCommand command, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(command.HouseholdId, cancellationToken);
        var room = await conversations.FindReadableAsync(command.HouseholdId, command.ConversationId, actor, cancellationToken);
        if (room.IsFailed)
        {
            return room.ToResult();
        }

        var household = (await members.ListAsync(command.HouseholdId, cancellationToken)).Select(m => m.UserId).ToHashSet();
        if (!command.UserIds.All(household.Contains))
        {
            return Result.Fail(ChatErrors.ParticipantsInvalid);
        }

        var added = room.Value.AddParticipants(actor, command.UserIds, time);
        if (added.IsFailed)
        {
            return added.ToResult();
        }

        after.Signal(room.Value, SignalNames.ConversationChanged, new { command.HouseholdId, command.ConversationId });
        return Result.Ok();
    }
}

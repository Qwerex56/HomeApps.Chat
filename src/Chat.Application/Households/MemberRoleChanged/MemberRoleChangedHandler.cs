using Chat.Application.Abstractions;
using Chat.Application.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Households.MemberRoleChanged;

internal sealed class MemberRoleChangedHandler(
    IConversationRepository conversations, IMessageRepository messages, Actors actors, AfterCommit after)
    : ICommandHandler<MemberRoleChangedCommand>
{
    public async Task<Result> Handle(MemberRoleChangedCommand command, CancellationToken cancellationToken)
    {
        if (command.NewRole < actors.MinRole(ChatPlugin.Write))
        {
            var kept = (await conversations.ListWithParticipantAsync(command.HouseholdId, command.UserId, cancellationToken))
                .Where(c => c.KeeperId == command.UserId);
            foreach (var room in kept)
            {
                room.KeeperLostWriting(command.UserId, await Successors.PickAsync(room, command.UserId, messages, cancellationToken));
                after.Signal(room, SignalNames.ConversationChanged, new { command.HouseholdId, ConversationId = room.Id });
            }
        }

        after.Signal([command.UserId], SignalNames.AccessChanged, new { command.HouseholdId });
        return Result.Ok();
    }
}

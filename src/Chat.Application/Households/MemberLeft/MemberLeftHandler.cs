using Chat.Application.Abstractions;
using Chat.Application.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Households.MemberLeft;

internal sealed class MemberLeftHandler(
    IConversationRepository conversations, IMessageRepository messages, AfterCommit after, TimeProvider time)
    : ICommandHandler<MemberLeftCommand>
{
    public async Task<Result> Handle(MemberLeftCommand command, CancellationToken cancellationToken)
    {
        foreach (var conversation in await conversations.ListWithParticipantAsync(command.HouseholdId, command.UserId, cancellationToken))
        {
            var successor = conversation.KeeperId == command.UserId
                ? await Successors.PickAsync(conversation, command.UserId, messages, cancellationToken)
                : null;
            conversation.MemberLeft(command.UserId, successor, time);
            after.Signal(conversation, SignalNames.ConversationChanged, new { command.HouseholdId, ConversationId = conversation.Id });
        }

        after.Evict(command.HouseholdId, command.UserId);
        after.Signal([command.UserId], SignalNames.AccessChanged, new { command.HouseholdId });
        return Result.Ok();
    }
}

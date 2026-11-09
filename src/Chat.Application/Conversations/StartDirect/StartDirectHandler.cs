using Chat.Application.Abstractions;
using Chat.Application.Common;
using Chat.Domain.Common;
using Chat.Domain.Conversations;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Conversations.StartDirect;

internal sealed class StartDirectHandler(
    IConversationRepository conversations, IHouseholdMembers members, Actors actors, AfterCommit after, TimeProvider time)
    : ICommandHandler<StartDirectCommand, Guid>
{
    public async Task<Result<Guid>> Handle(StartDirectCommand command, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(command.HouseholdId, cancellationToken);
        var existing = await conversations.FindOpenDirectAsync(
            command.HouseholdId, Conversation.DirectKeyOf(actor.UserId, command.OtherUserId), cancellationToken);
        if (existing is not null)
        {
            return existing.Id;
        }

        var minRole = actors.MinRole(ChatPlugin.Direct);
        var household = await members.ListAsync(command.HouseholdId, cancellationToken);
        if (!household.Any(m => m.UserId == command.OtherUserId && m.Role >= minRole))
        {
            return Result.Fail<Guid>(ChatErrors.DirectWithSelf);
        }

        var direct = Conversation.StartDirect(command.HouseholdId, actor, command.OtherUserId, time);
        if (direct.IsFailed)
        {
            return direct.ToResult<Guid>();
        }

        conversations.Add(direct.Value);
        after.Signal(direct.Value, SignalNames.ConversationChanged, new { command.HouseholdId, ConversationId = direct.Value.Id });
        return direct.Value.Id;
    }
}

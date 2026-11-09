using Chat.Application.Abstractions;
using Chat.Application.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Conversations.UnmuteConversation;

internal sealed class UnmuteConversationHandler(IConversationRepository conversations, IMuteRepository mutes, Actors actors)
    : ICommandHandler<UnmuteConversationCommand>
{
    public async Task<Result> Handle(UnmuteConversationCommand command, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(command.HouseholdId, cancellationToken);
        var conversation = await conversations.FindReadableAsync(command.HouseholdId, command.ConversationId, actor, cancellationToken);
        if (conversation.IsFailed)
        {
            return conversation.ToResult();
        }

        if (await mutes.GetAsync(command.ConversationId, actor.UserId, cancellationToken) is { } mute)
        {
            mutes.Remove(mute);
        }

        return Result.Ok();
    }
}

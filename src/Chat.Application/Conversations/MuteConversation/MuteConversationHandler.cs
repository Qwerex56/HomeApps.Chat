using Chat.Application.Abstractions;
using Chat.Application.Common;
using Chat.Domain.Mutes;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Conversations.MuteConversation;

internal sealed class MuteConversationHandler(IConversationRepository conversations, IMuteRepository mutes, Actors actors)
    : ICommandHandler<MuteConversationCommand>
{
    public async Task<Result> Handle(MuteConversationCommand command, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(command.HouseholdId, cancellationToken);
        var conversation = await conversations.FindReadableAsync(command.HouseholdId, command.ConversationId, actor, cancellationToken);
        if (conversation.IsFailed)
        {
            return conversation.ToResult();
        }

        var mute = await mutes.GetAsync(command.ConversationId, actor.UserId, cancellationToken);
        if (mute is null)
        {
            mutes.Add(Mute.Start(command.ConversationId, actor.UserId, command.Until));
        }
        else
        {
            mute.Change(command.Until);
        }

        return Result.Ok();
    }
}

using Chat.Application.Abstractions;
using Chat.Application.Common;
using Chat.Domain.Common;
using Chat.Domain.Messages;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Abstractions;
using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Contracts.Assistant;

namespace Chat.Application.Assistant.ConfirmAction;

internal sealed class ConfirmAssistantActionHandler(
    IMessageRepository messages, IConversationRepository conversations, Actors actors, IEventBus events, TimeProvider time)
    : ICommandHandler<ConfirmAssistantActionCommand>
{
    public async Task<Result> Handle(ConfirmAssistantActionCommand command, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(command.HouseholdId, cancellationToken);
        var card = await messages.GetAsync(command.HouseholdId, command.MessageId, cancellationToken);
        if (card is null || card.AuthorKind != AuthorKind.Assistant || card.ReplyToId is not { } askedId)
        {
            return Result.Fail(ChatErrors.MessageNotFound);
        }

        var conversation = await conversations.FindReadableAsync(command.HouseholdId, card.ConversationId, actor, cancellationToken);
        if (conversation.IsFailed)
        {
            return conversation.ToResult();
        }

        var asked = await messages.GetAsync(command.HouseholdId, askedId, cancellationToken);
        if (asked is null || asked.AuthorId != actor.UserId)
        {
            return Result.Fail(ChatErrors.AssistantNotAsker);
        }

        if (!card.Actions.Any(a => a.ConfirmationId == command.ConfirmationId && a.Waits(time.GetUtcNow())))
        {
            return Result.Fail(ChatErrors.AssistantActionNotWaiting);
        }

        await events.PublishAsync(
            new AssistantConfirmed(command.ConfirmationId, actor.UserId, command.Approve, AssistantReference.Channel,
                new AssistantReference(card.ConversationId, askedId).ToString()),
            cancellationToken);
        return Result.Ok();
    }
}

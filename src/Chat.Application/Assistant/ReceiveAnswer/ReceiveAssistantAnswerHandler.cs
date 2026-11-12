using Chat.Application.Abstractions;
using Chat.Application.Common;
using Chat.Domain.Messages;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Assistant.ReceiveAnswer;

/// <summary>
/// JARVIS writes as himself under the message that asked him (jarvis-v1.md 5.1), seen by everyone in the conversation,
/// even if it was archived meanwhile. A repeated answer changes nothing. No push: the person who asked watches.
/// </summary>
internal sealed class ReceiveAssistantAnswerHandler(
    IMessageRepository messages, IConversationRepository conversations, AfterCommit after, TimeProvider time)
    : ICommandHandler<ReceiveAssistantAnswerCommand>
{
    public async Task<Result> Handle(ReceiveAssistantAnswerCommand command, CancellationToken cancellationToken)
    {
        if (await messages.FindAsync(command.Reference.MessageId, cancellationToken) is not { } asked
            || asked.ConversationId != command.Reference.ConversationId
            || await conversations.GetAsync(asked.HouseholdId, asked.ConversationId, cancellationToken) is not { } conversation)
        {
            return Result.Ok();
        }

        var replies = await messages.ListAssistantRepliesAsync(asked.Id, cancellationToken);
        if (replies.Any(r => r.ClientMessageId == command.InvocationId))
        {
            return Result.Ok();
        }

        var updated = command.Actions.Count == 1 ? replies.FirstOrDefault(r => r.UpdateAction(command.Actions[0])) : null;
        if (updated is not null)
        {
            after.Signal(conversation, SignalNames.MessageEdited,
                new { asked.HouseholdId, ConversationId = conversation.Id, MessageId = updated.Id });
            return Result.Ok();
        }

        var answer = Message.FromAssistant(conversation, asked, command.InvocationId, command.Text, command.Actions, time);
        messages.Add(answer);
        after.Signal(conversation, SignalNames.MessageSent,
            new { asked.HouseholdId, ConversationId = conversation.Id, MessageId = answer.Id, AuthorId = answer.AuthorId });
        return Result.Ok();
    }
}

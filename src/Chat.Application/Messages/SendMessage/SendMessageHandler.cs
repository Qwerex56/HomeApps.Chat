using Chat.Application.Abstractions;
using Chat.Application.Assistant.AskAssistant;
using Chat.Application.Common;
using Chat.Application.Notifications;
using Chat.Domain.Common;
using Chat.Domain.Messages;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Messages.SendMessage;

internal sealed class SendMessageHandler(
    IConversationRepository conversations,
    IMessageRepository messages,
    IAttachmentRepository attachments,
    Actors actors,
    MessageNotifier notifier,
    AssistantCaller assistant,
    AfterCommit after,
    TimeProvider time)
    : ICommandHandler<SendMessageCommand, Guid>
{
    public async Task<Result<Guid>> Handle(SendMessageCommand command, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(command.HouseholdId, cancellationToken);
        var conversation = await conversations.FindReadableAsync(command.HouseholdId, command.ConversationId, actor, cancellationToken);
        if (conversation.IsFailed)
        {
            return conversation.ToResult<Guid>();
        }

        var sent = await messages.FindSentAsync(command.ConversationId, actor.UserId, command.ClientMessageId, cancellationToken);
        if (sent is not null)
        {
            return sent.Id;
        }

        var files = await attachments.ListAsync(command.AttachmentIds, cancellationToken);
        if (files.Count != command.AttachmentIds.Distinct().Count())
        {
            return Result.Fail<Guid>(ChatErrors.AttachmentNotFound);
        }

        var ordered = command.AttachmentIds.Distinct().Select(id => files.Single(f => f.Id == id)).ToList();
        var replyTo = command.ReplyToId is { } replyId ? await messages.GetAsync(command.HouseholdId, replyId, cancellationToken) : null;
        if (command.ReplyToId is not null && replyTo is null)
        {
            return Result.Fail<Guid>(ChatErrors.ReplyInvalid);
        }

        var message = Message.Send(
            conversation.Value, actor, command.Text, ordered, replyTo, command.ClientMessageId, command.Via, time);
        if (message.IsFailed)
        {
            return message.ToResult<Guid>();
        }

        messages.Add(message.Value);
        after.Signal(conversation.Value, SignalNames.MessageSent,
            new { command.HouseholdId, command.ConversationId, MessageId = message.Value.Id, AuthorId = actor.UserId });
        await notifier.NotifyAsync(conversation.Value, message.Value, ordered, cancellationToken);
        await assistant.AskIfAskedAsync(conversation.Value, message.Value, replyTo, cancellationToken);
        return message.Value.Id;
    }
}

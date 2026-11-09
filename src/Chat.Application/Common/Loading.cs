using Chat.Application.Abstractions;
using Chat.Domain.Common;
using Chat.Domain.Conversations;
using Chat.Domain.Messages;
using FluentResults;

namespace Chat.Application.Common;

internal static class Loading
{
    /// <summary>The conversation when the actor may read it; otherwise <c>conversation.not_found</c>, also for someone else's room.</summary>
    public static async Task<Result<Conversation>> FindReadableAsync(
        this IConversationRepository conversations, Guid householdId, Guid conversationId, Actor actor, CancellationToken cancellationToken)
    {
        var conversation = await conversations.GetAsync(householdId, conversationId, cancellationToken);
        if (conversation is null)
        {
            return Result.Fail<Conversation>(ChatErrors.ConversationNotFound);
        }

        var readable = conversation.CanRead(actor);
        return readable.IsSuccess ? conversation : readable.ToResult<Conversation>();
    }

    /// <summary>
    /// The message with its conversation, when the actor may read both and the message is not older than they see (C3);
    /// otherwise <c>message.not_found</c>.
    /// </summary>
    public static async Task<Result<(Message Message, Conversation Conversation)>> FindReadableAsync(
        this IMessageRepository messages, IConversationRepository conversations, Guid householdId, Guid messageId, Actor actor,
        CancellationToken cancellationToken)
    {
        var message = await messages.GetAsync(householdId, messageId, cancellationToken);
        var conversation = message is null ? null : await conversations.GetAsync(householdId, message.ConversationId, cancellationToken);
        return message is not null
            && conversation is not null
            && conversation.CanRead(actor).IsSuccess
            && message.IsVisibleFrom(conversation.ReadsFrom(actor))
            ? (message, conversation)
            : Result.Fail<(Message, Conversation)>(ChatErrors.MessageNotFound);
    }
}

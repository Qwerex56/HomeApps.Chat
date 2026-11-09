using Chat.Application.Common;
using Chat.Domain.Common;

namespace Chat.Application.Abstractions;

/// <summary>Read views straight from the database; who may read what is decided before (or, for lists, by the query itself).</summary>
public interface IChatReader
{
    /// <summary>The household's conversation and the actor's own rooms and direct conversations, newest first.</summary>
    Task<IReadOnlyList<ConversationView>> ConversationsAsync(Guid householdId, Actor actor, CancellationToken cancellationToken);

    /// <summary>One page of a conversation, oldest first, nothing older than <paramref name="readsFrom"/>.</summary>
    Task<IReadOnlyList<MessageView>> MessagesAsync(
        Guid conversationId, DateTimeOffset? readsFrom, MessagePage page, CancellationToken cancellationToken);

    /// <summary>One message as <see cref="MessagesAsync"/> shows it.</summary>
    Task<MessageView?> MessageAsync(Guid messageId, DateTimeOffset? readsFrom, CancellationToken cancellationToken);

    Task<UnreadView> UnreadAsync(Guid householdId, Actor actor, CancellationToken cancellationToken);
}

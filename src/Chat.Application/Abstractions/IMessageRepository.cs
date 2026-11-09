using Chat.Domain.Messages;

namespace Chat.Application.Abstractions;

/// <summary>Loads and stores <see cref="Message"/>.</summary>
public interface IMessageRepository
{
    Task<Message?> GetAsync(Guid householdId, Guid messageId, CancellationToken cancellationToken);

    /// <summary>The message a client already sent with this id (a retry after a lost answer).</summary>
    Task<Message?> FindSentAsync(Guid conversationId, Guid authorId, Guid clientMessageId, CancellationToken cancellationToken);

    /// <summary>Which of <paramref name="userIds"/> wrote at least one message in the conversation.</summary>
    Task<IReadOnlySet<Guid>> AuthorsAmongAsync(Guid conversationId, IReadOnlyCollection<Guid> userIds, CancellationToken cancellationToken);

    /// <summary>Everything one person wrote, deleted messages left out (<c>UserErased</c>).</summary>
    Task<IReadOnlyList<Message>> ListByAuthorAsync(Guid authorId, CancellationToken cancellationToken);

    /// <summary>Messages carrying a reaction of <paramref name="userId"/> (<c>UserErased</c>).</summary>
    Task<IReadOnlyList<Message>> ListReactedByAsync(Guid userId, CancellationToken cancellationToken);

    void Add(Message message);
}

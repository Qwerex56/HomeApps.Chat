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

    /// <summary>A message by id alone: for JARVIS's answers, which come without a household.</summary>
    Task<Message?> FindAsync(Guid messageId, CancellationToken cancellationToken);

    /// <summary>JARVIS's messages answering <paramref name="askedId"/>: his answer and the cards updated after decisions.</summary>
    Task<IReadOnlyList<Message>> ListAssistantRepliesAsync(Guid askedId, CancellationToken cancellationToken);

    /// <summary>The last <paramref name="count"/> messages before <paramref name="messageId"/>, oldest first, deleted ones left out.</summary>
    Task<IReadOnlyList<Message>> ListBeforeAsync(Guid conversationId, Guid messageId, int count, CancellationToken cancellationToken);

    void Add(Message message);
}

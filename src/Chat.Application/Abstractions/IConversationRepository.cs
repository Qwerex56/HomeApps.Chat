using Chat.Domain.Conversations;

namespace Chat.Application.Abstractions;

/// <summary>Loads and stores <see cref="Conversation"/>. Saving is the unit of work's job.</summary>
public interface IConversationRepository
{
    Task<Conversation?> GetAsync(Guid householdId, Guid conversationId, CancellationToken cancellationToken);

    /// <summary>The open direct conversation of a pair (<see cref="Conversation.DirectKeyOf"/>); an archived one does not count.</summary>
    Task<Conversation?> FindOpenDirectAsync(Guid householdId, string directKey, CancellationToken cancellationToken);

    /// <summary>Rooms and direct conversations listing <paramref name="userId"/>, in one household or (<c>null</c>) everywhere.</summary>
    Task<IReadOnlyList<Conversation>> ListWithParticipantAsync(Guid? householdId, Guid userId, CancellationToken cancellationToken);

    void Add(Conversation conversation);
}

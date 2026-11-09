using Chat.Application.Abstractions;
using Chat.Domain.Conversations;
using Microsoft.EntityFrameworkCore;

namespace Chat.Infrastructure.Persistence;

internal sealed class ConversationRepository(ChatDbContext db) : IConversationRepository
{
    public Task<Conversation?> GetAsync(Guid householdId, Guid conversationId, CancellationToken cancellationToken) =>
        db.Conversations.FirstOrDefaultAsync(c => c.Id == conversationId && c.HouseholdId == householdId, cancellationToken);

    public Task<Conversation?> FindOpenDirectAsync(Guid householdId, string directKey, CancellationToken cancellationToken) =>
        db.Conversations.FirstOrDefaultAsync(
            c => c.HouseholdId == householdId && c.DirectKey == directKey && c.ArchivedAt == null, cancellationToken);

    public async Task<IReadOnlyList<Conversation>> ListWithParticipantAsync(Guid? householdId, Guid userId, CancellationToken cancellationToken) =>
        await db.Conversations
            .Where(c => (householdId == null || c.HouseholdId == householdId) && c.Participants.Any(p => p.UserId == userId))
            .ToListAsync(cancellationToken);

    public void Add(Conversation conversation) => db.Conversations.Add(conversation);
}

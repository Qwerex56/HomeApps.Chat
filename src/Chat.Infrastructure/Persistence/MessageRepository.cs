using Chat.Application.Abstractions;
using Chat.Domain.Messages;
using Microsoft.EntityFrameworkCore;

namespace Chat.Infrastructure.Persistence;

internal sealed class MessageRepository(ChatDbContext db) : IMessageRepository
{
    public Task<Message?> GetAsync(Guid householdId, Guid messageId, CancellationToken cancellationToken) =>
        db.Messages.FirstOrDefaultAsync(m => m.Id == messageId && m.HouseholdId == householdId, cancellationToken);

    public Task<Message?> FindSentAsync(Guid conversationId, Guid authorId, Guid clientMessageId, CancellationToken cancellationToken) =>
        db.Messages.FirstOrDefaultAsync(
            m => m.ConversationId == conversationId && m.AuthorId == authorId && m.ClientMessageId == clientMessageId, cancellationToken);

    public async Task<IReadOnlySet<Guid>> AuthorsAmongAsync(
        Guid conversationId, IReadOnlyCollection<Guid> userIds, CancellationToken cancellationToken) =>
        (await db.Messages
            .Where(m => m.ConversationId == conversationId && userIds.Contains(m.AuthorId))
            .Select(m => m.AuthorId)
            .Distinct()
            .ToListAsync(cancellationToken))
        .ToHashSet();

    public async Task<IReadOnlyList<Message>> ListByAuthorAsync(Guid authorId, CancellationToken cancellationToken) =>
        await db.Messages.Where(m => m.AuthorId == authorId && m.DeletedAt == null).ToListAsync(cancellationToken);

    public async Task<IReadOnlyList<Message>> ListReactedByAsync(Guid userId, CancellationToken cancellationToken) =>
        await db.Messages.Where(m => m.Reactions.Any(r => r.UserId == userId)).ToListAsync(cancellationToken);

    public void Add(Message message) => db.Messages.Add(message);
}

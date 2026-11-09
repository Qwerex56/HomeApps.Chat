using Chat.Application.Abstractions;
using Chat.Domain.Mutes;
using Microsoft.EntityFrameworkCore;

namespace Chat.Infrastructure.Persistence;

internal sealed class MuteRepository(ChatDbContext db) : IMuteRepository
{
    public Task<Mute?> GetAsync(Guid conversationId, Guid userId, CancellationToken cancellationToken) =>
        db.Mutes.FirstOrDefaultAsync(m => m.ConversationId == conversationId && m.UserId == userId, cancellationToken);

    public async Task<IReadOnlySet<Guid>> ListMutedAsync(Guid conversationId, DateTimeOffset now, CancellationToken cancellationToken) =>
        (await db.Mutes
            .Where(m => m.ConversationId == conversationId && (m.Until == null || m.Until > now))
            .Select(m => m.UserId)
            .ToListAsync(cancellationToken))
        .ToHashSet();

    public async Task<IReadOnlyList<Mute>> ListOfAsync(Guid userId, CancellationToken cancellationToken) =>
        await db.Mutes.Where(m => m.UserId == userId).ToListAsync(cancellationToken);

    public void Add(Mute mute) => db.Mutes.Add(mute);

    public void Remove(Mute mute) => db.Mutes.Remove(mute);
}

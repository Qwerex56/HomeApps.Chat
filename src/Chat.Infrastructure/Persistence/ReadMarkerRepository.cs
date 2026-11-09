using Chat.Application.Abstractions;
using Chat.Domain.ReadMarkers;
using Microsoft.EntityFrameworkCore;

namespace Chat.Infrastructure.Persistence;

internal sealed class ReadMarkerRepository(ChatDbContext db) : IReadMarkerRepository
{
    public Task<ReadMarker?> GetAsync(Guid conversationId, Guid userId, CancellationToken cancellationToken) =>
        db.ReadMarkers.FirstOrDefaultAsync(m => m.ConversationId == conversationId && m.UserId == userId, cancellationToken);

    public async Task<IReadOnlyList<ReadMarker>> ListOfAsync(Guid userId, CancellationToken cancellationToken) =>
        await db.ReadMarkers.Where(m => m.UserId == userId).ToListAsync(cancellationToken);

    public void Add(ReadMarker marker) => db.ReadMarkers.Add(marker);

    public void Remove(ReadMarker marker) => db.ReadMarkers.Remove(marker);
}

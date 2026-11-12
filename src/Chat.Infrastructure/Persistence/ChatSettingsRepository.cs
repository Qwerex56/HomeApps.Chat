using Chat.Application.Abstractions;
using Chat.Domain.Settings;
using Microsoft.EntityFrameworkCore;

namespace Chat.Infrastructure.Persistence;

internal sealed class ChatSettingsRepository(ChatDbContext db) : IChatSettingsRepository
{
    public Task<ChatSettings?> FindAsync(Guid householdId, CancellationToken cancellationToken) =>
        db.Settings.FirstOrDefaultAsync(s => s.HouseholdId == householdId, cancellationToken);

    public void Add(ChatSettings settings) => db.Settings.Add(settings);
}

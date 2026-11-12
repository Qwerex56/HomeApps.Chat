using Chat.Domain.Settings;

namespace Chat.Application.Abstractions;

public interface IChatSettingsRepository
{
    Task<ChatSettings?> FindAsync(Guid householdId, CancellationToken cancellationToken);

    void Add(ChatSettings settings);
}

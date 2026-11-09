using Chat.Domain.Mutes;

namespace Chat.Application.Abstractions;

/// <summary>Loads and stores <see cref="Mute"/>.</summary>
public interface IMuteRepository
{
    Task<Mute?> GetAsync(Guid conversationId, Guid userId, CancellationToken cancellationToken);

    /// <summary>Who has silenced the conversation at <paramref name="now"/>.</summary>
    Task<IReadOnlySet<Guid>> ListMutedAsync(Guid conversationId, DateTimeOffset now, CancellationToken cancellationToken);

    /// <summary>Every mute of one person (<c>UserErased</c>).</summary>
    Task<IReadOnlyList<Mute>> ListOfAsync(Guid userId, CancellationToken cancellationToken);

    void Add(Mute mute);

    void Remove(Mute mute);
}

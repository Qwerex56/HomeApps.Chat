using Chat.Domain.ReadMarkers;

namespace Chat.Application.Abstractions;

/// <summary>Loads and stores <see cref="ReadMarker"/>.</summary>
public interface IReadMarkerRepository
{
    Task<ReadMarker?> GetAsync(Guid conversationId, Guid userId, CancellationToken cancellationToken);

    /// <summary>Every marker of one person (<c>UserErased</c>).</summary>
    Task<IReadOnlyList<ReadMarker>> ListOfAsync(Guid userId, CancellationToken cancellationToken);

    void Add(ReadMarker marker);

    void Remove(ReadMarker marker);
}

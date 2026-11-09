using Chat.Application.Common;

namespace Chat.Application.Abstractions;

/// <summary>Pushes <see cref="ChatSignal"/>s to connected browsers (the SignalR hub). Called only after a commit.</summary>
public interface IRealtime
{
    Task SendAsync(ChatSignal signal, CancellationToken cancellationToken);

    /// <summary>Stops a person's open connections from hearing the household (they left, plan 5).</summary>
    Task EvictAsync(Guid householdId, Guid userId, CancellationToken cancellationToken);
}

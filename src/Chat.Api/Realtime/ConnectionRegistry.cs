using System.Collections.Concurrent;
using Chat.Application.Abstractions;

namespace Chat.Api.Realtime;

/// <summary>
/// The hub's open connections, in memory (one copy of the plugin per home, plan 5; several copies would need a
/// backplane). Answers <see cref="IPresence"/>: a conversation open on any of a person's devices.
/// </summary>
internal sealed class ConnectionRegistry : IPresence
{
    private readonly ConcurrentDictionary<string, Connection> _connections = new(StringComparer.Ordinal);

    public void Connected(string connectionId, Guid userId) => _connections[connectionId] = new Connection(userId);

    public void Disconnected(string connectionId) => _connections.TryRemove(connectionId, out _);

    public void Watch(string connectionId, Guid householdId)
    {
        if (_connections.TryGetValue(connectionId, out var connection))
        {
            connection.Households[householdId] = 0;
        }
    }

    public void Open(string connectionId, Guid? conversationId)
    {
        if (_connections.TryGetValue(connectionId, out var connection))
        {
            connection.OpenConversation = conversationId;
        }
    }

    public bool IsViewing(Guid userId, Guid conversationId) =>
        _connections.Values.Any(c => c.UserId == userId && c.OpenConversation == conversationId);

    /// <summary>The person's connections hearing the household, which stop hearing it from now on.</summary>
    public IReadOnlyList<string> Unwatch(Guid householdId, Guid userId)
    {
        var watching = new List<string>();
        foreach (var (id, connection) in _connections)
        {
            if (connection.UserId == userId && connection.Households.TryRemove(householdId, out _))
            {
                connection.OpenConversation = null;
                watching.Add(id);
            }
        }

        return watching;
    }
}

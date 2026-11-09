using System.Collections.Concurrent;
using System.Text.Json;
using Microsoft.AspNetCore.SignalR.Client;

namespace Chat.Api.Tests;

/// <summary>Collects what one hub connection hears, by signal name, and waits for it.</summary>
internal sealed class Signals
{
    private readonly ConcurrentQueue<(string Name, JsonElement Payload)> _heard = new();

    public Signals(HubConnection connection, params string[] names)
    {
        foreach (var name in names)
        {
            connection.On<JsonElement>(name, payload => _heard.Enqueue((name, payload)));
        }
    }

    public IReadOnlyList<JsonElement> Of(string name) => _heard.Where(h => h.Name == name).Select(h => h.Payload).ToList();

    public async Task<JsonElement> WaitForAsync(string name, Func<JsonElement, bool>? match = null)
    {
        for (var attempt = 0; attempt < 100; attempt++)
        {
            var found = _heard.Where(h => h.Name == name && (match?.Invoke(h.Payload) ?? true)).Select(h => (JsonElement?)h.Payload).FirstOrDefault();
            if (found is { } payload)
            {
                return payload;
            }

            await Task.Delay(50);
        }

        throw new TimeoutException($"No {name} arrived.");
    }

    /// <summary>Gives signals that should not come a moment to arrive anyway.</summary>
    public static Task SettleAsync() => Task.Delay(500);
}

using System.Collections.Concurrent;
using Chat.Application.Abstractions;
using Chat.Infrastructure.Persistence;
using HomeApps.BuildingBlocks.Application.Abstractions;
using HomeApps.BuildingBlocks.Testing;
using HomeApps.Contracts;
using HomeApps.Plugins;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;

namespace Chat.Api.Tests;

/// <summary>The chat plugin on a real Postgres with its migrations, Households faked at the HTTP level, files in a temporary folder.</summary>
public sealed class ChatFactory : HomeAppsApiFactory<Program, ChatDbContext>
{
    public FakeHouseholds Households { get; } = new();

    public MovableTime Time { get; } = new();

    public string MediaRoot { get; } = Path.Combine(Path.GetTempPath(), $"chat-media-{Guid.NewGuid():N}");

    /// <summary>
    /// Every message handed to the outbox. The harness sees outbox deliveries only as serialized bodies, so the tests
    /// read what the plugin published here; the real bus still gets every message.
    /// </summary>
    public ConcurrentQueue<IIntegrationEvent> Published { get; } = new();

    /// <summary>A hub connection as <paramref name="userId"/>, over WebSockets with the token in the query like a browser.</summary>
    public async Task<HubConnection> ConnectAsync(Guid userId)
    {
        var token = TestJwt.CreateToken(userId);
        var connection = new HubConnectionBuilder()
            .WithUrl(new Uri(Server.BaseAddress, "/plugins/chat/hub"), options =>
            {
                options.AccessTokenProvider = () => Task.FromResult<string?>(token);
                options.HttpMessageHandlerFactory = _ => Server.CreateHandler();
                options.Transports = Microsoft.AspNetCore.Http.Connections.HttpTransportType.WebSockets;
                options.WebSocketFactory = async (context, ct) =>
                {
                    // A browser's WebSocket has no headers: the token rides in the query, as the kit expects on the hub.
                    var client = Server.CreateWebSocketClient();
                    return await client.ConnectAsync(new Uri($"{context.Uri}&access_token={token}"), ct);
                };
            })
            .Build();
        await connection.StartAsync();
        return connection;
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        ArgumentNullException.ThrowIfNull(builder);
        builder.UseSetting("Chat:Media:Root", MediaRoot);
        builder.UseSetting("Chat:Media:SigningKey", "test-signing-key-with-at-least-32-characters");
        builder.UseSetting("Chat:RateLimits:Messages", "1000");
        base.ConfigureWebHost(builder);
    }

    protected override void ConfigureServices(IServiceCollection services)
    {
        services.AddHttpClient(nameof(IHouseholdAccess)).ConfigurePrimaryHttpMessageHandler(() => Households);
        services.AddHttpClient(nameof(IHouseholdMembers)).ConfigurePrimaryHttpMessageHandler(() => Households);
        services.AddSingleton<TimeProvider>(Time);

        var real = services.Last(d => d.ServiceType == typeof(IEventBus));
        services.Remove(real);
        services.AddScoped(real.ImplementationType!);
        services.AddScoped<IEventBus>(sp => new RecordingEventBus((IEventBus)sp.GetRequiredService(real.ImplementationType!), Published));
    }

    protected override void Dispose(bool disposing)
    {
        base.Dispose(disposing);
        if (disposing && Directory.Exists(MediaRoot))
        {
            Directory.Delete(MediaRoot, recursive: true);
        }
    }

    private sealed class RecordingEventBus(IEventBus inner, ConcurrentQueue<IIntegrationEvent> published) : IEventBus
    {
        public Task PublishAsync<TMessage>(TMessage message, CancellationToken cancellationToken = default)
            where TMessage : class, IIntegrationEvent
        {
            published.Enqueue(message);
            return inner.PublishAsync(message, cancellationToken);
        }
    }
}

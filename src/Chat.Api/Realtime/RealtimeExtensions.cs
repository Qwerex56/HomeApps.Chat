using System.Text.Json.Serialization;
using Chat.Application.Abstractions;

namespace Chat.Api.Realtime;

internal static class RealtimeExtensions
{
    /// <summary>SignalR with enums as strings like the HTTP API, the connection registry, and the hub behind <see cref="IRealtime"/>.</summary>
    public static IServiceCollection AddChatRealtime(this IServiceCollection services)
    {
        services.AddSignalR().AddJsonProtocol(json => json.PayloadSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
        services.AddSingleton<ConnectionRegistry>();
        services.AddSingleton<IPresence>(sp => sp.GetRequiredService<ConnectionRegistry>());
        services.AddSingleton<IRealtime, HubRealtime>();
        return services;
    }
}

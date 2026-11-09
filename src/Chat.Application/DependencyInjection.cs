using Chat.Application.Common;
using Chat.Application.Notifications;
using HomeApps.Plugins;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Chat.Application;

public static class DependencyInjection
{
    /// <summary>
    /// MediatR with the kit's behaviors and the household permission check, validators, <see cref="Actors"/> and the
    /// work that waits for the commit (<see cref="AfterCommit"/>).
    /// </summary>
    public static IServiceCollection AddChatApplication(this IServiceCollection services)
    {
        // Registered before the kit's behaviors, so it wraps them all and runs only once the transaction has committed.
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(AfterCommitBehavior<,>));
        services.AddHomeAppsPluginApplication(ChatPlugin.Manifest, typeof(DependencyInjection).Assembly);

        services.AddScoped<Actors>();
        services.AddScoped<AfterCommit>();
        services.AddScoped<MessageNotifier>();
        return services;
    }
}

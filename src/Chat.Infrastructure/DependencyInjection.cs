using Chat.Application;
using Chat.Application.Abstractions;
using Chat.Application.Common;
using Chat.Infrastructure.Households;
using Chat.Infrastructure.Jobs;
using Chat.Infrastructure.Media;
using Chat.Infrastructure.Persistence;
using HomeApps.BuildingBlocks.Infrastructure.Options;
using HomeApps.Plugins.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Chat.Infrastructure;

public static class DependencyInjection
{
    /// <summary>
    /// Postgres with the outbox and the plugin switch, the repositories, files and their processing, Households' members
    /// over HTTP, the consumers of Households' and Accounts' events, and the clean-up of unsent uploads.
    /// </summary>
    public static IServiceCollection AddChatInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddHomeAppsPluginInfrastructure<ChatDbContext>(configuration, ChatPlugin.Manifest, typeof(DependencyInjection).Assembly);

        services.AddOptions<ChatLimits>().BindConfiguration(ChatLimits.SectionName);
        services.AddSingleton(sp => sp.GetRequiredService<IOptions<ChatLimits>>().Value);
        services.AddValidatedOptions<MediaOptions>(MediaOptions.SectionName);

        services.AddScoped<IConversationRepository, ConversationRepository>();
        services.AddScoped<IMessageRepository, MessageRepository>();
        services.AddScoped<IAttachmentRepository, AttachmentRepository>();
        services.AddScoped<IReadMarkerRepository, ReadMarkerRepository>();
        services.AddScoped<IMuteRepository, MuteRepository>();
        services.AddScoped<IChatReader, ChatReader>();

        services.AddSingleton<DiskMediaStore>();
        services.AddSingleton<IMediaStore>(sp => sp.GetRequiredService<DiskMediaStore>());
        services.AddSingleton<IMediaLinks, HmacMediaLinks>();
        services.AddScoped<IMediaProcessor, MediaProcessor>();
        services.AddSingleton<MediaBacklog>();
        services.AddSingleton<IMediaProcessing>(sp => sp.GetRequiredService<MediaBacklog>());
        services.AddHostedService<MediaProcessingJob>();
        services.AddHostedService<AbandonedAttachmentsCleanup>();

        services.AddHttpClient<IHouseholdMembers, HouseholdsMembers>((sp, http) =>
            http.BaseAddress = new Uri(sp.GetRequiredService<IOptions<PluginHostingOptions>>().Value.HouseholdsUrl.TrimEnd('/') + "/"));

        return services;
    }
}

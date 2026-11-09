using Chat.Application.Attachments.PurgeAbandonedAttachments;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Chat.Infrastructure.Jobs;

/// <summary>Every hour, removes uploads never sent within a day, with their files. A failed round is logged and tried again.</summary>
internal sealed partial class AbandonedAttachmentsCleanup(IServiceScopeFactory scopes, ILogger<AbandonedAttachmentsCleanup> logger) : BackgroundService
{
    public static readonly TimeSpan Interval = TimeSpan.FromHours(1);

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(Interval);
        do
        {
            await RunOnceAsync(stoppingToken);
        }
        while (await timer.WaitForNextTickAsync(stoppingToken));
    }

    internal async Task RunOnceAsync(CancellationToken cancellationToken)
    {
        try
        {
            await using var scope = scopes.CreateAsyncScope();
            var removed = await scope.ServiceProvider.GetRequiredService<ISender>().Send(new PurgeAbandonedAttachmentsCommand(), cancellationToken);
            if (removed.IsSuccess && removed.Value > 0)
            {
                LogRemoved(removed.Value);
            }
        }
        catch (Exception exception) when (exception is not OperationCanceledException)
        {
            LogFailed(exception);
        }
    }

    [LoggerMessage(Level = LogLevel.Information, Message = "Removed {Count} photos and videos uploaded but never sent.")]
    private partial void LogRemoved(int count);

    [LoggerMessage(Level = LogLevel.Warning, Message = "Removing unsent uploads failed; trying again later.")]
    private partial void LogFailed(Exception exception);
}

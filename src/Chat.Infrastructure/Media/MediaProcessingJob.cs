using Chat.Application.Abstractions;
using Chat.Application.Attachments.ProcessAttachment;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Chat.Infrastructure.Media;

/// <summary>
/// Checks uploads one by one in the background (plan 4.2), in this process: a 30-second video takes a few seconds. At
/// start it takes up what was still pending when the plugin stopped. A failure is logged and the upload stays pending
/// until the next start.
/// </summary>
internal sealed partial class MediaProcessingJob(MediaBacklog backlog, IServiceScopeFactory scopes, ILogger<MediaProcessingJob> logger)
    : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await RequeuePendingAsync(stoppingToken);
        await foreach (var attachmentId in backlog.Reader.ReadAllAsync(stoppingToken))
        {
            try
            {
                await using var scope = scopes.CreateAsyncScope();
                await scope.ServiceProvider.GetRequiredService<ISender>().Send(new ProcessAttachmentCommand(attachmentId), stoppingToken);
            }
            catch (Exception exception) when (exception is not OperationCanceledException)
            {
                LogFailed(attachmentId, exception);
            }
        }
    }

    private async Task RequeuePendingAsync(CancellationToken cancellationToken)
    {
        try
        {
            await using var scope = scopes.CreateAsyncScope();
            foreach (var attachment in await scope.ServiceProvider.GetRequiredService<IAttachmentRepository>().ListPendingAsync(cancellationToken))
            {
                backlog.Enqueue(attachment.Id);
            }
        }
        catch (Exception exception) when (exception is not OperationCanceledException)
        {
            LogRequeueFailed(exception);
        }
    }

    [LoggerMessage(Level = LogLevel.Error, Message = "Checking attachment {AttachmentId} failed; it stays pending.")]
    private partial void LogFailed(Guid attachmentId, Exception exception);

    [LoggerMessage(Level = LogLevel.Warning, Message = "Could not take up the uploads left pending.")]
    private partial void LogRequeueFailed(Exception exception);
}

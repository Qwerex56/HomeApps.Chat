using Chat.Application.Abstractions;
using FluentResults;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Chat.Application.Common;

/// <summary>
/// The outermost behavior: after the kit's transaction behavior has saved, does what <see cref="AfterCommit"/> collected.
/// The changes are already committed, so a failure here is logged, never turned into an error: a missed signal is
/// caught up by the client's next fetch, a left-over file by nobody (it is unreachable without its row).
/// </summary>
internal sealed partial class AfterCommitBehavior<TRequest, TResponse>(
    AfterCommit after, IRealtime realtime, IMediaStore store, IMediaProcessing queue, ILogger<AfterCommitBehavior<TRequest, TResponse>> logger)
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
    where TResponse : ResultBase
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(next);
        var response = await next(cancellationToken);
        if (response.IsSuccess)
        {
            await RunAsync(cancellationToken);
        }

        after.Clear();
        return response;
    }

    private async Task RunAsync(CancellationToken cancellationToken)
    {
        foreach (var id in after.Uploads)
        {
            queue.Enqueue(id);
        }

        try
        {
            if (after.DeletedFiles.Count > 0)
            {
                await store.DeleteAsync(after.DeletedFiles, CancellationToken.None);
            }

            foreach (var (householdId, userId) in after.Evictions)
            {
                await realtime.EvictAsync(householdId, userId, cancellationToken);
            }

            foreach (var signal in after.Signals)
            {
                await realtime.SendAsync(signal, cancellationToken);
            }
        }
        catch (Exception exception) when (exception is not OperationCanceledException)
        {
            LogFailed(typeof(TRequest).Name, exception);
        }
    }

    [LoggerMessage(Level = LogLevel.Warning, Message = "After {Request} was saved, sending signals or deleting files failed.")]
    private partial void LogFailed(string request, Exception exception);
}

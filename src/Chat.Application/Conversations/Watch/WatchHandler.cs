using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Conversations.Watch;

internal sealed class WatchHandler : IQueryHandler<WatchQuery, bool>
{
    public Task<Result<bool>> Handle(WatchQuery query, CancellationToken cancellationToken) => Task.FromResult(Result.Ok(true));
}

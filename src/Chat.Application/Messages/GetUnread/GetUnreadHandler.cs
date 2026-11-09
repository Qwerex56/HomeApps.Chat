using Chat.Application.Abstractions;
using Chat.Application.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Messages.GetUnread;

internal sealed class GetUnreadHandler(IChatReader reader, Actors actors) : IQueryHandler<GetUnreadQuery, UnreadView>
{
    public async Task<Result<UnreadView>> Handle(GetUnreadQuery query, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(query.HouseholdId, cancellationToken);
        return await reader.UnreadAsync(query.HouseholdId, actor, cancellationToken);
    }
}

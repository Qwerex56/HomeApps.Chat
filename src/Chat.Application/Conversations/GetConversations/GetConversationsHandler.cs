using Chat.Application.Abstractions;
using Chat.Application.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Conversations.GetConversations;

internal sealed class GetConversationsHandler(IChatReader reader, Actors actors) : IQueryHandler<GetConversationsQuery, IReadOnlyList<ConversationView>>
{
    public async Task<Result<IReadOnlyList<ConversationView>>> Handle(GetConversationsQuery query, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(query.HouseholdId, cancellationToken);
        return Result.Ok(await reader.ConversationsAsync(query.HouseholdId, actor, cancellationToken));
    }
}

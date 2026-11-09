using Chat.Application.Abstractions;
using Chat.Application.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Messages.GetMessages;

internal sealed class GetMessagesHandler(IConversationRepository conversations, IChatReader reader, Actors actors)
    : IQueryHandler<GetMessagesQuery, IReadOnlyList<MessageView>>
{
    public async Task<Result<IReadOnlyList<MessageView>>> Handle(GetMessagesQuery query, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(query.HouseholdId, cancellationToken);
        var conversation = await conversations.FindReadableAsync(query.HouseholdId, query.ConversationId, actor, cancellationToken);
        if (conversation.IsFailed)
        {
            return conversation.ToResult<IReadOnlyList<MessageView>>();
        }

        var page = new MessagePage(query.Before, query.After, query.Limit);
        return Result.Ok(await reader.MessagesAsync(query.ConversationId, conversation.Value.ReadsFrom(actor), page, cancellationToken));
    }
}

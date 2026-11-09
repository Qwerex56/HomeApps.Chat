using Chat.Application.Abstractions;
using Chat.Application.Common;
using Chat.Domain.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Messages.GetMessage;

internal sealed class GetMessageHandler(IConversationRepository conversations, IMessageRepository messages, IChatReader reader, Actors actors)
    : IQueryHandler<GetMessageQuery, MessageView>
{
    public async Task<Result<MessageView>> Handle(GetMessageQuery query, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(query.HouseholdId, cancellationToken);
        var found = await messages.FindReadableAsync(conversations, query.HouseholdId, query.MessageId, actor, cancellationToken);
        if (found.IsFailed)
        {
            return found.ToResult<MessageView>();
        }

        var view = await reader.MessageAsync(query.MessageId, found.Value.Conversation.ReadsFrom(actor), cancellationToken);
        return view is null ? Result.Fail<MessageView>(ChatErrors.MessageNotFound) : view;
    }
}

using Chat.Api.Http;
using Chat.Application.Common;
using Chat.Application.Messages.DeleteMessage;
using Chat.Application.Messages.EditMessage;
using Chat.Application.Messages.GetMessage;
using Chat.Application.Messages.GetMessages;
using Chat.Application.Messages.GetUnread;
using Chat.Application.Messages.React;
using Chat.Application.Messages.SendMessage;
using Chat.Application.Messages.Unreact;
using HomeApps.BuildingBlocks.Api.Endpoints;
using HomeApps.BuildingBlocks.Api.Results;
using MediatR;

namespace Chat.Api.Endpoints;

/// <summary>Messages (plan 6). Pages are cursors over message ids; the client catches up with <c>after</c>.</summary>
internal sealed class MessageEndpoints : IEndpoint
{
    public const int DefaultLimit = 50;

    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        var household = app.MapGroup("/households/{householdId:guid}").WithTags("Messages");

        household.MapGet("/conversations/{conversationId:guid}/messages", async (Guid householdId, Guid conversationId, Guid? before,
                Guid? after, int? limit, ISender sender, CancellationToken ct) =>
            (await sender.Send(new GetMessagesQuery(householdId, conversationId, before, after, limit ?? DefaultLimit), ct)).ToHttpResult())
            .Produces<IReadOnlyList<MessageView>>();

        household.MapPost("/conversations/{conversationId:guid}/messages", async (Guid householdId, Guid conversationId,
                SendMessageRequest body, ISender sender, CancellationToken ct) =>
            {
                var sent = await sender.Send(
                    new SendMessageCommand(householdId, conversationId, body.ClientMessageId, body.Text, body.AttachmentIds ?? [], body.ReplyToId), ct);
                if (sent.IsFailed)
                {
                    return sent.ToHttpResult();
                }

                return (await sender.Send(new GetMessageQuery(householdId, sent.Value), ct))
                    .ToCreatedHttpResult(view => $"/plugins/chat/api/households/{householdId}/messages/{view.Id}");
            })
            .RequireRateLimiting(RateLimits.Messages)
            .Produces<MessageView>(StatusCodes.Status201Created);

        household.MapGet("/messages/{messageId:guid}", async (Guid householdId, Guid messageId, ISender sender, CancellationToken ct) =>
            (await sender.Send(new GetMessageQuery(householdId, messageId), ct)).ToHttpResult())
            .Produces<MessageView>();

        household.MapPut("/messages/{messageId:guid}", async (Guid householdId, Guid messageId, EditMessageRequest body, ISender sender,
                CancellationToken ct) =>
            (await sender.Send(new EditMessageCommand(householdId, messageId, body.Text), ct)).ToHttpResult());

        household.MapDelete("/messages/{messageId:guid}", async (Guid householdId, Guid messageId, ISender sender, CancellationToken ct) =>
            (await sender.Send(new DeleteMessageCommand(householdId, messageId), ct)).ToHttpResult());

        household.MapPut("/messages/{messageId:guid}/reactions/{emoji}", async (Guid householdId, Guid messageId, string emoji, ISender sender,
                CancellationToken ct) =>
            (await sender.Send(new ReactCommand(householdId, messageId, emoji), ct)).ToHttpResult());

        household.MapDelete("/messages/{messageId:guid}/reactions/{emoji}", async (Guid householdId, Guid messageId, string emoji,
                ISender sender, CancellationToken ct) =>
            (await sender.Send(new UnreactCommand(householdId, messageId, emoji), ct)).ToHttpResult());

        household.MapGet("/unread", async (Guid householdId, ISender sender, CancellationToken ct) =>
            (await sender.Send(new GetUnreadQuery(householdId), ct)).ToHttpResult())
            .Produces<UnreadView>();
    }
}

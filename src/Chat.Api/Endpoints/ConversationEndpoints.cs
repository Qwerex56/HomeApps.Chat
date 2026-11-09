using Chat.Application.Common;
using Chat.Application.Conversations.GetConversations;
using Chat.Application.Conversations.MarkRead;
using Chat.Application.Conversations.MuteConversation;
using Chat.Application.Conversations.StartDirect;
using Chat.Application.Conversations.UnmuteConversation;
using HomeApps.BuildingBlocks.Api.Endpoints;
using HomeApps.BuildingBlocks.Api.Results;
using MediatR;

namespace Chat.Api.Endpoints;

/// <summary>Conversations of one household (plan 6): "Dom", the caller's rooms and direct conversations.</summary>
internal sealed class ConversationEndpoints : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        var conversations = app.MapGroup("/households/{householdId:guid}/conversations").WithTags("Conversations");

        conversations.MapGet("/", async (Guid householdId, ISender sender, CancellationToken ct) =>
            (await sender.Send(new GetConversationsQuery(householdId), ct)).ToHttpResult())
            .Produces<IReadOnlyList<ConversationView>>();

        // The open conversation with that person, the same one every time.
        conversations.MapPost("/direct", async (Guid householdId, StartDirectRequest body, ISender sender, CancellationToken ct) =>
            (await sender.Send(new StartDirectCommand(householdId, body.UserId), ct)).Map(id => new IdResponse(id)).ToHttpResult())
            .Produces<IdResponse>();

        conversations.MapPut("/{conversationId:guid}/read", async (Guid householdId, Guid conversationId, MarkReadRequest body, ISender sender,
                CancellationToken ct) =>
            (await sender.Send(new MarkReadCommand(householdId, conversationId, body.MessageId), ct)).ToHttpResult());

        conversations.MapPut("/{conversationId:guid}/mute", async (Guid householdId, Guid conversationId, MuteRequest body, ISender sender,
                CancellationToken ct) =>
            (await sender.Send(new MuteConversationCommand(householdId, conversationId, body.Until), ct)).ToHttpResult());

        conversations.MapDelete("/{conversationId:guid}/mute", async (Guid householdId, Guid conversationId, ISender sender, CancellationToken ct) =>
            (await sender.Send(new UnmuteConversationCommand(householdId, conversationId), ct)).ToHttpResult());
    }
}

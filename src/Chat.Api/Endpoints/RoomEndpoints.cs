using Chat.Application.Conversations.AddParticipants;
using Chat.Application.Conversations.ArchiveRoom;
using Chat.Application.Conversations.CreateRoom;
using Chat.Application.Conversations.LeaveRoom;
using Chat.Application.Conversations.RemoveParticipant;
using Chat.Application.Conversations.RenameRoom;
using HomeApps.BuildingBlocks.Api.Endpoints;
using HomeApps.BuildingBlocks.Api.Results;
using MediatR;

namespace Chat.Api.Endpoints;

/// <summary>Rooms (C13): created by members, kept by their keeper, left by anyone.</summary>
internal sealed class RoomEndpoints : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        var rooms = app.MapGroup("/households/{householdId:guid}/rooms").WithTags("Rooms");

        rooms.MapPost("/", async (Guid householdId, CreateRoomRequest body, ISender sender, CancellationToken ct) =>
            (await sender.Send(new CreateRoomCommand(householdId, body.Name, body.ParticipantIds ?? []), ct))
            .Map(id => new IdResponse(id))
            .ToCreatedHttpResult(created => $"/plugins/chat/api/households/{householdId}/conversations/{created.Id}"))
            .Produces<IdResponse>(StatusCodes.Status201Created);

        rooms.MapPut("/{conversationId:guid}", async (Guid householdId, Guid conversationId, RenameRoomRequest body, ISender sender,
                CancellationToken ct) =>
            (await sender.Send(new RenameRoomCommand(householdId, conversationId, body.Name), ct)).ToHttpResult());

        rooms.MapPost("/{conversationId:guid}/participants", async (Guid householdId, Guid conversationId, AddParticipantsRequest body,
                ISender sender, CancellationToken ct) =>
            (await sender.Send(new AddParticipantsCommand(householdId, conversationId, body.UserIds ?? []), ct)).ToHttpResult());

        rooms.MapDelete("/{conversationId:guid}/participants/{userId:guid}", async (Guid householdId, Guid conversationId, Guid userId,
                ISender sender, CancellationToken ct) =>
            (await sender.Send(new RemoveParticipantCommand(householdId, conversationId, userId), ct)).ToHttpResult());

        // The keeper names who keeps the room after them (owner, 2026-11-09).
        rooms.MapPost("/{conversationId:guid}/leave", async (Guid householdId, Guid conversationId, LeaveRoomRequest? body, ISender sender,
                CancellationToken ct) =>
            (await sender.Send(new LeaveRoomCommand(householdId, conversationId, body?.SuccessorId), ct)).ToHttpResult());

        rooms.MapPost("/{conversationId:guid}/archive", async (Guid householdId, Guid conversationId, ISender sender, CancellationToken ct) =>
            (await sender.Send(new ArchiveRoomCommand(householdId, conversationId), ct)).ToHttpResult());
    }
}

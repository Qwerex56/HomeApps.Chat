namespace Chat.Api.Endpoints;

internal sealed record CreateRoomRequest(string? Name, IReadOnlyList<Guid> ParticipantIds);

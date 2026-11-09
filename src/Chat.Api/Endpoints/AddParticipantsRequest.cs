namespace Chat.Api.Endpoints;

internal sealed record AddParticipantsRequest(IReadOnlyList<Guid> UserIds);

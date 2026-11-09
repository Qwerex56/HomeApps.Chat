namespace Chat.Api.Endpoints;

internal sealed record SendMessageRequest(Guid ClientMessageId, string? Text, IReadOnlyList<Guid>? AttachmentIds, Guid? ReplyToId);

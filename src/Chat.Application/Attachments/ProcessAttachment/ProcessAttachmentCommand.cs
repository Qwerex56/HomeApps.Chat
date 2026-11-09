using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Attachments.ProcessAttachment;

/// <summary>
/// The background check of one upload (plan 4.2). Sent by the media queue, without a user, so it is not an
/// <c>IHouseholdRequest</c>. Always succeeds once it has looked: a refused file is a state of the attachment, not an error.
/// </summary>
public sealed record ProcessAttachmentCommand(Guid AttachmentId) : ICommand;

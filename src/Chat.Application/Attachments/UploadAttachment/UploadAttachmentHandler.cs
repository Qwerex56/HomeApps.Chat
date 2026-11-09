using Chat.Application.Abstractions;
using Chat.Application.Common;
using Chat.Domain.Attachments;
using Chat.Domain.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Attachments.UploadAttachment;

internal sealed class UploadAttachmentHandler(
    IAttachmentRepository attachments,
    IMediaStore store,
    IMediaLinks links,
    ChatLimits limits,
    Actors actors,
    AfterCommit after,
    TimeProvider time)
    : ICommandHandler<UploadAttachmentCommand, AttachmentView>
{
    public async Task<Result<AttachmentView>> Handle(UploadAttachmentCommand command, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(command.HouseholdId, cancellationToken);
        var attachment = Attachment.Upload(command.HouseholdId, actor, command.ContentType, command.Size, time);
        if (attachment.IsFailed)
        {
            return attachment.ToResult<AttachmentView>();
        }

        var used = await attachments.UsedBytesAsync(command.HouseholdId, cancellationToken);
        if (used + command.Size > limits.StorageBytesPerHousehold)
        {
            return Result.Fail<AttachmentView>(ChatErrors.StorageFull);
        }

        await store.SaveAsync(attachment.Value.Key(MediaVariant.Original), command.Content, cancellationToken);
        attachments.Add(attachment.Value);
        after.Process(attachment.Value);
        return AttachmentView.From(attachment.Value, links);
    }
}

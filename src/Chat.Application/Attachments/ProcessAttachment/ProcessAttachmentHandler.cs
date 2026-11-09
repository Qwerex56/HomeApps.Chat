using Chat.Application.Abstractions;
using Chat.Application.Common;
using Chat.Domain.Attachments;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Attachments.ProcessAttachment;

internal sealed class ProcessAttachmentHandler(IAttachmentRepository attachments, IMediaProcessor processor, AfterCommit after)
    : ICommandHandler<ProcessAttachmentCommand>
{
    public async Task<Result> Handle(ProcessAttachmentCommand command, CancellationToken cancellationToken)
    {
        var attachment = await attachments.GetAsync(command.AttachmentId, cancellationToken);
        if (attachment is null || attachment.Status != AttachmentStatus.Pending)
        {
            return Result.Ok();
        }

        var info = await processor.ProcessAsync(attachment, cancellationToken);
        if (info.IsSuccess)
        {
            attachment.Checked(info.Value);
        }
        else
        {
            attachment.Unreadable();
        }

        if (attachment.Status == AttachmentStatus.Failed)
        {
            after.DeleteFiles(attachment);
        }

        after.Signal([attachment.UploaderId], SignalNames.AttachmentChanged,
            new { attachment.HouseholdId, AttachmentId = attachment.Id, attachment.Status, attachment.FailureCode });
        return Result.Ok();
    }
}

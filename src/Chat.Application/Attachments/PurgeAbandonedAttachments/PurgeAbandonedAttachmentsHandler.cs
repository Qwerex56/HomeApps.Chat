using Chat.Application.Abstractions;
using Chat.Application.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Attachments.PurgeAbandonedAttachments;

internal sealed class PurgeAbandonedAttachmentsHandler(IAttachmentRepository attachments, AfterCommit after, TimeProvider time)
    : ICommandHandler<PurgeAbandonedAttachmentsCommand, int>
{
    public async Task<Result<int>> Handle(PurgeAbandonedAttachmentsCommand command, CancellationToken cancellationToken)
    {
        var abandoned = await attachments.ListAbandonedAsync(time.GetUtcNow(), cancellationToken);
        foreach (var attachment in abandoned)
        {
            attachments.Remove(attachment);
            after.DeleteFiles(attachment);
        }

        return abandoned.Count;
    }
}

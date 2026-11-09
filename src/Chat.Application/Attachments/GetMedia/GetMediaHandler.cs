using Chat.Application.Abstractions;
using Chat.Application.Common;
using Chat.Domain.Attachments;
using Chat.Domain.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Attachments.GetMedia;

internal sealed class GetMediaHandler(IAttachmentRepository attachments) : IQueryHandler<GetMediaQuery, MediaFile>
{
    public async Task<Result<MediaFile>> Handle(GetMediaQuery query, CancellationToken cancellationToken)
    {
        var attachment = await attachments.GetAsync(query.AttachmentId, cancellationToken);
        return attachment is { Status: AttachmentStatus.Ready or AttachmentStatus.Attached }
            ? MediaFiles.For(attachment, query.Variant)
            : Result.Fail<MediaFile>(ChatErrors.AttachmentNotFound);
    }
}

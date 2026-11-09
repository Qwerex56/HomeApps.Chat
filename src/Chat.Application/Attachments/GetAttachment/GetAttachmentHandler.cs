using Chat.Application.Abstractions;
using Chat.Application.Common;
using Chat.Domain.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Abstractions;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Attachments.GetAttachment;

internal sealed class GetAttachmentHandler(IAttachmentRepository attachments, IMediaLinks links, ICurrentUser user)
    : IQueryHandler<GetAttachmentQuery, AttachmentView>
{
    public async Task<Result<AttachmentView>> Handle(GetAttachmentQuery query, CancellationToken cancellationToken)
    {
        var attachment = await attachments.GetAsync(query.AttachmentId, cancellationToken);
        return attachment is not null && attachment.HouseholdId == query.HouseholdId && attachment.UploaderId == user.RequiredUserId
            ? AttachmentView.From(attachment, links)
            : Result.Fail<AttachmentView>(ChatErrors.AttachmentNotFound);
    }
}

using Chat.Application.Abstractions;
using Chat.Domain.Attachments;

namespace Chat.Application.Common;

/// <param name="Description">Plain words for MCP and notifications: "zdjęcie 1600×1200", "film 12 s".</param>
/// <param name="FailureCode">Why it was not accepted, e.g. <c>attachment.too_long</c>.</param>
/// <param name="OriginalUrl">Signed links (plan 4.4), only once checked.</param>
public sealed record AttachmentView(
    Guid Id,
    MediaKind Kind,
    AttachmentStatus Status,
    string ContentType,
    long Size,
    int? Width,
    int? Height,
    double? DurationSeconds,
    string Description,
    string? FailureCode,
    string? OriginalUrl,
    string? PreviewUrl,
    string? ThumbUrl)
{
    public static AttachmentView From(Attachment attachment, IMediaLinks links)
    {
        ArgumentNullException.ThrowIfNull(attachment);
        ArgumentNullException.ThrowIfNull(links);
        var ready = attachment.Status is AttachmentStatus.Ready or AttachmentStatus.Attached;
        return new AttachmentView(
            attachment.Id,
            attachment.Kind,
            attachment.Status,
            attachment.ContentType,
            attachment.Size,
            attachment.Width,
            attachment.Height,
            attachment.Duration?.TotalSeconds,
            attachment.Describe(),
            attachment.FailureCode,
            ready ? links.Link(attachment.Id, MediaVariant.Original) : null,
            ready ? links.Link(attachment.Id, MediaVariant.Preview) : null,
            ready ? links.Link(attachment.Id, MediaVariant.Thumb) : null);
    }
}

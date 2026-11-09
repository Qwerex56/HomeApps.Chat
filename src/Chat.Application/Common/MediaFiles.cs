using Chat.Domain.Attachments;

namespace Chat.Application.Common;

/// <summary>
/// Which file serves which variant, the contract between <c>IMediaProcessor</c> (it writes them) and the media endpoint:
/// previews and thumbnails are JPEG; a video's preview is its (remuxed) original.
/// </summary>
public static class MediaFiles
{
    public const string PictureType = "image/jpeg";

    public static MediaFile For(Attachment attachment, MediaVariant variant)
    {
        ArgumentNullException.ThrowIfNull(attachment);
        return variant switch
        {
            MediaVariant.Preview when attachment.Kind == MediaKind.Video => new MediaFile(attachment.Key(MediaVariant.Original), attachment.ContentType),
            MediaVariant.Original => new MediaFile(attachment.Key(MediaVariant.Original), attachment.ContentType),
            _ => new MediaFile(attachment.Key(variant), PictureType),
        };
    }
}

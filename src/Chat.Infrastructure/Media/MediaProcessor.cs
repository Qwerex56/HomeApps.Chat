using Chat.Application.Abstractions;
using Chat.Domain.Attachments;
using Chat.Domain.Common;
using FluentResults;
using Microsoft.Extensions.Options;

namespace Chat.Infrastructure.Media;

/// <summary>
/// <see cref="IMediaProcessor"/>: tries the file as a photo, then as a video, whatever it claimed to be; the domain then
/// refuses a "photo" that is a video (plan 4.1: the content decides, not the name or the Content-Type).
/// </summary>
internal sealed class MediaProcessor(DiskMediaStore store, IOptions<MediaOptions> options) : IMediaProcessor
{
    public async Task<Result<MediaInfo>> ProcessAsync(Attachment attachment, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(attachment);
        var original = store.PathOf(attachment.Key(MediaVariant.Original));
        if (!File.Exists(original))
        {
            return Result.Fail<MediaInfo>(ChatErrors.AttachmentUnreadable);
        }

        var thumb = store.PathOf(attachment.Key(MediaVariant.Thumb));
        var info = PhotoProcessor.Process(original, store.PathOf(attachment.Key(MediaVariant.Preview)), thumb)
            ?? await VideoProcessor.ProcessAsync(options.Value, original, thumb, cancellationToken);
        return info is null ? Result.Fail<MediaInfo>(ChatErrors.AttachmentUnreadable) : info;
    }
}

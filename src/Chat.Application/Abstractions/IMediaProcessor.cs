using Chat.Application.Common;
using Chat.Domain.Attachments;
using FluentResults;

namespace Chat.Application.Abstractions;

/// <summary>
/// Reads an uploaded original by its content, not its name (plan 4.2), and writes what the conversation shows, as
/// <see cref="MediaFiles"/> describes: photos without EXIF and turned upright, previews and thumbnails, videos remuxed
/// without their metadata (GPS) and a cover frame. A failed result means the file could not be read at all.
/// </summary>
public interface IMediaProcessor
{
    Task<Result<MediaInfo>> ProcessAsync(Attachment attachment, CancellationToken cancellationToken);
}

namespace Chat.Domain.Attachments;

/// <summary>What checking the file's content found (ffprobe for videos, the decoder for photos), not what the browser claimed.</summary>
/// <param name="ContentType">The real type, e.g. <c>video/quicktime</c> for a file sent as <c>video/mp4</c>.</param>
/// <param name="Duration">Videos only.</param>
public sealed record MediaInfo(MediaKind Kind, string ContentType, int Width, int Height, TimeSpan? Duration);

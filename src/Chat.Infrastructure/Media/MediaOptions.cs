using System.ComponentModel.DataAnnotations;

namespace Chat.Infrastructure.Media;

/// <summary>Section <c>Chat:Media</c>.</summary>
public sealed class MediaOptions
{
    public const string SectionName = "Chat:Media";

    /// <summary>The folder of files (C10): the <c>chat_media</c> volume in Docker.</summary>
    [Required]
    public string Root { get; set; } = "/data/media";

    /// <summary>Signs links to files (plan 4.4); <c>CHAT_MEDIA_SIGNING_KEY</c> in <c>.env</c>, at least 32 characters.</summary>
    [Required]
    [MinLength(32)]
    public string SigningKey { get; set; } = string.Empty;

    [Required]
    public string Ffmpeg { get; set; } = "ffmpeg";

    [Required]
    public string Ffprobe { get; set; } = "ffprobe";
}

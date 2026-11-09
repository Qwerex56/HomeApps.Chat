namespace Chat.Domain.Attachments;

/// <summary>The files kept for an attachment.</summary>
public enum MediaVariant
{
    /// <summary>As uploaded (EXIF removed from photos), to download.</summary>
    Original = 0,

    /// <summary>For the conversation: a photo at most 1600 px, a video remuxed to MP4.</summary>
    Preview = 1,

    /// <summary>A small picture: the photo or the video's first frame.</summary>
    Thumb = 2,
}

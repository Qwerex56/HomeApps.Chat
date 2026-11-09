using Chat.Domain.Attachments;

namespace Chat.Application.Abstractions;

/// <summary>
/// Short-lived signed links to files (plan 4.4): <c>&lt;img&gt;</c> and <c>&lt;video&gt;</c> send no Authorization header,
/// so the link itself is the permission, valid about an hour.
/// </summary>
public interface IMediaLinks
{
    /// <summary>A link under the plugin's base path, e.g. <c>/plugins/chat/media/{id}/preview?exp=…&amp;sig=…</c>.</summary>
    string Link(Guid attachmentId, MediaVariant variant);

    /// <summary>Whether the signature is right and the link has not expired.</summary>
    bool IsValid(Guid attachmentId, MediaVariant variant, long expires, string? signature);
}

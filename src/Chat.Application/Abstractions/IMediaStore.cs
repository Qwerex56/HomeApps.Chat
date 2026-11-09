namespace Chat.Application.Abstractions;

/// <summary>
/// Where photo and video files live, by key (<c>Attachment.Key</c>): a Docker volume in 1.0 (C10). Application never
/// touches the file system itself.
/// </summary>
public interface IMediaStore
{
    Task SaveAsync(string key, Stream content, CancellationToken cancellationToken);

    /// <summary>A readable, seekable stream (for <c>Range</c>), or <c>null</c> when there is no such file.</summary>
    Stream? OpenRead(string key);

    /// <summary>Deletes the files; missing ones are fine.</summary>
    Task DeleteAsync(IEnumerable<string> keys, CancellationToken cancellationToken);
}

using Chat.Application.Abstractions;
using Microsoft.Extensions.Options;

namespace Chat.Infrastructure.Media;

/// <summary>
/// <see cref="IMediaStore"/> on a folder (C10). Keys are <c>households/{hid}/{id}/{variant}</c>; a file is written next
/// to its place and moved in, so nobody reads half of it.
/// </summary>
internal sealed class DiskMediaStore(IOptions<MediaOptions> options) : IMediaStore
{
    private readonly string _root = Path.GetFullPath(options.Value.Root);

    public async Task SaveAsync(string key, Stream content, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(content);
        var path = PathOf(key);
        Directory.CreateDirectory(Path.GetDirectoryName(path)!);
        var temporary = $"{path}.{Guid.NewGuid():N}.part";
        await using (var file = new FileStream(temporary, FileMode.CreateNew, FileAccess.Write, FileShare.None, 81920, useAsync: true))
        {
            await content.CopyToAsync(file, cancellationToken);
        }

        File.Move(temporary, path, overwrite: true);
    }

    public Stream? OpenRead(string key)
    {
        var path = PathOf(key);
        return File.Exists(path) ? new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read, 81920, useAsync: true) : null;
    }

    public Task DeleteAsync(IEnumerable<string> keys, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(keys);
        foreach (var path in keys.Select(PathOf))
        {
            File.Delete(path);
            var folder = Path.GetDirectoryName(path)!;
            if (Directory.Exists(folder) && !Directory.EnumerateFileSystemEntries(folder).Any())
            {
                Directory.Delete(folder);
            }
        }

        return Task.CompletedTask;
    }

    /// <summary>The file of a key, for the tools that need a path (ffmpeg). Never outside the root.</summary>
    internal string PathOf(string key)
    {
        var path = Path.GetFullPath(Path.Combine(_root, key));
        return path.StartsWith(_root + Path.DirectorySeparatorChar, StringComparison.Ordinal)
            ? path
            : throw new ArgumentException($"The key '{key}' leaves the media folder.", nameof(key));
    }
}

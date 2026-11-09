using System.Globalization;
using System.Text.Json;
using Chat.Domain.Attachments;

namespace Chat.Infrastructure.Media;

/// <summary>
/// Videos with ffprobe and ffmpeg (plan 4.2, C8): length, size and turn from the content; remuxed without re-encoding and
/// without metadata (an iPhone video carries its GPS position in a track of its own) to MP4 with faststart, or WebM;
/// the first frame as a 400 px JPEG cover.
/// </summary>
internal static class VideoProcessor
{
    public static async Task<MediaInfo?> ProcessAsync(MediaOptions tools, string original, string thumb, CancellationToken cancellationToken)
    {
        var probe = await ExternalTool.RunAsync(
            tools.Ffprobe, ["-v", "error", "-print_format", "json", "-show_format", "-show_streams", original], cancellationToken);
        if (probe is null)
        {
            return null;
        }

        using var json = JsonDocument.Parse(probe);
        var root = json.RootElement;
        var formatName = root.TryGetProperty("format", out var format) && format.TryGetProperty("format_name", out var name)
            ? name.GetString() ?? string.Empty
            : string.Empty;
        var webm = formatName.Contains("webm", StringComparison.Ordinal);
        if (!webm && !formatName.Contains("mp4", StringComparison.Ordinal))
        {
            return null;
        }

        var video = root.GetProperty("streams").EnumerateArray()
            .FirstOrDefault(s => s.TryGetProperty("codec_type", out var type) && type.GetString() == "video");
        if (video.ValueKind != JsonValueKind.Object
            || !format.TryGetProperty("duration", out var durationText)
            || !double.TryParse(durationText.GetString(), NumberStyles.Float, CultureInfo.InvariantCulture, out var seconds))
        {
            return null;
        }

        var width = video.GetProperty("width").GetInt32();
        var height = video.GetProperty("height").GetInt32();
        if (Math.Abs(Rotation(video)) % 180 == 90)
        {
            (width, height) = (height, width);
        }

        var remuxed = $"{original}.{Guid.NewGuid():N}.{(webm ? "webm" : "mp4")}";
        string[] remux = webm
            ? ["-v", "error", "-y", "-i", original, "-map", "0:v:0", "-map", "0:a:0?", "-c", "copy", "-map_metadata", "-1", "-map_chapters", "-1",
                "-f", "webm", remuxed]
            : ["-v", "error", "-y", "-i", original, "-map", "0:v:0", "-map", "0:a:0?", "-c", "copy", "-map_metadata", "-1", "-map_chapters", "-1",
                "-movflags", "+faststart", "-f", "mp4", remuxed];
        if (await ExternalTool.RunAsync(tools.Ffmpeg, remux, cancellationToken) is null)
        {
            File.Delete(remuxed);
            return null;
        }

        File.Move(remuxed, original, overwrite: true);
        var cover = await ExternalTool.RunAsync(
            tools.Ffmpeg,
            ["-v", "error", "-y", "-i", original, "-frames:v", "1", "-vf", "scale='min(400,iw)':-2", "-q:v", "4", "-f", "image2", thumb],
            cancellationToken);
        if (cover is null)
        {
            return null;
        }

        return new MediaInfo(MediaKind.Video, webm ? "video/webm" : "video/mp4", width, height, TimeSpan.FromSeconds(seconds));
    }

    /// <summary>A phone's portrait video is stored landscape with a rotation; the size people see is turned.</summary>
    private static int Rotation(JsonElement video)
    {
        if (video.TryGetProperty("side_data_list", out var sideData))
        {
            foreach (var item in sideData.EnumerateArray())
            {
                if (item.TryGetProperty("rotation", out var rotation) && rotation.TryGetInt32(out var degrees))
                {
                    return degrees;
                }
            }
        }

        return video.TryGetProperty("tags", out var tags)
            && tags.TryGetProperty("rotate", out var rotate)
            && int.TryParse(rotate.GetString(), NumberStyles.Integer, CultureInfo.InvariantCulture, out var tagged)
            ? tagged
            : 0;
    }
}

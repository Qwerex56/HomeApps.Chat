using System.Diagnostics;
using SkiaSharp;

namespace Chat.Api.Tests;

/// <summary>Files to upload, made on the spot: photos with SkiaSharp, videos with ffmpeg (on the PATH, like in the plugin's image).</summary>
internal static class Media
{
    public static byte[] Png(int width, int height)
    {
        using var bitmap = new SKBitmap(width, height);
        using (var canvas = new SKCanvas(bitmap))
        {
            canvas.Clear(SKColors.SteelBlue);
        }

        using var data = bitmap.Encode(SKEncodedImageFormat.Png, 100);
        return data.ToArray();
    }

    public static async Task<byte[]> Mp4Async(int seconds)
    {
        var path = Path.Combine(Path.GetTempPath(), $"chat-test-{Guid.NewGuid():N}.mp4");
        var start = new ProcessStartInfo("ffmpeg")
        {
            ArgumentList =
            {
                "-v", "error", "-y", "-f", "lavfi", "-i", $"testsrc=duration={seconds}:size=64x48:rate=5",
                "-pix_fmt", "yuv420p", "-c:v", "libx264", "-metadata", "location=+52.2297+021.0122/", path,
            },
            RedirectStandardError = true,
        };
        using var process = Process.Start(start)!;
        await process.WaitForExitAsync();
        Assert.Equal(0, process.ExitCode);
        var bytes = await File.ReadAllBytesAsync(path);
        File.Delete(path);
        return bytes;
    }
}

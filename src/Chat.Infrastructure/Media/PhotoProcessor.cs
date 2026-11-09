using Chat.Application.Common;
using Chat.Domain.Attachments;
using SkiaSharp;

namespace Chat.Infrastructure.Media;

/// <summary>
/// Photos with SkiaSharp (plan 4.2): turned upright by their EXIF orientation and written again without any EXIF (a phone
/// photo carries the home's GPS), a 1600 px preview and a 400 px thumbnail, both JPEG on white. A GIF keeps its
/// original (its animation); only its previews are still.
/// </summary>
internal static class PhotoProcessor
{
    public const int PreviewSide = 1600;
    public const int ThumbSide = 400;

    private static readonly Dictionary<SKEncodedImageFormat, string> Types = new()
    {
        [SKEncodedImageFormat.Jpeg] = "image/jpeg",
        [SKEncodedImageFormat.Png] = "image/png",
        [SKEncodedImageFormat.Webp] = "image/webp",
        [SKEncodedImageFormat.Gif] = "image/gif",
    };

    /// <summary>The photo's facts, or <c>null</c> when the file is no photo Skia can read in an accepted format.</summary>
    public static MediaInfo? Process(string original, string preview, string thumb)
    {
        using var codec = SKCodec.Create(original);
        if (codec is null || !Types.TryGetValue(codec.EncodedFormat, out var contentType))
        {
            return null;
        }

        using var decoded = SKBitmap.Decode(codec);
        if (decoded is null)
        {
            return null;
        }

        using var upright = Orient(decoded, codec.EncodedOrigin);
        if (codec.EncodedFormat != SKEncodedImageFormat.Gif)
        {
            Write(upright, original, codec.EncodedFormat, quality: 92);
        }

        using (var picture = OnWhite(upright, PreviewSide))
        {
            Write(picture, preview, SKEncodedImageFormat.Jpeg, quality: 85);
        }

        using (var picture = OnWhite(upright, ThumbSide))
        {
            Write(picture, thumb, SKEncodedImageFormat.Jpeg, quality: 80);
        }

        return new MediaInfo(MediaKind.Image, contentType, upright.Width, upright.Height, null);
    }

    /// <summary>Applies the EXIF orientation, since nothing that shows the files reads EXIF any more.</summary>
    private static SKBitmap Orient(SKBitmap source, SKEncodedOrigin origin)
    {
        float w = source.Width;
        float h = source.Height;
        var matrix = origin switch
        {
            SKEncodedOrigin.TopRight => new SKMatrix(-1, 0, w, 0, 1, 0, 0, 0, 1),
            SKEncodedOrigin.BottomRight => new SKMatrix(-1, 0, w, 0, -1, h, 0, 0, 1),
            SKEncodedOrigin.BottomLeft => new SKMatrix(1, 0, 0, 0, -1, h, 0, 0, 1),
            SKEncodedOrigin.LeftTop => new SKMatrix(0, 1, 0, 1, 0, 0, 0, 0, 1),
            SKEncodedOrigin.RightTop => new SKMatrix(0, -1, h, 1, 0, 0, 0, 0, 1),
            SKEncodedOrigin.RightBottom => new SKMatrix(0, -1, h, -1, 0, w, 0, 0, 1),
            SKEncodedOrigin.LeftBottom => new SKMatrix(0, 1, 0, -1, 0, w, 0, 0, 1),
            _ => SKMatrix.Identity,
        };

        var swap = origin is SKEncodedOrigin.LeftTop or SKEncodedOrigin.RightTop or SKEncodedOrigin.RightBottom or SKEncodedOrigin.LeftBottom;
        var result = new SKBitmap(swap ? source.Height : source.Width, swap ? source.Width : source.Height, source.ColorType, source.AlphaType);
        using var canvas = new SKCanvas(result);
        canvas.SetMatrix(matrix);
        using var image = SKImage.FromBitmap(source);
        canvas.DrawImage(image, 0, 0, SKSamplingOptions.Default);
        return result;
    }

    /// <summary>At most <paramref name="side"/> pixels on the longer side, transparency on white (JPEG has none).</summary>
    private static SKBitmap OnWhite(SKBitmap source, int side)
    {
        var scale = Math.Min(1.0, (double)side / Math.Max(source.Width, source.Height));
        var width = Math.Max(1, (int)Math.Round(source.Width * scale));
        var height = Math.Max(1, (int)Math.Round(source.Height * scale));
        var result = new SKBitmap(width, height, SKColorType.Rgba8888, SKAlphaType.Premul);
        using var canvas = new SKCanvas(result);
        canvas.Clear(SKColors.White);
        using var image = SKImage.FromBitmap(source);
        canvas.DrawImage(image, new SKRect(0, 0, width, height), new SKSamplingOptions(SKCubicResampler.Mitchell));
        return result;
    }

    private static void Write(SKBitmap bitmap, string path, SKEncodedImageFormat format, int quality)
    {
        using var data = bitmap.Encode(format, quality)
            ?? throw new InvalidOperationException($"SkiaSharp could not encode {format}.");
        var temporary = $"{path}.{Guid.NewGuid():N}.part";
        using (var file = File.Create(temporary))
        {
            data.SaveTo(file);
        }

        File.Move(temporary, path, overwrite: true);
    }
}

using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using Chat.Application.Abstractions;
using Chat.Domain.Attachments;
using HomeApps.Plugins.Manifest;
using Microsoft.Extensions.Options;

namespace Chat.Infrastructure.Media;

/// <summary>
/// HMAC-SHA256 links (plan 4.4). A link expires at the end of the next full hour, so it lives one to two hours and stays
/// the same within an hour: the browser cache can keep the file.
/// </summary>
internal sealed class HmacMediaLinks(IOptions<MediaOptions> options, PluginManifest manifest, TimeProvider time) : IMediaLinks
{
    private static readonly TimeSpan Lifetime = TimeSpan.FromHours(1);

    private readonly byte[] _key = Encoding.UTF8.GetBytes(options.Value.SigningKey);

    public string Link(Guid attachmentId, MediaVariant variant)
    {
        var now = time.GetUtcNow().ToUnixTimeSeconds();
        var hour = (long)Lifetime.TotalSeconds;
        var expires = ((now / hour) + 2) * hour;
        return string.Create(
            CultureInfo.InvariantCulture,
            $"{manifest.BasePath}/media/{attachmentId}/{variant.ToString().ToLowerInvariant()}?exp={expires}&sig={Sign(attachmentId, variant, expires)}");
    }

    public bool IsValid(Guid attachmentId, MediaVariant variant, long expires, string? signature)
    {
        if (signature is null || expires < time.GetUtcNow().ToUnixTimeSeconds())
        {
            return false;
        }

        return CryptographicOperations.FixedTimeEquals(
            Encoding.ASCII.GetBytes(Sign(attachmentId, variant, expires)), Encoding.ASCII.GetBytes(signature));
    }

    private string Sign(Guid attachmentId, MediaVariant variant, long expires)
    {
        var payload = Encoding.UTF8.GetBytes(string.Create(CultureInfo.InvariantCulture, $"{attachmentId:N}/{variant}/{expires}"));
        return Convert.ToBase64String(HMACSHA256.HashData(_key, payload)).TrimEnd('=').Replace('+', '-').Replace('/', '_');
    }
}

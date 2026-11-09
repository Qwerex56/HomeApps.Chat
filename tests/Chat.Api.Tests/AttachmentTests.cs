using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Chat.Application.Common;
using Chat.Domain.Attachments;
using SkiaSharp;

namespace Chat.Api.Tests;

public sealed class AttachmentTests(ChatFactory factory) : IClassFixture<ChatFactory>
{
    [Fact]
    public async Task A_photo_is_checked_sent_and_served_through_signed_links()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var home = await h.HomeAsync();

        var photo = await h.UploadCheckedAsync(h.Member, Media.Png(2000, 1000), "image/png", "zdjęcie.png");
        var sent = await h.SendAsync(h.Member, home, null, [photo.Id]);

        Assert.Equal((AttachmentStatus.Ready, 2000, 1000, "image/png"), (photo.Status, photo.Width, photo.Height, photo.ContentType));
        var attached = Assert.Single(sent.Attachments);
        Assert.Equal((AttachmentStatus.Attached, "zdjęcie 2000×1000"), (attached.Status, attached.Description));

        var anonymous = factory.CreateClient();
        var preview = await anonymous.GetAsync(attached.PreviewUrl);
        Assert.Equal("image/jpeg", preview.Content.Headers.ContentType!.MediaType);
        using (var image = SKBitmap.Decode(await preview.Content.ReadAsByteArrayAsync()))
        {
            Assert.Equal((1600, 800), (image.Width, image.Height));
        }

        var thumb = await anonymous.GetByteArrayAsync(attached.ThumbUrl);
        using (var image = SKBitmap.Decode(thumb))
        {
            Assert.Equal(400, image.Width);
        }

        Assert.Equal(HttpStatusCode.NotFound, (await anonymous.GetAsync(attached.OriginalUrl!.Replace("sig=", "sig=x", StringComparison.Ordinal))).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound,
            (await anonymous.GetAsync(attached.OriginalUrl!.Replace("/original?", "/thumb?", StringComparison.Ordinal))).StatusCode);
    }

    [Fact]
    public async Task A_short_video_is_remuxed_without_metadata_and_can_be_scrubbed()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);

        var video = await h.UploadCheckedAsync(h.Member, await Media.Mp4Async(2), "video/quicktime", "film.mov");

        Assert.Equal((AttachmentStatus.Ready, MediaKind.Video, "video/mp4", 64, 48),
            (video.Status, video.Kind, video.ContentType, video.Width, video.Height));
        Assert.InRange(video.DurationSeconds!.Value, 1.5, 2.5);
        var request = new HttpRequestMessage(HttpMethod.Get, video.PreviewUrl);
        request.Headers.Range = new RangeHeaderValue(0, 99);
        var part = await factory.CreateClient().SendAsync(request);
        Assert.Equal(HttpStatusCode.PartialContent, part.StatusCode);
        Assert.Equal(100, (await part.Content.ReadAsByteArrayAsync()).Length);
        var whole = await factory.CreateClient().GetByteArrayAsync(video.OriginalUrl);
        Assert.DoesNotContain("52.2297", System.Text.Encoding.Latin1.GetString(whole), StringComparison.Ordinal);
    }

    [Fact]
    public async Task A_video_over_30_seconds_is_refused()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);

        var video = await h.UploadCheckedAsync(h.Member, await Media.Mp4Async(31), "video/mp4", "długi.mp4");

        Assert.Equal((AttachmentStatus.Failed, "attachment.too_long"), (video.Status, video.FailureCode));
        Assert.Null(video.PreviewUrl);
    }

    [Fact]
    public async Task What_is_no_photo_or_video_is_refused_early_or_after_the_check()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);

        var text = await h.UploadAsync(h.Member, "hello"u8.ToArray(), "text/plain", "a.txt");
        var fake = await h.UploadCheckedAsync(h.Member, "not a photo"u8.ToArray(), "image/jpeg", "a.jpg");

        Assert.Equal("attachment.unsupported", await AHousehold.CodeOf(text));
        Assert.Equal((AttachmentStatus.Failed, "attachment.unreadable"), (fake.Status, fake.FailureCode));
    }

    [Fact]
    public async Task Nobody_sends_or_sees_someone_elses_upload()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var home = await h.HomeAsync();
        var photo = await h.UploadCheckedAsync(h.Member, Media.Png(10, 10), "image/png", "a.png");

        var sent = await h.PostMessageAsync(h.Other, home, "Moje?", [photo.Id]);
        var seen = await h.As(h.Other).GetAsync($"{h.Api}/attachments/{photo.Id}");

        Assert.Equal("attachment.not_found", await AHousehold.CodeOf(sent));
        Assert.Equal(HttpStatusCode.NotFound, seen.StatusCode);
    }

    [Fact]
    public async Task Admins_see_the_space_used_members_do_not()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var png = Media.Png(10, 10);
        await h.UploadCheckedAsync(h.Member, png, "image/png", "a.png");

        var storage = await h.As(h.Admin).GetFromJsonAsync<StorageView>($"{h.Api}/storage", AHousehold.Json);

        Assert.Equal(png.Length, storage!.UsedBytes);
        Assert.Equal(10L * 1024 * 1024 * 1024, storage.LimitBytes);
        Assert.Equal(HttpStatusCode.Forbidden, (await h.As(h.Member).GetAsync($"{h.Api}/storage")).StatusCode);
    }

    [Fact]
    public async Task Deleting_a_message_deletes_its_files()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var home = await h.HomeAsync();
        var photo = await h.UploadCheckedAsync(h.Member, Media.Png(10, 10), "image/png", "a.png");
        var sent = await h.SendAsync(h.Member, home, null, [photo.Id]);

        await h.As(h.Member).DeleteAsync($"{h.Api}/messages/{sent.Id}");

        Assert.Equal(HttpStatusCode.NotFound, (await factory.CreateClient().GetAsync(sent.Attachments[0].PreviewUrl)).StatusCode);
        Assert.False(Directory.Exists(Path.Combine(factory.MediaRoot, "households", h.Id.ToString("N"), photo.Id.ToString("N"))));
    }
}

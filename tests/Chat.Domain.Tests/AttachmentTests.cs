using Chat.Domain.Attachments;
using Chat.Domain.Common;

namespace Chat.Domain.Tests;

public sealed class AttachmentTests
{
    private readonly FixedTime _time = new(A.Now);

    [Theory]
    [InlineData("image/jpeg", MediaKind.Image)]
    [InlineData("image/heic", null)]
    [InlineData("video/quicktime", MediaKind.Video)]
    [InlineData("VIDEO/MP4; codecs=avc1", MediaKind.Video)]
    [InlineData("application/pdf", null)]
    [InlineData(null, null)]
    public void Photos_and_videos_of_known_types_are_accepted(string? contentType, MediaKind? kind)
    {
        var upload = Attachment.Upload(A.Household, A.Member(), contentType, 1000, _time);

        if (kind is null)
        {
            Assert.Equal("attachment.unsupported", upload.Code());
        }
        else
        {
            Assert.Equal((kind.Value, AttachmentStatus.Pending), (upload.Value.Kind, upload.Value.Status));
        }
    }

    [Fact]
    public void At_most_twenty_megabytes_and_nothing_from_guests()
    {
        Assert.True(Attachment.Upload(A.Household, A.Member(), "video/mp4", Attachment.MaxBytes, _time).IsSuccess);
        Assert.Equal("attachment.too_large", Attachment.Upload(A.Household, A.Member(), "video/mp4", Attachment.MaxBytes + 1, _time).Code());
        Assert.Equal("attachment.too_large", Attachment.Upload(A.Household, A.Member(), "image/png", 0, _time).Code());
        Assert.Equal("conversation.read_only", Attachment.Upload(A.Household, Actor.Guest(Guid.NewGuid(), A.Now), "image/png", 10, _time).Code());
    }

    [Fact]
    public void A_checked_video_of_thirty_seconds_is_ready_and_described()
    {
        var video = Attachment.Upload(A.Household, A.Member(), "video/mp4", 5_000_000, _time).Value;

        Assert.True(video.Checked(new MediaInfo(MediaKind.Video, "video/quicktime", 1920, 1080, TimeSpan.FromSeconds(30))).IsSuccess);

        Assert.Equal((AttachmentStatus.Ready, "video/quicktime", (int?)1920), (video.Status, video.ContentType, video.Width));
        Assert.Equal("film 30 s", video.Describe());
        Assert.Equal("attachment.not_pending", video.Checked(new MediaInfo(MediaKind.Video, "video/mp4", 1, 1, TimeSpan.FromSeconds(1))).Code());
    }

    [Fact]
    public void A_longer_video_is_refused_with_the_reason_kept()
    {
        var video = Attachment.Upload(A.Household, A.Member(), "video/mp4", 5_000_000, _time).Value;

        var result = video.Checked(new MediaInfo(MediaKind.Video, "video/mp4", 1920, 1080, TimeSpan.FromSeconds(30.5)));

        Assert.Equal("attachment.too_long", result.Code());
        Assert.Equal((AttachmentStatus.Failed, "attachment.too_long"), (video.Status, video.FailureCode));
    }

    [Fact]
    public void A_file_that_is_not_what_it_claimed_is_refused()
    {
        var photo = Attachment.Upload(A.Household, A.Member(), "image/jpeg", 5_000, _time).Value;
        var broken = Attachment.Upload(A.Household, A.Member(), "image/jpeg", 5_000, _time).Value;

        Assert.Equal("attachment.unsupported", photo.Checked(new MediaInfo(MediaKind.Video, "video/mp4", 1, 1, TimeSpan.FromSeconds(3))).Code());
        broken.Unreadable();

        Assert.Equal("attachment.unreadable", broken.FailureCode);
    }

    [Fact]
    public void An_unsent_upload_is_abandoned_after_a_day_a_sent_one_never()
    {
        var author = A.Member();
        var unsent = A.ReadyPhoto(author, _time);
        var sent = A.ReadyPhoto(author, _time);
        Messages.Message.Send(A.HouseholdConversation(_time), author, null, [sent], null, Guid.NewGuid(), Messages.SentVia.App, _time);

        Assert.False(unsent.IsAbandoned(A.Now.AddHours(23)));
        Assert.True(unsent.IsAbandoned(A.Now.AddHours(24)));
        Assert.False(sent.IsAbandoned(A.Now.AddDays(365)));
    }

    [Fact]
    public void Files_live_under_their_household_and_photos_say_their_size()
    {
        var photo = A.ReadyPhoto(A.Member(), _time);

        Assert.Equal($"households/{A.Household:N}/{photo.Id:N}/thumb", photo.Key(MediaVariant.Thumb));
        Assert.Equal("zdjęcie 1600×1200", photo.Describe());
    }
}

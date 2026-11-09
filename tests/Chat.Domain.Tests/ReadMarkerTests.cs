using Chat.Domain.ReadMarkers;

namespace Chat.Domain.Tests;

public sealed class ReadMarkerTests
{
    private readonly FixedTime _time = new(A.Now);

    [Fact]
    public void A_marker_only_moves_forward_and_counts_others_newer_messages_as_unread()
    {
        var home = A.HouseholdConversation(_time);
        var me = A.Member();
        var first = A.Message(home, A.Member(), _time);
        _time.Advance(TimeSpan.FromMinutes(1));
        var second = A.Message(home, A.Member(), _time);
        _time.Advance(TimeSpan.FromMinutes(1));
        var mine = A.Message(home, me, _time);

        var marker = ReadMarker.Start(me.UserId, first, _time);

        Assert.True(marker.IsUnread(second));
        Assert.False(marker.IsUnread(mine));
        Assert.True(marker.MoveTo(second, _time));
        Assert.False(marker.MoveTo(first, _time));
        Assert.Equal(second.Id, marker.LastReadMessageId);
        Assert.False(marker.IsUnread(second));
    }

    [Fact]
    public void A_deleted_message_is_never_unread()
    {
        var home = A.HouseholdConversation(_time);
        var author = A.Member();
        var first = A.Message(home, author, _time);
        _time.Advance(TimeSpan.FromMinutes(1));
        var deleted = A.Message(home, author, _time);
        deleted.Delete(home, author, _time);

        Assert.False(ReadMarker.Start(Guid.NewGuid(), first, _time).IsUnread(deleted));
    }
}

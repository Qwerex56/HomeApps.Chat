using Chat.Domain.Attachments;
using Chat.Domain.Common;
using Chat.Domain.Messages;

namespace Chat.Domain.Tests;

public sealed class MessageTests
{
    private readonly FixedTime _time = new(A.Now);

    [Fact]
    public void Sending_keeps_the_markdown_as_typed_and_moves_the_conversation_up()
    {
        var home = A.HouseholdConversation(_time);
        var author = A.Member();
        var client = Guid.NewGuid();

        var message = Message.Send(home, author, "  **Obiad** o 18\n- zupa  ", [], null, client, SentVia.Mcp, _time).Value;

        Assert.Equal("**Obiad** o 18\n- zupa", message.Text!.Value);
        Assert.Equal((home.Id, A.Household, author.UserId, client, SentVia.Mcp, MessageEncryption.None, A.Now),
            (message.ConversationId, message.HouseholdId, message.AuthorId, message.ClientMessageId, message.SentVia, message.Encryption, message.SentAt));
        Assert.Equal(A.Now, home.LastMessageAt);
    }

    [Fact]
    public void A_message_needs_text_or_media_and_text_has_a_limit()
    {
        var home = A.HouseholdConversation(_time);
        var author = A.Member();

        Assert.Equal("message.empty", Message.Send(home, author, "   ", [], null, Guid.NewGuid(), SentVia.App, _time).Code());
        Assert.Equal("message.text_invalid",
            Message.Send(home, author, new string('a', MessageText.MaxLength + 1), [], null, Guid.NewGuid(), SentVia.App, _time).Code());
        Assert.True(Message.Send(home, author, new string('a', MessageText.MaxLength), [], null, Guid.NewGuid(), SentVia.App, _time).IsSuccess);
    }

    [Fact]
    public void A_guest_does_not_write()
    {
        var home = A.HouseholdConversation(_time);

        var result = Message.Send(home, Actor.Guest(Guid.NewGuid(), A.Now), "Hej", [], null, Guid.NewGuid(), SentVia.App, _time);

        Assert.Equal("conversation.read_only", result.Code());
    }

    [Fact]
    public void Photos_become_part_of_the_message()
    {
        var home = A.HouseholdConversation(_time);
        var author = A.Member();
        var photos = new[] { A.ReadyPhoto(author, _time), A.ReadyPhoto(author, _time) };

        var message = Message.Send(home, author, null, photos, null, Guid.NewGuid(), SentVia.App, _time).Value;

        Assert.Null(message.Text);
        Assert.Equal(photos.Select(p => p.Id), message.AttachmentIds);
        Assert.All(photos, p => Assert.Equal((AttachmentStatus.Attached, (Guid?)message.Id), (p.Status, p.MessageId)));
    }

    [Fact]
    public void At_most_ten_attachments_and_only_ones_own_ready_ones()
    {
        var home = A.HouseholdConversation(_time);
        var author = A.Member();

        var eleven = Enumerable.Range(0, 11).Select(_ => A.ReadyPhoto(author, _time)).ToList();
        Assert.Equal("message.too_many_attachments", Message.Send(home, author, null, eleven, null, Guid.NewGuid(), SentVia.App, _time).Code());

        var someoneElses = A.ReadyPhoto(A.Member(), _time);
        Assert.Equal("attachment.not_found", Message.Send(home, author, "x", [someoneElses], null, Guid.NewGuid(), SentVia.App, _time).Code());

        var mine = A.ReadyPhoto(author, _time);
        var pending = Attachment.Upload(A.Household, author, "image/png", 10, _time).Value;
        Assert.Equal("attachment.not_ready", Message.Send(home, author, "x", [mine, pending], null, Guid.NewGuid(), SentVia.App, _time).Code());
        Assert.Equal(AttachmentStatus.Ready, mine.Status);
    }

    [Fact]
    public void A_reply_answers_a_message_of_the_same_conversation()
    {
        var home = A.HouseholdConversation(_time);
        var author = A.Member();
        var original = A.Message(home, author, _time);
        var elsewhere = A.Message(A.Room(author, _time), author, _time);

        var reply = Message.Send(home, A.Member(), "Będę", [], original, Guid.NewGuid(), SentVia.App, _time).Value;

        Assert.Equal(original.Id, reply.ReplyToId);
        Assert.Equal("message.reply_invalid", Message.Send(home, author, "?", [], elsewhere, Guid.NewGuid(), SentVia.App, _time).Code());
    }

    [Fact]
    public void Only_the_author_edits_any_time_and_it_shows_as_edited()
    {
        var home = A.HouseholdConversation(_time);
        var author = A.Member();
        var message = A.Message(home, author, _time);

        Assert.Equal("message.forbidden", message.Edit(home, Actor.Moderator(Guid.NewGuid()), "Nie", _time).Code());

        _time.Advance(TimeSpan.FromDays(30));
        Assert.True(message.Edit(home, author, "Obiad o 19", _time).IsSuccess);
        Assert.Equal(("Obiad o 19", (DateTimeOffset?)A.Now.AddDays(30)), (message.Text!.Value, message.EditedAt));

        _time.Advance(TimeSpan.FromMinutes(1));
        message.Edit(home, author, "Obiad o 19", _time);
        Assert.Equal(A.Now.AddDays(30), message.EditedAt);
        Assert.Equal("message.empty", message.Edit(home, author, " ", _time).Code());
    }

    [Fact]
    public void The_author_deletes_and_only_a_trace_stays()
    {
        var home = A.HouseholdConversation(_time);
        var author = A.Member();
        var photo = A.ReadyPhoto(author, _time);
        var message = Message.Send(home, author, "Zdjęcie", [photo], null, Guid.NewGuid(), SentVia.App, _time).Value;
        message.React(home, A.Member(), "❤️", _time);

        var files = message.Delete(home, author, _time).Value;

        Assert.Equal([photo.Id], files);
        Assert.True(message.IsDeleted);
        Assert.Null(message.Text);
        Assert.Empty(message.AttachmentIds);
        Assert.Empty(message.Reactions);
        Assert.Equal("message.deleted", message.Delete(home, author, _time).Code());
        Assert.Equal("message.deleted", message.Edit(home, author, "Znowu", _time).Code());
    }

    [Fact]
    public void A_moderator_deletes_others_messages_only_in_the_household_conversation()
    {
        var author = A.Member();
        var moderator = Actor.Moderator(Guid.NewGuid());
        var home = A.HouseholdConversation(_time);
        var room = A.Room(author, _time, moderator.UserId);

        Assert.Equal("message.forbidden", A.Message(home, author, _time).Delete(home, A.Member(), _time).Code());
        Assert.True(A.Message(home, author, _time).Delete(home, moderator, _time).IsSuccess);
        Assert.Equal("message.forbidden", A.Message(room, author, _time).Delete(room, moderator, _time).Code());
    }

    [Fact]
    public void An_erased_author_leaves_only_deleted_messages_and_their_reactions_go()
    {
        var home = A.HouseholdConversation(_time);
        var erased = A.Member();
        var theirs = A.Message(home, erased, _time);
        var other = A.Message(home, A.Member(), _time);
        other.React(home, erased, "👍", _time);

        theirs.AuthorErased(_time);
        other.RemoveReactionsOf(erased.UserId);

        Assert.True(theirs.IsDeleted);
        Assert.Null(theirs.Text);
        Assert.Empty(other.Reactions);
        Assert.Empty(theirs.AuthorErased(_time));
    }

    [Theory]
    [InlineData("👍", true)]
    [InlineData("❤️", true)]
    [InlineData("👨‍👩‍👧", true)]
    [InlineData("a", false)]
    [InlineData("👍👍", false)]
    [InlineData(" ", false)]
    [InlineData("", false)]
    public void A_reaction_is_one_emoji(string emoji, bool valid)
    {
        var home = A.HouseholdConversation(_time);
        var message = A.Message(home, A.Member(), _time);

        Assert.Equal(valid, message.React(home, A.Member(), emoji, _time).IsSuccess);
    }

    [Fact]
    public void Each_person_gives_an_emoji_once_and_takes_it_back()
    {
        var home = A.HouseholdConversation(_time);
        var message = A.Message(home, A.Member(), _time);
        var me = A.Member();

        message.React(home, me, "👍", _time);
        message.React(home, me, "👍", _time);
        message.React(home, me, "😂", _time);
        message.React(home, A.Member(), "👍", _time);
        Assert.Equal(3, message.Reactions.Count);

        message.Unreact(home, me, "👍");
        Assert.Equal(["😂", "👍"], message.Reactions.Select(r => r.Emoji));
        Assert.Equal("conversation.read_only", message.React(home, Actor.Guest(Guid.NewGuid(), A.Now.AddDays(-1)), "👍", _time).Code());
    }

    [Fact]
    public void A_guest_does_not_see_what_was_written_before_they_joined()
    {
        var home = A.HouseholdConversation(_time);
        var before = A.Message(home, A.Member(), _time);
        _time.Advance(TimeSpan.FromDays(1));
        var guest = Actor.Guest(Guid.NewGuid(), _time.GetUtcNow());
        var after = A.Message(home, A.Member(), _time);

        Assert.False(before.IsVisibleFrom(home.ReadsFrom(guest)));
        Assert.True(after.IsVisibleFrom(home.ReadsFrom(guest)));
        Assert.True(before.IsVisibleFrom(home.ReadsFrom(A.Member())));
        Assert.Equal("message.reply_invalid",
            Message.Send(home, Actor.Member(guest.UserId) with { ReadsFrom = guest.ReadsFrom }, "?", [], before, Guid.NewGuid(), SentVia.App, _time).Code());
    }

    [Fact]
    public void Archived_conversations_take_no_changes()
    {
        var keeper = A.Member();
        var room = A.Room(keeper, _time);
        var message = A.Message(room, keeper, _time);
        room.Archive(keeper, _time);

        Assert.Equal("conversation.archived", message.Edit(room, keeper, "Nowe", _time).Code());
        Assert.Equal("conversation.archived", message.Delete(room, keeper, _time).Code());
        Assert.Equal("conversation.archived", Message.Send(room, keeper, "x", [], null, Guid.NewGuid(), SentVia.App, _time).Code());
    }

    [Fact]
    public void Someone_outside_a_room_cannot_touch_its_messages()
    {
        var keeper = A.Member();
        var room = A.Room(keeper, _time);
        var message = A.Message(room, keeper, _time);

        Assert.Equal("conversation.not_found", message.React(room, A.Member(), "👍", _time).Code());
        Assert.Equal("conversation.not_found", message.Delete(room, Actor.Moderator(Guid.NewGuid()), _time).Code());
    }
}

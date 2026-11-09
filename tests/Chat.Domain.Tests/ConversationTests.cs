using Chat.Domain.Common;
using Chat.Domain.Conversations;

namespace Chat.Domain.Tests;

public sealed class ConversationTests
{
    private readonly FixedTime _time = new(A.Now);

    [Fact]
    public void The_household_conversation_lists_nobody_and_everyone_reads_and_writes_it()
    {
        var home = A.HouseholdConversation(_time);
        var member = A.Member();

        Assert.Equal((A.Household, ConversationKind.Household, A.Now), (home.HouseholdId, home.Kind, home.CreatedAt));
        Assert.Empty(home.Participants);
        Assert.True(home.CanRead(member).IsSuccess);
        Assert.True(home.CanWrite(member).IsSuccess);
        Assert.Null(home.ReadsFrom(member));
    }

    [Fact]
    public void A_guest_reads_but_never_writes()
    {
        var home = A.HouseholdConversation(_time);
        var guest = Actor.Guest(Guid.NewGuid(), A.Now.AddDays(-2));

        Assert.True(home.CanRead(guest).IsSuccess);
        Assert.Equal("conversation.read_only", home.CanWrite(guest).Code());
        Assert.Equal(A.Now.AddDays(-2), home.ReadsFrom(guest));
    }

    [Fact]
    public void A_room_is_private_to_its_participants_even_for_moderators()
    {
        var keeper = A.Member();
        var other = A.Member();
        var room = A.Room(keeper, _time, other.UserId);

        Assert.Equal(keeper.UserId, room.KeeperId);
        Assert.Equal("Rodzice", room.Name!.Value);
        Assert.Equal([keeper.UserId, other.UserId], room.Participants.Select(p => p.UserId));
        Assert.True(room.CanRead(other).IsSuccess);
        Assert.Equal("conversation.not_found", room.CanRead(Actor.Moderator(Guid.NewGuid())).Code());
    }

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    [InlineData("Pokój\u0007")]
    public void A_room_needs_a_proper_name(string name)
    {
        var result = Conversation.CreateRoom(A.Household, A.Member(), name, [], _time);

        Assert.Equal("conversation.name_invalid", result.Code());
        Assert.Equal("conversation.name_invalid", Conversation.CreateRoom(A.Household, A.Member(), new string('x', 61), [], _time).Code());
    }

    [Fact]
    public void A_guest_does_not_create_rooms_or_direct_conversations()
    {
        var guest = Actor.Guest(Guid.NewGuid(), A.Now);

        Assert.Equal("conversation.read_only", Conversation.CreateRoom(A.Household, guest, "Goście", [], _time).Code());
        Assert.Equal("conversation.read_only", Conversation.StartDirect(A.Household, guest, Guid.NewGuid(), _time).Code());
    }

    [Fact]
    public void Participants_add_people_but_only_the_keeper_renames_removes_and_archives()
    {
        var keeper = A.Member();
        var other = A.Member();
        var room = A.Room(keeper, _time, other.UserId);
        var newcomer = Guid.NewGuid();

        _time.Advance(TimeSpan.FromHours(1));
        Assert.Equal([newcomer], room.AddParticipants(other, [newcomer, keeper.UserId], _time).Value);
        Assert.Equal(A.Now.AddHours(1), room.Participants.Single(p => p.UserId == newcomer).AddedAt);
        Assert.Equal("conversation.participants_invalid", room.AddParticipants(other, [keeper.UserId], _time).Code());

        Assert.Equal("conversation.not_keeper", room.Rename(other, "Inna").Code());
        Assert.Equal("conversation.not_keeper", room.RemoveParticipant(other, newcomer).Code());
        Assert.Equal("conversation.not_keeper", room.Archive(other, _time).Code());

        Assert.True(room.Rename(keeper, "Opieka nad dziećmi").IsSuccess);
        Assert.True(room.RemoveParticipant(keeper, newcomer).IsSuccess);
        Assert.False(room.IsParticipant(newcomer));
        Assert.True(room.Archive(keeper, _time).IsSuccess);
        Assert.Equal("conversation.archived", room.CanWrite(other).Code());
        Assert.True(room.CanRead(other).IsSuccess);
    }

    [Fact]
    public void A_keeper_who_leaves_hands_the_room_to_the_longest_present_and_the_last_one_archives_it()
    {
        var keeper = A.Member();
        var first = A.Member();
        var room = A.Room(keeper, _time, first.UserId);
        _time.Advance(TimeSpan.FromMinutes(5));
        var later = A.Member();
        room.AddParticipants(keeper, [later.UserId], _time);

        Assert.True(room.Leave(keeper, _time).IsSuccess);
        Assert.Equal(first.UserId, room.KeeperId);

        room.Leave(first, _time);
        Assert.Equal(later.UserId, room.KeeperId);
        Assert.False(room.IsArchived);

        room.Leave(later, _time);
        Assert.Null(room.KeeperId);
        Assert.True(room.IsArchived);
    }

    [Fact]
    public void The_household_conversation_has_no_participants_to_change()
    {
        var home = A.HouseholdConversation(_time);
        var member = A.Member();

        Assert.Equal("conversation.not_a_room", home.AddParticipants(member, [Guid.NewGuid()], _time).Code());
        Assert.Equal("conversation.not_a_room", home.Leave(member, _time).Code());
        Assert.Equal("conversation.not_a_room", home.Rename(member, "Nowa").Code());
    }

    [Fact]
    public void Someone_outside_a_room_cannot_even_tell_it_is_a_room()
    {
        var room = A.Room(A.Member(), _time);

        Assert.Equal("conversation.not_found", room.AddParticipants(A.Member(), [Guid.NewGuid()], _time).Code());
        Assert.Equal("conversation.not_found", room.Leave(A.Member(), _time).Code());
    }

    [Fact]
    public void A_guest_sees_a_room_from_being_added_and_members_see_its_whole_history()
    {
        var keeper = A.Member();
        var room = A.Room(keeper, _time);
        var guest = Actor.Guest(Guid.NewGuid(), A.Now.AddDays(-10));
        var member = A.Member();

        _time.Advance(TimeSpan.FromDays(3));
        room.AddParticipants(keeper, [guest.UserId, member.UserId], _time);

        Assert.Equal(A.Now.AddDays(3), room.ReadsFrom(guest));
        Assert.Null(room.ReadsFrom(member));
        Assert.Equal("conversation.read_only", room.CanWrite(guest).Code());
    }

    [Fact]
    public void A_guest_who_joined_after_being_added_sees_from_joining()
    {
        var keeper = A.Member();
        var guestId = Guid.NewGuid();
        var room = A.Room(keeper, _time, guestId);

        Assert.Equal(A.Now.AddDays(1), room.ReadsFrom(Actor.Guest(guestId, A.Now.AddDays(1))));
    }

    [Fact]
    public void Direct_conversations_have_one_key_per_pair_and_never_with_oneself()
    {
        var a = A.Member();
        var b = A.Member();

        var direct = Conversation.StartDirect(A.Household, a, b.UserId, _time).Value;

        Assert.Equal(ConversationKind.Direct, direct.Kind);
        Assert.Equal(Conversation.DirectKeyOf(b.UserId, a.UserId), direct.DirectKey);
        Assert.True(direct.CanWrite(b).IsSuccess);
        Assert.Equal("conversation.not_found", direct.CanRead(A.Member()).Code());
        Assert.Equal("conversation.direct_invalid", Conversation.StartDirect(A.Household, a, a.UserId, _time).Code());
        Assert.Equal("conversation.not_a_room", direct.Leave(a, _time).Code());
    }

    [Fact]
    public void Someone_who_left_the_household_leaves_its_rooms_and_their_direct_conversations_become_read_only()
    {
        var keeper = A.Member();
        var other = A.Member();
        var room = A.Room(keeper, _time, other.UserId);
        var direct = Conversation.StartDirect(A.Household, keeper, other.UserId, _time).Value;

        room.MemberLeft(keeper.UserId, _time);
        direct.MemberLeft(keeper.UserId, _time);

        Assert.False(room.IsParticipant(keeper.UserId));
        Assert.Equal(other.UserId, room.KeeperId);
        Assert.True(direct.IsArchived);
        Assert.True(direct.CanRead(other).IsSuccess);
        Assert.Equal("conversation.archived", direct.CanWrite(other).Code());
    }

    [Fact]
    public void A_newer_message_moves_the_conversation_up_an_older_one_does_not()
    {
        var home = A.HouseholdConversation(_time);

        home.MessageArrived(A.Now.AddMinutes(2));
        home.MessageArrived(A.Now.AddMinutes(1));

        Assert.Equal(A.Now.AddMinutes(2), home.LastMessageAt);
    }
}

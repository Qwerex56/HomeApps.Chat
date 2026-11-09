using System.Net;
using System.Net.Http.Json;
using HomeApps.Contracts.Households;

namespace Chat.Api.Tests;

public sealed class MessageTests(ChatFactory factory) : IClassFixture<ChatFactory>
{
    [Fact]
    public async Task A_retried_send_with_the_same_client_id_gives_the_same_message()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var home = await h.HomeAsync();
        var clientId = Guid.NewGuid();

        var first = await h.PostMessageAsync(h.Member, home, "**Będę o 18**", clientMessageId: clientId);
        var retry = await h.PostMessageAsync(h.Member, home, "**Będę o 18**", clientMessageId: clientId);

        Assert.Equal(HttpStatusCode.Created, first.StatusCode);
        var messages = await h.MessagesAsync(h.Owner, home);
        var message = Assert.Single(messages);
        Assert.Equal(("**Będę o 18**", h.Member, clientId), (message.Text, message.AuthorId, message.ClientMessageId));
        Assert.Equal(HttpStatusCode.Created, retry.StatusCode);
    }

    [Fact]
    public async Task A_guest_reads_only_what_came_after_joining_and_older_quotes_stay_hidden()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var home = await h.HomeAsync();
        factory.Time.Advance(TimeSpan.FromMinutes(-10));
        var old = await h.SendAsync(h.Member, home, "Przed gościem");
        factory.Time.Advance(TimeSpan.FromMinutes(20));
        await h.SendAsync(h.Other, home, "Witaj", replyTo: old.Id);

        var seen = Assert.Single(await h.MessagesAsync(h.Guest, home));

        Assert.Equal("Witaj", seen.Text);
        Assert.False(seen.ReplyTo!.Visible);
        Assert.Null(seen.ReplyTo.Text);
        Assert.True((await h.MessagesAsync(h.Member, home)).Last().ReplyTo!.Visible);
        Assert.Equal(HttpStatusCode.Forbidden, (await h.PostMessageAsync(h.Guest, home, "Hej")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await h.As(h.Guest).GetAsync($"{h.Api}/messages/{old.Id}")).StatusCode);
    }

    [Fact]
    public async Task Only_the_author_edits_and_the_edit_shows()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var home = await h.HomeAsync();
        var sent = await h.SendAsync(h.Member, home, "Kupię chleb");

        var byOther = await h.As(h.Admin).PutAsJsonAsync($"{h.Api}/messages/{sent.Id}", new { text = "Nie" });
        var byAuthor = await h.As(h.Member).PutAsJsonAsync($"{h.Api}/messages/{sent.Id}", new { text = "Kupię chleb i mleko" });

        Assert.Equal("message.forbidden", await AHousehold.CodeOf(byOther));
        Assert.Equal(HttpStatusCode.NoContent, byAuthor.StatusCode);
        var edited = Assert.Single(await h.MessagesAsync(h.Owner, home));
        Assert.Equal("Kupię chleb i mleko", edited.Text);
        Assert.NotNull(edited.EditedAt);
    }

    [Fact]
    public async Task A_moderator_deletes_in_Dom_but_not_in_rooms()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var home = await h.HomeAsync();
        var room = await h.CreateRoomAsync(h.Member, "Pokój", h.Admin);
        var inHome = await h.SendAsync(h.Member, home, "Spam");
        var inRoom = await h.SendAsync(h.Member, room, "Moje");

        Assert.Equal(HttpStatusCode.NoContent, (await h.As(h.Admin).DeleteAsync($"{h.Api}/messages/{inHome.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await h.As(h.Admin).DeleteAsync($"{h.Api}/messages/{inRoom.Id}")).StatusCode);

        var deleted = Assert.Single(await h.MessagesAsync(h.Owner, home));
        Assert.True(deleted.Deleted);
        Assert.Null(deleted.Text);
    }

    [Fact]
    public async Task Reactions_are_one_emoji_per_person()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var home = await h.HomeAsync();
        var sent = await h.SendAsync(h.Member, home, "Obiad gotowy");
        var heart = Uri.EscapeDataString("❤️");

        await h.As(h.Other).PutAsync($"{h.Api}/messages/{sent.Id}/reactions/{heart}", null);
        await h.As(h.Other).PutAsync($"{h.Api}/messages/{sent.Id}/reactions/{heart}", null);
        await h.As(h.Admin).PutAsync($"{h.Api}/messages/{sent.Id}/reactions/{heart}", null);
        var word = await h.As(h.Admin).PutAsync($"{h.Api}/messages/{sent.Id}/reactions/ok", null);
        await h.As(h.Other).DeleteAsync($"{h.Api}/messages/{sent.Id}/reactions/{heart}");

        Assert.Equal("reaction.invalid", await AHousehold.CodeOf(word));
        var reaction = Assert.Single(Assert.Single(await h.MessagesAsync(h.Owner, home)).Reactions);
        Assert.Equal(("❤️", h.Admin), (reaction.Emoji, Assert.Single(reaction.UserIds)));
    }

    [Fact]
    public async Task Pages_go_back_with_before_and_catch_up_with_after()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var home = await h.HomeAsync();
        var sent = new List<Guid>();
        for (var i = 1; i <= 5; i++)
        {
            sent.Add((await h.SendAsync(h.Member, home, $"Wiadomość {i}")).Id);
        }

        var newest = await h.MessagesAsync(h.Owner, home, "?limit=2");
        var older = await h.MessagesAsync(h.Owner, home, $"?before={newest[0].Id}&limit=2");
        var newer = await h.MessagesAsync(h.Owner, home, $"?after={sent[1]}");

        Assert.Equal(sent[3..], newest.Select(m => m.Id));
        Assert.Equal(sent[1..3], older.Select(m => m.Id));
        Assert.Equal(sent[2..], newer.Select(m => m.Id));
        Assert.Equal(HttpStatusCode.BadRequest,
            (await h.As(h.Owner).GetAsync($"{h.Api}/conversations/{home}/messages?before={sent[0]}&after={sent[1]}")).StatusCode);
    }

    [Fact]
    public async Task Reading_moves_the_marker_and_clears_the_unread_count()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var home = await h.HomeAsync();
        await h.SendAsync(h.Member, home, "Raz");
        var second = await h.SendAsync(h.Member, home, "Dwa");
        await h.SendAsync(h.Owner, home, "Moja");

        var before = await h.As(h.Other).GetFromJsonAsync<Application.Common.UnreadView>($"{h.Api}/unread", AHousehold.Json);
        await h.As(h.Other).PutAsJsonAsync($"{h.Api}/conversations/{home}/read", new { messageId = second.Id });
        var after = (await h.ConversationsAsync(h.Other)).Single(c => c.Id == home);

        Assert.Equal((3, 1), (before!.Messages, before.Conversations));
        Assert.Equal((1, second.Id), (after.Unread, after.LastReadMessageId));
        Assert.Equal(2, (await h.ConversationsAsync(h.Owner)).Single(c => c.Id == home).Unread);
    }

    [Fact]
    public async Task In_a_direct_conversation_each_sees_how_far_the_other_read()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var start = await h.As(h.Member).PostAsJsonAsync($"{h.Api}/conversations/direct", new { userId = h.Other });
        var direct = (await start.Content.ReadFromJsonAsync<System.Text.Json.Nodes.JsonNode>())!["id"]!.GetValue<Guid>();
        var sent = await h.SendAsync(h.Member, direct, "Jesteś?");

        await h.As(h.Other).PutAsJsonAsync($"{h.Api}/conversations/{direct}/read", new { messageId = sent.Id });

        Assert.Equal(sent.Id, (await h.ConversationsAsync(h.Member)).Single(c => c.Id == direct).OtherReadMessageId);
    }

    [Fact]
    public async Task Someone_who_is_not_a_member_learns_nothing()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        factory.Households.Set(h.Id, h.Other, null);

        var response = await h.As(h.Other).GetAsync($"{h.Api}/conversations");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        factory.Households.Set(h.Id, h.Other, HouseholdRole.Member);
    }
}

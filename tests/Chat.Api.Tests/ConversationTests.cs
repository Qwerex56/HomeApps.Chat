using System.Net;
using System.Net.Http.Json;
using System.Text.Json.Nodes;
using Chat.Domain.Conversations;

namespace Chat.Api.Tests;

public sealed class ConversationTests(ChatFactory factory) : IClassFixture<ChatFactory>
{
    [Fact]
    public async Task The_manifest_declares_permissions_the_hub_notifications_and_the_UI()
    {
        var json = (await factory.CreateClient().GetFromJsonAsync<JsonNode>("/plugins/chat/manifest"))!;

        Assert.Equal("chat", json["id"]!.GetValue<string>());
        Assert.Equal(
            ["chat.read", "chat.write", "chat.direct", "chat.rooms", "chat.moderate", "chat.settings"],
            json["permissions"]!.AsArray().Select(p => p!["id"]!.GetValue<string>()));
        Assert.Equal("/plugins/chat/hub", json["endpoints"]!["realtime"]!.GetValue<string>());
        Assert.Equal("message", json["notifications"]![0]!["id"]!.GetValue<string>());
        Assert.Equal("/plugins/chat/ui/entry.js", json["ui"]!["entry"]!.GetValue<string>());
        var widget = json["ui"]!["widgets"]![0]!;
        Assert.Equal(("chat", "Medium"), (widget["id"]!.GetValue<string>(), widget["size"]!.GetValue<string>()));
        Assert.Equal(["Household"], widget["places"]!.AsArray().Select(p => p!.GetValue<string>()));
    }

    [Fact]
    public async Task The_built_UI_is_served()
    {
        var response = await factory.CreateClient().GetAsync("/plugins/chat/ui/entry.js");

        Assert.True(response.IsSuccessStatusCode);
    }

    [Fact]
    public async Task The_first_switch_on_creates_Dom_for_everyone_guests_included()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);

        var forGuest = Assert.Single(await h.ConversationsAsync(h.Guest));

        Assert.Equal(("Dom", ConversationKind.Household, 0), (forGuest.Name, forGuest.Kind, forGuest.Unread));
        Assert.NotNull(forGuest.ReadsFrom);
        Assert.Null(Assert.Single(await h.ConversationsAsync(h.Member)).ReadsFrom);
    }

    [Fact]
    public async Task A_room_is_seen_only_by_its_participants_not_even_by_the_owner()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var room = await h.CreateRoomAsync(h.Member, "Rodzice", h.Other, h.Guest);
        await h.SendAsync(h.Member, room, "Tylko dla nas");

        Assert.Contains(await h.ConversationsAsync(h.Guest), c => c.Id == room);
        Assert.DoesNotContain(await h.ConversationsAsync(h.Owner), c => c.Id == room);
        var outsider = await h.As(h.Owner).GetAsync($"{h.Api}/conversations/{room}/messages");
        Assert.Equal(HttpStatusCode.NotFound, outsider.StatusCode);

        var guestWrites = await h.PostMessageAsync(h.Guest, room, "Cześć");
        Assert.Equal(HttpStatusCode.Forbidden, guestWrites.StatusCode);
        Assert.Single(await h.MessagesAsync(h.Guest, room));
    }

    [Fact]
    public async Task Only_household_members_join_a_room()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);

        var response = await h.As(h.Member).PostAsJsonAsync($"{h.Api}/rooms", new { name = "Obcy", participantIds = new[] { Guid.NewGuid() } });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.Equal("conversation.participants_invalid", await AHousehold.CodeOf(response));
    }

    [Fact]
    public async Task A_keeper_leaves_only_after_naming_a_next_keeper_who_may_write()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var room = await h.CreateRoomAsync(h.Member, "Dzieci", h.Other, h.Guest);
        var leave = $"{h.Api}/rooms/{room}/leave";

        var silent = await h.As(h.Member).PostAsJsonAsync(leave, new { });
        var toGuest = await h.As(h.Member).PostAsJsonAsync(leave, new { successorId = h.Guest });
        var toOther = await h.As(h.Member).PostAsJsonAsync(leave, new { successorId = h.Other });

        Assert.Equal("conversation.successor_required", await AHousehold.CodeOf(silent));
        Assert.Equal("conversation.successor_invalid", await AHousehold.CodeOf(toGuest));
        Assert.Equal(HttpStatusCode.NoContent, toOther.StatusCode);
        var seen = (await h.ConversationsAsync(h.Other)).Single(c => c.Id == room);
        Assert.Equal(h.Other, seen.KeeperId);
        Assert.DoesNotContain(h.Member, seen.ParticipantIds);
        Assert.Equal(HttpStatusCode.NoContent,
            (await h.As(h.Other).PutAsJsonAsync($"{h.Api}/rooms/{room}", new { name = "Dzieciaki" })).StatusCode);
    }

    [Fact]
    public async Task A_guest_leaves_a_room_without_naming_anyone()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var room = await h.CreateRoomAsync(h.Member, "Wakacje", h.Guest);

        var left = await h.As(h.Guest).PostAsync($"{h.Api}/rooms/{room}/leave", null);

        Assert.Equal(HttpStatusCode.NoContent, left.StatusCode);
        Assert.DoesNotContain(await h.ConversationsAsync(h.Guest), c => c.Id == room);
    }

    [Fact]
    public async Task Only_the_keeper_renames_removes_and_archives()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var room = await h.CreateRoomAsync(h.Member, "Zakupy", h.Other);

        var rename = await h.As(h.Other).PutAsJsonAsync($"{h.Api}/rooms/{room}", new { name = "Moje" });
        Assert.Equal("conversation.not_keeper", await AHousehold.CodeOf(rename));

        Assert.Equal(HttpStatusCode.NoContent, (await h.As(h.Member).DeleteAsync($"{h.Api}/rooms/{room}/participants/{h.Other}")).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await h.As(h.Member).PostAsync($"{h.Api}/rooms/{room}/archive", null)).StatusCode);

        var archived = (await h.ConversationsAsync(h.Member)).Single(c => c.Id == room);
        Assert.True(archived.Archived);
        Assert.Equal("conversation.archived", await AHousehold.CodeOf(await h.PostMessageAsync(h.Member, room, "Halo?")));
    }

    [Fact]
    public async Task There_is_one_direct_conversation_per_pair_and_none_with_a_guest()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);

        var first = await h.As(h.Member).PostAsJsonAsync($"{h.Api}/conversations/direct", new { userId = h.Other });
        var second = await h.As(h.Other).PostAsJsonAsync($"{h.Api}/conversations/direct", new { userId = h.Member });
        var withGuest = await h.As(h.Member).PostAsJsonAsync($"{h.Api}/conversations/direct", new { userId = h.Guest });
        var guestStarts = await h.As(h.Guest).PostAsJsonAsync($"{h.Api}/conversations/direct", new { userId = h.Member });

        var id = (await first.Content.ReadFromJsonAsync<JsonNode>())!["id"]!.GetValue<Guid>();
        Assert.Equal(id, (await second.Content.ReadFromJsonAsync<JsonNode>())!["id"]!.GetValue<Guid>());
        Assert.Equal("conversation.direct_invalid", await AHousehold.CodeOf(withGuest));
        Assert.Equal(HttpStatusCode.Forbidden, guestStarts.StatusCode);
        Assert.DoesNotContain(await h.ConversationsAsync(h.Admin), c => c.Id == id);
    }
}

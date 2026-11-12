using System.Net.Http.Json;
using System.Text.Json.Nodes;
using Chat.Application;
using Chat.Domain.Messages;
using HomeApps.BuildingBlocks.Testing;
using HomeApps.Contracts.Households;
using ModelContextProtocol.Client;

namespace Chat.Api.Tests;

/// <summary>The MCP tools as JARVIS calls them: with the person's delegated token, conversations by name.</summary>
public sealed class McpTests(ChatFactory factory) : IClassFixture<ChatFactory>
{
    private const string Endpoint = "plugins/chat/mcp";

    [Fact]
    public async Task The_manifest_and_the_server_name_the_same_tools()
    {
        var json = await factory.CreateClient().GetFromJsonAsync<JsonNode>("/plugins/chat/manifest");
        var h = await AHousehold.SwitchedOnAsync(factory);
        await using var mcp = await Connect(h.Member);

        var tools = await mcp.ListToolsAsync();

        Assert.Equal(["send_message", "unread_summary", "read_conversation"], json!["mcp"]!["tools"]!.AsArray().Select(t => t!.GetValue<string>()));
        Assert.Equal(ChatPlugin.Manifest.Mcp!.Tools.Order(StringComparer.Ordinal), tools.Select(t => t.Name).Order(StringComparer.Ordinal));
        Assert.True(tools.Single(t => t.Name == "unread_summary").ProtocolTool.Annotations!.ReadOnlyHint);
        Assert.True(tools.Single(t => t.Name == "read_conversation").ProtocolTool.Annotations!.ReadOnlyHint);
    }

    [Fact]
    public async Task Send_message_goes_to_Dom_by_default_marked_as_written_through_JARVIS()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        await using var mcp = await Connect(h.Member);

        var sent = await mcp.CallTextAsync("send_message", new Dictionary<string, object?> { ["text"] = "Obiad o **18**" });

        Assert.Equal(("Sent to Dom in Mieszkanie.", false), sent);
        var message = Assert.Single(await h.MessagesAsync(h.Owner, await h.HomeAsync()));
        Assert.Equal((h.Member, "Obiad o **18**", SentVia.Mcp), (message.AuthorId, message.Text, message.SentVia));
    }

    [Fact]
    public async Task Send_message_to_a_person_starts_the_direct_conversation_once_and_to_a_room_by_name()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var room = await h.CreateRoomAsync(h.Member, "Wakacje", h.Admin);
        await using var mcp = await Connect(h.Member);

        var first = await mcp.CallTextAsync("send_message", new Dictionary<string, object?> { ["text"] = "Hej", ["to"] = "tomek" });
        var second = await mcp.CallTextAsync("send_message", new Dictionary<string, object?> { ["text"] = "Jeszcze raz", ["to"] = "Tomek", ["household"] = "Mieszkanie" });
        var toRoom = await mcp.CallTextAsync("send_message", new Dictionary<string, object?> { ["text"] = "Bilety kupione", ["to"] = "wakacje" });
        var nobody = await mcp.CallTextAsync("send_message", new Dictionary<string, object?> { ["text"] = "?", ["to"] = "Zenek" });

        Assert.Equal(("Sent to Tomek in Mieszkanie.", false), first);
        Assert.False(second.IsError);
        Assert.Equal(("Sent to Wakacje in Mieszkanie.", false), toRoom);
        Assert.True(nobody.IsError);
        Assert.Contains("conversation.not_found", nobody.Text, StringComparison.Ordinal);
        var direct = Assert.Single(await h.ConversationsAsync(h.Other), c => c.Kind == Chat.Domain.Conversations.ConversationKind.Direct);
        Assert.Equal(2, direct.Unread);
        Assert.Equal("Bilety kupione", Assert.Single(await h.MessagesAsync(h.Admin, room)).Text);
    }

    [Fact]
    public async Task A_guest_reads_but_never_writes()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        await h.SendAsync(h.Owner, await h.HomeAsync(), "Witaj w domu");
        await using var guest = await Connect(h.Guest);

        var refused = await guest.CallTextAsync("send_message", new Dictionary<string, object?> { ["text"] = "Dzień dobry" });
        var read = await guest.CallTextAsync("read_conversation", new Dictionary<string, object?>());

        Assert.True(refused.IsError);
        Assert.Contains("plugin.forbidden", refused.Text, StringComparison.Ordinal);
        Assert.False(read.IsError);
        Assert.Contains("Ola, ", read.Text, StringComparison.Ordinal);
        Assert.Contains(": Witaj w domu", read.Text, StringComparison.Ordinal);
    }

    [Fact]
    public async Task Read_conversation_shows_plain_lines_oldest_first_with_attachments_and_the_JARVIS_mark()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var home = await h.HomeAsync();
        var photo = await h.UploadCheckedAsync(h.Admin, Media.Png(1600, 1200), "image/png", "a.png");
        await h.SendAsync(h.Owner, home, "Kto *kupi* chleb?");
        await h.SendAsync(h.Admin, home, "Patrzcie", [photo.Id]);
        await using var mcp = await Connect(h.Member);
        await mcp.CallTextAsync("send_message", new Dictionary<string, object?> { ["text"] = "Ja kupię" });

        var read = await mcp.CallTextAsync("read_conversation", new Dictionary<string, object?> { ["with"] = "Dom", ["limit"] = 2 });

        Assert.False(read.IsError);
        var lines = read.Text.Split(Environment.NewLine);
        Assert.Equal(["Dom in Mieszkanie, the last 2:"], lines[..1]);
        Assert.Matches(@"^- Adam, \d{4}-\d\d-\d\d \d\d:\d\d: Patrzcie \[zdjęcie 1600×1200\]$", lines[1]);
        Assert.Matches(@"^- Ania, .* \(via JARVIS\): Ja kupię$", lines[2]);
        Assert.Contains(": Kto kupi chleb?",
            (await mcp.CallTextAsync("read_conversation", new Dictionary<string, object?>())).Text, StringComparison.Ordinal);
    }

    [Fact]
    public async Task Unread_summary_lists_unread_from_others_across_households_and_marks_nothing()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var second = await AHousehold.SwitchedOnAsync(factory);
        factory.Households.HouseholdNames[second.Id] = "Działka";
        factory.Households.Set(second.Id, h.Member, HouseholdRole.Member, name: "Ania");
        var home = await h.HomeAsync();
        var seen = await h.SendAsync(h.Owner, home, "Stare");
        (await h.As(h.Member).PutAsJsonAsync($"{h.Api}/conversations/{home}/read", new { messageId = seen.Id })).EnsureSuccessStatusCode();
        await h.SendAsync(h.Owner, home, "Nowe 1");
        await h.SendAsync(h.Member, home, "Moje");
        await h.SendAsync(h.Admin, home, "Nowe 2");
        await second.SendAsync(second.Owner, await second.HomeAsync(), "Z działki");
        await using var mcp = await Connect(h.Member);

        var summary = await mcp.CallTextAsync("unread_summary", new Dictionary<string, object?>());
        var again = await mcp.CallTextAsync("unread_summary", new Dictionary<string, object?> { ["household"] = "mieszkanie" });

        Assert.False(summary.IsError);
        Assert.Contains("Dom in Mieszkanie: 2 unread", summary.Text, StringComparison.Ordinal);
        Assert.Contains("Dom in Działka: 1 unread", summary.Text, StringComparison.Ordinal);
        Assert.Contains(": Nowe 1", summary.Text, StringComparison.Ordinal);
        Assert.Contains(": Nowe 2", summary.Text, StringComparison.Ordinal);
        Assert.Contains(": Z działki", summary.Text, StringComparison.Ordinal);
        Assert.DoesNotContain("Stare", summary.Text, StringComparison.Ordinal);
        Assert.DoesNotContain("Moje", summary.Text, StringComparison.Ordinal);
        Assert.Contains("Dom in Mieszkanie: 2 unread", again.Text, StringComparison.Ordinal);
        Assert.DoesNotContain("Działka", again.Text, StringComparison.Ordinal);
    }

    [Fact]
    public async Task Unread_summary_skips_households_without_the_chat()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var off = Guid.NewGuid();
        factory.Households.HouseholdNames[off] = "Bez czatu";
        factory.Households.Set(off, h.Member, HouseholdRole.Owner, name: "Ania");
        await using var mcp = await Connect(h.Member);

        var summary = await mcp.CallTextAsync("unread_summary", new Dictionary<string, object?>());
        var named = await mcp.CallTextAsync("unread_summary", new Dictionary<string, object?> { ["household"] = "Bez czatu" });

        Assert.Equal(("Nothing unread.", false), summary);
        Assert.True(named.IsError);
        Assert.Contains("plugin.disabled", named.Text, StringComparison.Ordinal);
    }

    private Task<McpClient> Connect(Guid userId) => McpTestClient.ConnectAsync(factory.CreateAssistantClient(userId), Endpoint);
}

using System.Net.Http.Json;
using HomeApps.Contracts.Notifications;
using Microsoft.AspNetCore.SignalR.Client;

namespace Chat.Api.Tests;

public sealed class NotificationTests(ChatFactory factory) : IClassFixture<ChatFactory>
{
    [Fact]
    public async Task A_message_notifies_everyone_but_the_author_those_who_muted_and_those_looking_at_it()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var home = await h.HomeAsync();
        await h.As(h.Admin).PutAsJsonAsync($"{h.Api}/conversations/{home}/mute", new { until = (DateTimeOffset?)null });
        await using var other = await factory.ConnectAsync(h.Other);
        await other.InvokeAsync("Watch", h.Id);
        await other.InvokeAsync("Open", home);

        await h.SendAsync(h.Member, home, "Obiad **gotowy**!");

        var sent = Assert.Single(factory.Published.OfType<NotificationRequested>(), n => n.HouseholdId == h.Id);
        Assert.Equal(new[] { h.Owner, h.Guest }.Order(), sent.UserIds.Order());
        Assert.Equal(("chat", "message", "Dom", "Ania: Obiad gotowy!"), (sent.Source, sent.Category, sent.Title, sent.Body));
        Assert.Equal($"/homes/{h.Id}/apps/chat/c/{home}", sent.Url);
        Assert.Equal("Nowa wiadomość w Dom", sent.BodyWhenHidden);
    }

    [Fact]
    public async Task A_direct_message_is_titled_with_the_author_and_a_photo_is_described()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var start = await h.As(h.Member).PostAsJsonAsync($"{h.Api}/conversations/direct", new { userId = h.Other });
        var direct = (await start.Content.ReadFromJsonAsync<System.Text.Json.Nodes.JsonNode>())!["id"]!.GetValue<Guid>();
        var photo = await h.UploadCheckedAsync(h.Member, Media.Png(30, 20), "image/png", "a.png");

        await h.SendAsync(h.Member, direct, null, [photo.Id]);

        var sent = Assert.Single(factory.Published.OfType<NotificationRequested>(), n => n.HouseholdId == h.Id);
        Assert.Equal([h.Other], sent.UserIds);
        Assert.Equal(("Ania", "Zdjęcie 30×20", "Nowa wiadomość od Ania"), (sent.Title, sent.Body, sent.BodyWhenHidden));
    }
}

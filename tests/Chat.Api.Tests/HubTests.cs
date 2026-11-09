using System.Net.Http.Json;
using Chat.Application.Common;
using Chat.Application.Households.MemberLeft;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.Extensions.DependencyInjection;

namespace Chat.Api.Tests;

public sealed class HubTests(ChatFactory factory) : IClassFixture<ChatFactory>
{
    [Fact]
    public async Task Watching_a_household_hears_its_conversation_but_not_rooms_one_is_not_in()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var home = await h.HomeAsync();
        var room = await h.CreateRoomAsync(h.Member, "Prezent", h.Other);
        await using var guest = await factory.ConnectAsync(h.Guest);
        await using var other = await factory.ConnectAsync(h.Other);
        var guestHears = new Signals(guest, SignalNames.MessageSent);
        var otherHears = new Signals(other, SignalNames.MessageSent);
        await guest.InvokeAsync("Watch", h.Id);
        await other.InvokeAsync("Watch", h.Id);

        var inHome = await h.SendAsync(h.Member, home, "Dla wszystkich");
        var inRoom = await h.SendAsync(h.Member, room, "Tajemnica");

        await otherHears.WaitForAsync(SignalNames.MessageSent, p => p.GetProperty("messageId").GetGuid() == inRoom.Id);
        var heard = await guestHears.WaitForAsync(SignalNames.MessageSent);
        Assert.Equal((home, inHome.Id), (heard.GetProperty("conversationId").GetGuid(), heard.GetProperty("messageId").GetGuid()));
        await Signals.SettleAsync();
        Assert.Single(guestHears.Of(SignalNames.MessageSent));
    }

    [Fact]
    public async Task Someone_outside_the_household_cannot_watch_it()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        await using var stranger = await factory.ConnectAsync(Guid.NewGuid());

        var refused = await Assert.ThrowsAsync<HubException>(() => stranger.InvokeAsync("Watch", h.Id));

        Assert.Contains("household.not_found", refused.Message, StringComparison.Ordinal);
    }

    [Fact]
    public async Task Typing_reaches_the_others_and_only_writers_type()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var home = await h.HomeAsync();
        await using var member = await factory.ConnectAsync(h.Member);
        await using var guest = await factory.ConnectAsync(h.Guest);
        var memberHears = new Signals(member, SignalNames.Typing);
        await member.InvokeAsync("Watch", h.Id);
        await guest.InvokeAsync("Watch", h.Id);

        await guest.InvokeAsync("Typing", h.Id, home);
        await member.InvokeAsync("Typing", h.Id, home);

        var typing = await memberHears.WaitForAsync(SignalNames.Typing);
        Assert.Equal(h.Member, typing.GetProperty("userId").GetGuid());
        await Signals.SettleAsync();
        Assert.Single(memberHears.Of(SignalNames.Typing));
    }

    [Fact]
    public async Task Leaving_the_household_stops_its_signals_at_once()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var home = await h.HomeAsync();
        await using var other = await factory.ConnectAsync(h.Other);
        var hears = new Signals(other, SignalNames.MessageSent, SignalNames.AccessChanged);
        await other.InvokeAsync("Watch", h.Id);

        factory.Households.Set(h.Id, h.Other, null);
        await using (var scope = factory.Services.CreateAsyncScope())
        {
            Assert.True((await scope.ServiceProvider.GetRequiredService<ISender>().Send(new MemberLeftCommand(h.Id, h.Other))).IsSuccess);
        }

        await hears.WaitForAsync(SignalNames.AccessChanged);
        await h.SendAsync(h.Member, home, "Już nie słyszysz");
        await Signals.SettleAsync();
        Assert.Empty(hears.Of(SignalNames.MessageSent));
    }

    [Fact]
    public async Task An_upload_tells_its_uploader_when_it_is_checked()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        await using var member = await factory.ConnectAsync(h.Member);
        var hears = new Signals(member, SignalNames.AttachmentChanged);

        var response = await h.UploadAsync(h.Member, Media.Png(20, 20), "image/png", "a.png");
        var id = (await response.Content.ReadFromJsonAsync<AttachmentView>(AHousehold.Json))!.Id;

        var changed = await hears.WaitForAsync(SignalNames.AttachmentChanged);
        Assert.Equal((id, "Ready"), (changed.GetProperty("attachmentId").GetGuid(), changed.GetProperty("status").GetString()));
    }
}

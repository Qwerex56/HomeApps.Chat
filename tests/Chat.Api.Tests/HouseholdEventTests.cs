using System.Net.Http.Json;
using Chat.Application.Households.MemberLeft;
using Chat.Application.Households.MemberRoleChanged;
using Chat.Application.Households.UserErased;
using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Contracts.Households;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Chat.Api.Tests;

/// <summary>What Households' and Accounts' events do (C5); the consumers only send these commands.</summary>
public sealed class HouseholdEventTests(ChatFactory factory) : IClassFixture<ChatFactory>
{
    [Fact]
    public async Task A_keeper_removed_from_the_household_leaves_the_room_to_the_longest_present_who_wrote()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var room = await h.CreateRoomAsync(h.Member, "Rodzina", h.Guest, h.Other);
        await h.SendAsync(h.Other, room, "Jestem");
        var start = await h.As(h.Member).PostAsJsonAsync($"{h.Api}/conversations/direct", new { userId = h.Other });
        var direct = (await start.Content.ReadFromJsonAsync<System.Text.Json.Nodes.JsonNode>())!["id"]!.GetValue<Guid>();
        await h.SendAsync(h.Member, direct, "Pa");

        factory.Households.Set(h.Id, h.Member, null);
        await SendAsync(new MemberLeftCommand(h.Id, h.Member));

        var conversations = await h.ConversationsAsync(h.Other);
        var kept = conversations.Single(c => c.Id == room);
        Assert.Equal(h.Other, kept.KeeperId);
        Assert.DoesNotContain(h.Member, kept.ParticipantIds);
        Assert.True(conversations.Single(c => c.Id == direct).Archived);
        Assert.Equal("Pa", Assert.Single(await h.MessagesAsync(h.Other, direct)).Text);
    }

    [Fact]
    public async Task A_keeper_who_becomes_a_guest_hands_the_room_on()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var room = await h.CreateRoomAsync(h.Member, "Ogród", h.Other);

        factory.Households.Set(h.Id, h.Member, HouseholdRole.Guest);
        await SendAsync(new MemberRoleChangedCommand(h.Id, h.Member, HouseholdRole.Guest));

        Assert.Equal(h.Other, (await h.ConversationsAsync(h.Other)).Single(c => c.Id == room).KeeperId);
    }

    [Fact]
    public async Task An_erased_account_leaves_only_deleted_messages_behind()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var home = await h.HomeAsync();
        var photo = await h.UploadCheckedAsync(h.Other, Media.Png(10, 10), "image/png", "a.png");
        await h.SendAsync(h.Other, home, "Moje zdjęcie", [photo.Id]);
        var byMember = await h.SendAsync(h.Member, home, "Ładne");
        await h.As(h.Other).PutAsync($"{h.Api}/messages/{byMember.Id}/reactions/{Uri.EscapeDataString("👍")}", null);

        await SendAsync(new UserErasedCommand(h.Other));

        var messages = await h.MessagesAsync(h.Owner, home);
        Assert.True(messages[0].Deleted);
        Assert.Null(messages[0].Text);
        Assert.Empty(messages[0].Attachments);
        Assert.Empty(messages[1].Reactions);
        Assert.False(Directory.Exists(Path.Combine(factory.MediaRoot, "households", h.Id.ToString("N"), photo.Id.ToString("N"))));
    }

    private async Task SendAsync(ICommand command)
    {
        await using var scope = factory.Services.CreateAsyncScope();
        var result = await scope.ServiceProvider.GetRequiredService<ISender>().Send(command);
        Assert.True(result.IsSuccess, string.Join("; ", result.Errors.Select(e => e.Message)));
    }
}

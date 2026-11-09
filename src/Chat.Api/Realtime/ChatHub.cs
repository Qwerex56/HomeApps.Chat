using Chat.Application.Conversations.Typing;
using Chat.Application.Conversations.Watch;
using HomeApps.BuildingBlocks.Api.Auth;
using FluentResults;
using HomeApps.BuildingBlocks.Domain.Errors;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Chat.Api.Realtime;

/// <summary>
/// <c>/plugins/chat/hub</c> (plan 5). A connection always hears its user's own group (rooms, direct conversations,
/// uploads); <see cref="Watch"/> adds a household's conversation after the same permission check as HTTP. Clients get
/// small signals (<c>SignalNames</c>) and fetch what changed over HTTP.
/// </summary>
internal sealed class ChatHub(ISender sender, ConnectionRegistry registry, IHttpContextAccessor accessor) : Hub
{
    public static string HouseholdGroup(Guid householdId) => $"household:{householdId:N}";

    public static string UserGroup(Guid userId) => $"user:{userId:N}";

    public override async Task OnConnectedAsync()
    {
        var userId = Guid.Parse(Context.User!.FindFirst(ClaimNames.Subject)!.Value);
        registry.Connected(Context.ConnectionId, userId);
        await Groups.AddToGroupAsync(Context.ConnectionId, UserGroup(userId));
        await base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        registry.Disconnected(Context.ConnectionId);
        return base.OnDisconnectedAsync(exception);
    }

    /// <summary>Hear a household. Fails with the same code as HTTP: <c>household.not_found</c>, <c>plugin.disabled</c>, <c>plugin.forbidden</c>.</summary>
    public async Task Watch(Guid householdId)
    {
        UseConnectionRequest();
        var allowed = await sender.Send(new WatchQuery(householdId), Context.ConnectionAborted);
        if (allowed.IsFailed)
        {
            throw new HubException(Code(allowed.Errors));
        }

        registry.Watch(Context.ConnectionId, householdId);
        await Groups.AddToGroupAsync(Context.ConnectionId, HouseholdGroup(householdId));
    }

    /// <summary>The conversation on screen (<c>null</c>: none): no push notifications from it while it is open.</summary>
    public void Open(Guid? conversationId) => registry.Open(Context.ConnectionId, conversationId);

    /// <summary>"… pisze". Refused silently when the caller may not write there.</summary>
    public async Task Typing(Guid householdId, Guid conversationId)
    {
        UseConnectionRequest();
        await sender.Send(new TypingCommand(householdId, conversationId), Context.ConnectionAborted);
    }

    private static string Code(IReadOnlyList<IError> errors) => errors.OfType<AppError>().FirstOrDefault()?.Code ?? "forbidden";

    /// <summary>
    /// The kit reads the caller and their token from the HTTP request; in a hub call that is the connection's own
    /// request (with <c>?access_token=</c>).
    /// </summary>
    private void UseConnectionRequest() => accessor.HttpContext ??= Context.GetHttpContext();
}

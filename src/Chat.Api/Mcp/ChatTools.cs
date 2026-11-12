using System.ComponentModel;
using System.Globalization;
using System.Text;
using Chat.Application.Common;
using Chat.Application.Conversations.GetConversations;
using Chat.Application.Conversations.StartDirect;
using Chat.Application.Messages.GetMessages;
using Chat.Application.Messages.SendMessage;
using Chat.Domain.Conversations;
using Chat.Domain.Messages;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Abstractions;
using HomeApps.BuildingBlocks.Mcp;
using HomeApps.Plugins;
using HomeApps.Plugins.Hosting;
using MediatR;
using ModelContextProtocol.Protocol;
using ModelContextProtocol.Server;
using Result = FluentResults.Result;

namespace Chat.Api.Mcp;

/// <summary>
/// The chat's MCP tools for JARVIS (plan section 8, jarvis-v1.md section 4): the same requests as the HTTP API, so the
/// same permission checks; a guest reads from joining and never writes. Conversations are named the way a person
/// names them: "Dom", a room, or someone. Reading never marks anything read: the person has not seen it yet.
/// </summary>
[McpServerToolType]
internal sealed class ChatTools(ISender sender, IHouseholdDirectory directory, ICurrentUser user, TimeProvider time)
{
    private const int DefaultLimit = 20;
    private const int UnreadShown = 10;

    [McpServerTool(Name = "send_message", Title = "Send a chat message", Destructive = false, OpenWorld = false)]
    [Description("Sends a message in the household chat on the person's behalf; the chat marks it as written through JARVIS.")]
    public async Task<CallToolResult> SendMessage(
        [Description("The message, plain text or Markdown, up to 4000 characters.")] string text,
        [Description("Who gets it: a person's name (a direct conversation, started if needed), a room's name, or \"Dom\" for the whole household (default).")] string? to = null,
        [Description("The household's name or id. Leave out when the person is in one household.")] string? household = null,
        CancellationToken cancellationToken = default)
    {
        var home = await directory.FindHouseholdAsync(household, cancellationToken);
        if (home.IsFailed)
        {
            return ToolResult.Error(home.Errors);
        }

        var targets = await TargetsAsync(home.Value.Id, forWriting: true, cancellationToken);
        var target = targets.Bind(t => Pick(t, to));
        if (target.IsFailed)
        {
            return ToolResult.Error(target.Errors);
        }

        var conversation = target.Value.ConversationId is { } id
            ? Result.Ok(id)
            : await sender.Send(new StartDirectCommand(home.Value.Id, target.Value.PersonId!.Value), cancellationToken);
        if (conversation.IsFailed)
        {
            return ToolResult.Error(conversation.Errors);
        }

        var sent = await sender.Send(
            new SendMessageCommand(home.Value.Id, conversation.Value, Guid.NewGuid(), text, [], null, SentVia.Mcp), cancellationToken);
        return ToolResult.From(sent, _ => $"Sent to {target.Value.Name} in {home.Value.Name}.");
    }

    [McpServerTool(Name = "unread_summary", Title = "Unread chat messages", ReadOnly = true, Idempotent = true, OpenWorld = false)]
    [Description("Says where the person has unread chat messages and shows the newest of them. Does not mark them read.")]
    public async Task<CallToolResult> UnreadSummary(
        [Description("The household's name or id. Leave out for all of the person's households.")] string? household = null,
        CancellationToken cancellationToken = default)
    {
        var homes = await directory.HouseholdsToSearchAsync(household, cancellationToken);
        if (homes.IsFailed)
        {
            return ToolResult.Error(homes.Errors);
        }

        var text = new StringBuilder();
        foreach (var home in homes.Value)
        {
            var conversations = await sender.Send(new GetConversationsQuery(home.Id), cancellationToken);
            if (conversations.IsFailed)
            {
                if (!string.IsNullOrWhiteSpace(household) || !PluginErrors.IsOffOrForbidden(conversations.Errors))
                {
                    return ToolResult.Error(conversations.Errors);
                }

                continue;
            }

            var unread = conversations.Value.Where(c => c.Unread > 0).OrderByDescending(c => c.LastMessageAt).ToList();
            if (unread.Count == 0)
            {
                continue;
            }

            var names = await NamesAsync(home.Id, cancellationToken);
            foreach (var conversation in unread)
            {
                // Up to ten unread: everything after the read marker; more: the newest ten, all of them unread anyway.
                var page = conversation.Unread <= UnreadShown
                    ? new GetMessagesQuery(home.Id, conversation.Id, null, conversation.LastReadMessageId, GetMessagesQuery.MaxLimit)
                    : new GetMessagesQuery(home.Id, conversation.Id, null, null, UnreadShown);
                var messages = await sender.Send(page, cancellationToken);
                if (messages.IsFailed)
                {
                    return ToolResult.Error(messages.Errors);
                }

                text.AppendLine(CultureInfo.InvariantCulture, $"{Title(conversation, names)} in {home.Name}: {conversation.Unread} unread");
                foreach (var message in messages.Value.Where(m => m.AuthorId != user.RequiredUserId).TakeLast(UnreadShown))
                {
                    text.AppendLine(MessageLines.Of(message, names, time.LocalTimeZone));
                }
            }
        }

        return ToolResult.Text(text.Length == 0 ? "Nothing unread." : text.ToString().TrimEnd());
    }

    [McpServerTool(Name = "read_conversation", Title = "Read a chat conversation", ReadOnly = true, Idempotent = true, OpenWorld = false)]
    [Description("Shows the latest messages of a conversation, oldest first. Does not mark them read.")]
    public async Task<CallToolResult> ReadConversation(
        [Description("A person's name (the direct conversation with them), a room's name, or \"Dom\" (default).")] string? with = null,
        [Description("How many of the latest messages, 1 to 100; 20 when left out.")] int? limit = null,
        [Description("The household's name or id. Leave out when the person is in one household.")] string? household = null,
        CancellationToken cancellationToken = default)
    {
        var home = await directory.FindHouseholdAsync(household, cancellationToken);
        if (home.IsFailed)
        {
            return ToolResult.Error(home.Errors);
        }

        var targets = await TargetsAsync(home.Value.Id, forWriting: false, cancellationToken);
        var target = targets.Bind(t => Pick(t, with));
        if (target.IsFailed)
        {
            return ToolResult.Error(target.Errors);
        }

        var count = Math.Clamp(limit ?? DefaultLimit, 1, GetMessagesQuery.MaxLimit);
        var messages = await sender.Send(new GetMessagesQuery(home.Value.Id, target.Value.ConversationId!.Value, null, null, count), cancellationToken);
        if (messages.IsFailed)
        {
            return ToolResult.Error(messages.Errors);
        }

        if (messages.Value.Count == 0)
        {
            return ToolResult.Text($"No messages in {target.Value.Name} yet.");
        }

        var names = await NamesAsync(home.Value.Id, cancellationToken);
        var text = new StringBuilder(string.Create(CultureInfo.InvariantCulture, $"{target.Value.Name} in {home.Value.Name}, the last {messages.Value.Count}:"));
        foreach (var message in messages.Value)
        {
            text.AppendLine().Append(MessageLines.Of(message, names, time.LocalTimeZone));
        }

        return ToolResult.Text(text.ToString());
    }

    /// <summary>
    /// The caller's conversations by name; for writing, without archived ones and with everyone else in the household
    /// who has no direct conversation with them yet.
    /// </summary>
    private async Task<Result<List<ChatTarget>>> TargetsAsync(Guid householdId, bool forWriting, CancellationToken cancellationToken)
    {
        var conversations = await sender.Send(new GetConversationsQuery(householdId), cancellationToken);
        if (conversations.IsFailed)
        {
            return conversations.ToResult<List<ChatTarget>>();
        }

        var names = await NamesAsync(householdId, cancellationToken);
        var targets = conversations.Value
            .Where(c => !(forWriting && c.Archived))
            .Select(c => new ChatTarget(Title(c, names), c.Id, c.Kind == ConversationKind.Direct ? Other(c) : null))
            .ToList();
        if (forWriting)
        {
            var talkedTo = targets.Where(t => t.PersonId is not null).Select(t => t.PersonId!.Value).ToHashSet();
            targets.AddRange(names
                .Where(n => n.Key != user.RequiredUserId && !talkedTo.Contains(n.Key))
                .Select(n => new ChatTarget(n.Value, null, n.Key)));
        }

        return targets;
    }

    private static Result<ChatTarget> Pick(List<ChatTarget> targets, string? name) =>
        NameLookup.Find(targets, string.IsNullOrWhiteSpace(name) ? Conversation.HouseholdName : name, t => t.Id, t => t.Name, "conversation");

    private async Task<Dictionary<Guid, string>> NamesAsync(Guid householdId, CancellationToken cancellationToken) =>
        (await directory.MemberNamesAsync(householdId, cancellationToken)).ToDictionary(m => m.UserId, m => m.Name);

    private string Title(ConversationView conversation, IReadOnlyDictionary<Guid, string> names) =>
        conversation.Name ?? (Other(conversation) is { } other ? names.GetValueOrDefault(other, MessageLines.FormerMember) : MessageLines.FormerMember);

    private Guid? Other(ConversationView conversation) =>
        conversation.ParticipantIds.Where(p => p != user.RequiredUserId).Select(p => (Guid?)p).FirstOrDefault();
}

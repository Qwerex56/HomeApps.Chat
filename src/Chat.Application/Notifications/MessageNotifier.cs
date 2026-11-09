using System.Text.RegularExpressions;
using Chat.Application.Abstractions;
using Chat.Domain.Attachments;
using Chat.Domain.Conversations;
using Chat.Domain.Messages;
using HomeApps.Plugins.Notifications;
using Microsoft.Extensions.Logging;

namespace Chat.Application.Notifications;

/// <summary>
/// Push notifications for a new message (plan 5, Etap 0): everyone who reads the conversation except the author, those
/// who silenced it and those who have it open right now. One notification per conversation (<c>Tag</c>), so the next
/// message replaces it. Plain text, never Markdown (9a). The names come from Households with the author's token; if
/// Households does not answer, the message is still sent, only without notifications.
/// </summary>
internal sealed partial class MessageNotifier(
    IHouseholdMembers members, IMuteRepository mutes, IPresence presence, INotifier notifier, TimeProvider time, ILogger<MessageNotifier> logger)
{
    public const int ExcerptLength = 140;

    public async Task NotifyAsync(Conversation conversation, Message message, IReadOnlyList<Attachment> files, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(conversation);
        ArgumentNullException.ThrowIfNull(message);
        ArgumentNullException.ThrowIfNull(files);

        IReadOnlyList<HouseholdMember> household;
        try
        {
            household = await members.ListAsync(conversation.HouseholdId, cancellationToken);
        }
        catch (HttpRequestException exception)
        {
            LogNoMembers(conversation.HouseholdId, exception);
            return;
        }

        var audience = conversation.Kind == ConversationKind.Household
            ? household.Select(m => m.UserId)
            : conversation.Participants.Select(p => p.UserId);
        var muted = await mutes.ListMutedAsync(conversation.Id, time.GetUtcNow(), cancellationToken);
        var recipients = audience
            .Where(id => id != message.AuthorId && !muted.Contains(id) && !presence.IsViewing(id, conversation.Id))
            .Distinct()
            .ToList();
        if (recipients.Count == 0)
        {
            return;
        }

        var author = household.FirstOrDefault(m => m.UserId == message.AuthorId)?.Name ?? "Ktoś";
        var direct = conversation.Kind == ConversationKind.Direct;
        var title = conversation.Kind switch
        {
            ConversationKind.Household => Conversation.HouseholdName,
            ConversationKind.Room => conversation.Name!.Value,
            _ => author,
        };
        var content = Excerpt(message.Text?.Value) ?? Describe(files);

        await notifier.NotifyAsync(
            new PluginNotification(
                recipients,
                ChatPlugin.MessageNotification,
                title,
                direct ? content : $"{author}: {content}",
                $"/homes/{conversation.HouseholdId}/apps/chat/c/{conversation.Id}",
                conversation.HouseholdId,
                $"chat-{conversation.Id:N}",
                direct ? $"Nowa wiadomość od {author}" : $"Nowa wiadomość w {title}"),
            cancellationToken);
    }

    /// <summary>One line without Markdown marks, cut at <see cref="ExcerptLength"/>.</summary>
    internal static string? Excerpt(string? text)
    {
        if (text is null)
        {
            return null;
        }

        var plain = Whitespace().Replace(MarkdownMarks().Replace(text, string.Empty), " ").Trim();
        if (plain.Length == 0)
        {
            return null;
        }

        return plain.Length <= ExcerptLength ? plain : string.Concat(plain.AsSpan(0, ExcerptLength - 1).TrimEnd(), "…");
    }

    private static string Describe(IReadOnlyList<Attachment> files) => files.Count switch
    {
        0 => "Wiadomość",
        1 => Capitalize(files[0].Describe()),
        _ => $"{Capitalize(files[0].Describe())} i {files.Count - 1} więcej",
    };

    private static string Capitalize(string text) => text.Length == 0 ? text : char.ToUpperInvariant(text[0]) + text[1..];

    [GeneratedRegex(@"[*_~`>#]+")]
    private static partial Regex MarkdownMarks();

    [GeneratedRegex(@"\s+")]
    private static partial Regex Whitespace();

    [LoggerMessage(Level = LogLevel.Warning, Message = "Households did not list the members of {HouseholdId}; the message goes without notifications.")]
    private partial void LogNoMembers(Guid householdId, Exception exception);
}

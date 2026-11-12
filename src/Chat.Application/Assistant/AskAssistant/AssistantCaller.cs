using Chat.Application.Abstractions;
using Chat.Application.Common;
using Chat.Domain.Conversations;
using Chat.Domain.Messages;
using HomeApps.BuildingBlocks.Application.Abstractions;
using HomeApps.Contracts.Assistant;
using HomeApps.Plugins;

namespace Chat.Application.Assistant.AskAssistant;

/// <summary>
/// A message that asks JARVIS goes to him (jarvis-v1.md 5.2) when the household turned him on: with the last messages
/// as context (JV8), as plain text with the authors' names. Sent through the outbox, with the message.
/// </summary>
public sealed class AssistantCaller(
    IChatSettingsRepository settings, IMessageRepository messages, IHouseholdDirectory directory, IEventBus events, TimeProvider time)
{
    /// <summary>JV8: the last messages before the question.</summary>
    public const int ContextSize = 10;

    public const string AssistantName = "JARVIS";

    public async Task AskIfAskedAsync(Conversation conversation, Message message, Message? replyTo, CancellationToken cancellationToken)
    {
        if (!message.AsksAssistant(conversation, replyTo)
            || (await settings.FindAsync(conversation.HouseholdId, cancellationToken))?.AssistantEnabled != true)
        {
            return;
        }

        var before = await messages.ListBeforeAsync(conversation.Id, message.Id, ContextSize, cancellationToken);
        var names = (await directory.MemberNamesAsync(conversation.HouseholdId, cancellationToken)).ToDictionary(m => m.UserId, m => m.Name);
        var context = before
            .Where(m => m.Text is not null)
            .Select(m => new AssistantContextLine(NameOf(m, names), PlainText.Of(m.Text!.Value) ?? string.Empty, m.SentAt))
            .ToList();

        await events.PublishAsync(
            new AssistantInvoked(
                Guid.CreateVersion7(),
                AssistantReference.Channel,
                new AssistantReference(conversation.Id, message.Id).ToString(),
                conversation.HouseholdId,
                message.AuthorId,
                message.Text?.Value ?? string.Empty,
                context,
                time.GetUtcNow()),
            cancellationToken);
    }

    private static string NameOf(Message message, Dictionary<Guid, string> names) =>
        message.AuthorKind == AuthorKind.Assistant ? AssistantName : names.GetValueOrDefault(message.AuthorId, "?");
}

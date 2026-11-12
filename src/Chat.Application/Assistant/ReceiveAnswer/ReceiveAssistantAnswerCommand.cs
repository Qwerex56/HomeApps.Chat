using Chat.Domain.Assistant;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Assistant.ReceiveAnswer;

/// <summary>
/// <c>AssistantResponded</c> for the chat: JARVIS's answer to a message, or (with <paramref name="InvocationId"/> = a
/// confirmation id) a card line changed after the person decided.
/// </summary>
public sealed record ReceiveAssistantAnswerCommand(
    Guid InvocationId, AssistantReference Reference, string Text, IReadOnlyList<AssistantAction> Actions) : ICommand;

using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Assistant.ShowWorking;

/// <summary><c>AssistantWorking</c>: the conversation shows "JARVIS pisze…" under the message that asked.</summary>
public sealed record ShowAssistantWorkingCommand(AssistantReference Reference) : ICommand;

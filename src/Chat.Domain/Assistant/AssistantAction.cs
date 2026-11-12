namespace Chat.Domain.Assistant;

/// <summary>
/// One line of JARVIS's action card under his message (jarvis-v1.md 5.4), as JARVIS reported it; the chat only shows it.
/// </summary>
/// <param name="Status">JARVIS's status: Done, Failed, NeedsConfirmation, Denied, Expired.</param>
/// <param name="ConfirmationId">Set while it waits for the person who asked: their click goes back to JARVIS with it.</param>
public sealed record AssistantAction(string Description, string Status, string? Url, Guid? ConfirmationId, DateTimeOffset? ConfirmBy)
{
    public const string NeedsConfirmation = "NeedsConfirmation";

    public bool Waits(DateTimeOffset now) => Status == NeedsConfirmation && ConfirmationId is not null && (ConfirmBy is null || ConfirmBy > now);
}

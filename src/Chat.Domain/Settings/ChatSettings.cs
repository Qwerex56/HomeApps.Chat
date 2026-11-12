namespace Chat.Domain.Settings;

/// <summary>A household's chat settings; for now only "JARVIS w czacie" (JV10), off until an Admin turns it on.</summary>
public sealed class ChatSettings
{
    private ChatSettings() { }

    public Guid HouseholdId { get; private set; }

    public bool AssistantEnabled { get; private set; }

    public DateTimeOffset ChangedAt { get; private set; }

    public Guid ChangedBy { get; private set; }

    public static ChatSettings Defaults(Guid householdId) => new() { HouseholdId = householdId };

    public static ChatSettings Create(Guid householdId, bool assistantEnabled, Guid changedBy, TimeProvider time)
    {
        ArgumentNullException.ThrowIfNull(time);
        return new ChatSettings
        {
            HouseholdId = householdId,
            AssistantEnabled = assistantEnabled,
            ChangedAt = time.GetUtcNow(),
            ChangedBy = changedBy,
        };
    }

    public void Change(bool assistantEnabled, Guid changedBy, TimeProvider time)
    {
        ArgumentNullException.ThrowIfNull(time);
        AssistantEnabled = assistantEnabled;
        ChangedAt = time.GetUtcNow();
        ChangedBy = changedBy;
    }
}

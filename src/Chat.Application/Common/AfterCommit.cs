using Chat.Domain.Attachments;
using Chat.Domain.Conversations;

namespace Chat.Application.Common;

/// <summary>
/// What a handler wants done once its changes are saved, and only then (<see cref="AfterCommitBehavior{TRequest,TResponse}"/>):
/// signals to browsers, files to delete and uploads to process. A failed request does none of it. Scoped: one per request,
/// hub call or message.
/// </summary>
public sealed class AfterCommit
{
    private readonly List<ChatSignal> _signals = [];
    private readonly List<(Guid HouseholdId, Guid UserId)> _evictions = [];
    private readonly List<string> _deletedFiles = [];
    private readonly List<Guid> _uploads = [];

    internal IReadOnlyList<ChatSignal> Signals => _signals;

    internal IReadOnlyList<(Guid HouseholdId, Guid UserId)> Evictions => _evictions;

    internal IReadOnlyList<string> DeletedFiles => _deletedFiles;

    internal IReadOnlyList<Guid> Uploads => _uploads;

    /// <summary>To everyone who reads <paramref name="conversation"/>, and to <paramref name="alsoTo"/> (e.g. who was just removed).</summary>
    public void Signal(Conversation conversation, string name, object payload, IEnumerable<Guid>? alsoTo = null)
    {
        ArgumentNullException.ThrowIfNull(conversation);
        if (conversation.Kind == ConversationKind.Household)
        {
            _signals.Add(new ChatSignal(name, payload, conversation.HouseholdId, []));
            return;
        }

        var users = conversation.Participants.Select(p => p.UserId).Concat(alsoTo ?? []).Distinct().ToList();
        _signals.Add(new ChatSignal(name, payload, null, users));
    }

    public void Signal(IEnumerable<Guid> users, string name, object payload) =>
        _signals.Add(new ChatSignal(name, payload, null, users.Distinct().ToList()));

    public void Evict(Guid householdId, Guid userId) => _evictions.Add((householdId, userId));

    /// <summary>Every file of the attachment goes.</summary>
    public void DeleteFiles(Attachment attachment)
    {
        ArgumentNullException.ThrowIfNull(attachment);
        _deletedFiles.AddRange(Enum.GetValues<MediaVariant>().Select(attachment.Key));
    }

    public void Process(Attachment attachment)
    {
        ArgumentNullException.ThrowIfNull(attachment);
        _uploads.Add(attachment.Id);
    }

    internal void Clear()
    {
        _signals.Clear();
        _evictions.Clear();
        _deletedFiles.Clear();
        _uploads.Clear();
    }
}

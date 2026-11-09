using Chat.Domain.Common;
using FluentResults;

namespace Chat.Domain.Conversations;

/// <summary>
/// A conversation in one household (plan section 2): the household's own "Dom", a room of chosen people, or two people
/// talking directly. Rooms and direct conversations are private: nobody outside them reads them, not the household's
/// Owner and not a server admin. Messages are a separate aggregate and ask the conversation who may read and write.
/// </summary>
public sealed class Conversation
{
    /// <summary>The name of the household's conversation, created when the plugin is switched on for the first time.</summary>
    public const string HouseholdName = "Dom";

    private readonly List<Participant> _participants = [];

    private Conversation() { }

    private Conversation(Guid id, Guid householdId, ConversationKind kind, RoomName? name, Guid? keeperId, DateTimeOffset now)
    {
        Id = id;
        HouseholdId = householdId;
        Kind = kind;
        Name = name;
        KeeperId = keeperId;
        CreatedAt = now;
    }

    public Guid Id { get; private set; }

    public Guid HouseholdId { get; private set; }

    public ConversationKind Kind { get; private set; }

    /// <summary>Only rooms have a name; the household's is <see cref="HouseholdName"/>, a direct one shows the other person.</summary>
    public RoomName? Name { get; private set; }

    /// <summary>A room's keeper: renames, removes others and archives (C13). The creator, then whoever the leaving keeper chose.</summary>
    public Guid? KeeperId { get; private set; }

    /// <summary>Rooms and direct conversations only; the household's conversation lists nobody.</summary>
    public IReadOnlyList<Participant> Participants => _participants;

    /// <summary>For a direct conversation the two user ids in order (<c>a:b</c>), so there is only one per pair.</summary>
    public string? DirectKey { get; private set; }

    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>When the newest message came; conversations are listed by it.</summary>
    public DateTimeOffset? LastMessageAt { get; private set; }

    /// <summary>An archived conversation is read-only.</summary>
    public DateTimeOffset? ArchivedAt { get; private set; }

    public bool IsArchived => ArchivedAt is not null;

    /// <summary>"Dom", when the plugin is switched on in a household for the first time.</summary>
    public static Conversation CreateForHousehold(Guid householdId, TimeProvider time)
    {
        ArgumentNullException.ThrowIfNull(time);
        var now = time.GetUtcNow();
        return new Conversation(Guid.CreateVersion7(now), RequireHousehold(householdId), ConversationKind.Household, null, null, now);
    }

    /// <summary>
    /// A room with its creator as keeper and the people they chose (<c>chat.rooms</c> is checked before). The others
    /// must be members of the household, guests included; the Application layer checks that against Households.
    /// </summary>
    public static Result<Conversation> CreateRoom(Guid householdId, Actor actor, string? name, IEnumerable<Guid> others, TimeProvider time)
    {
        ArgumentNullException.ThrowIfNull(actor);
        ArgumentNullException.ThrowIfNull(others);
        ArgumentNullException.ThrowIfNull(time);
        if (!actor.Writes)
        {
            return Result.Fail<Conversation>(ChatErrors.ReadOnly);
        }

        var validName = RoomName.Create(name);
        if (validName.IsFailed)
        {
            return validName.ToResult<Conversation>();
        }

        var now = time.GetUtcNow();
        var room = new Conversation(Guid.CreateVersion7(now), RequireHousehold(householdId), ConversationKind.Room, validName.Value, actor.UserId, now);
        room._participants.Add(new Participant(actor.UserId, now));
        foreach (var userId in others.Where(id => id != Guid.Empty && id != actor.UserId).Distinct())
        {
            room._participants.Add(new Participant(userId, now));
        }

        return room;
    }

    /// <summary>
    /// Two people from one household (<c>chat.direct</c> for both, checked before). There is at most one per pair:
    /// the handler looks it up by <see cref="DirectKeyOf"/> before creating a new one.
    /// </summary>
    public static Result<Conversation> StartDirect(Guid householdId, Actor actor, Guid otherId, TimeProvider time)
    {
        ArgumentNullException.ThrowIfNull(actor);
        ArgumentNullException.ThrowIfNull(time);
        if (!actor.Writes)
        {
            return Result.Fail<Conversation>(ChatErrors.ReadOnly);
        }

        if (otherId == Guid.Empty || otherId == actor.UserId)
        {
            return Result.Fail<Conversation>(ChatErrors.DirectWithSelf);
        }

        var now = time.GetUtcNow();
        var direct = new Conversation(Guid.CreateVersion7(now), RequireHousehold(householdId), ConversationKind.Direct, null, null, now)
        {
            DirectKey = DirectKeyOf(actor.UserId, otherId),
        };
        direct._participants.Add(new Participant(actor.UserId, now));
        direct._participants.Add(new Participant(otherId, now));
        return direct;
    }

    /// <summary>The same key whoever starts the conversation.</summary>
    public static string DirectKeyOf(Guid a, Guid b) =>
        a.CompareTo(b) < 0 ? $"{a:N}:{b:N}" : $"{b:N}:{a:N}";

    public bool IsParticipant(Guid userId) => _participants.Any(p => p.UserId == userId);

    /// <summary>
    /// The household's conversation for everyone (membership is checked before); a room or a direct conversation only
    /// for its participants. Anyone else gets "not found": a private conversation's existence is private too.
    /// </summary>
    public Result CanRead(Actor actor)
    {
        ArgumentNullException.ThrowIfNull(actor);
        return Kind == ConversationKind.Household || IsParticipant(actor.UserId)
            ? Result.Ok()
            : Result.Fail(ChatErrors.ConversationNotFound);
    }

    /// <summary>
    /// The oldest moment whose messages <paramref name="actor"/> sees here (C3): <c>null</c> for the whole history. A guest
    /// sees from joining the household, in a room from being added if that is later. Others see a room's whole history,
    /// also from before they were added (C13).
    /// </summary>
    public DateTimeOffset? ReadsFrom(Actor actor)
    {
        ArgumentNullException.ThrowIfNull(actor);
        if (actor.ReadsFrom is not { } joined)
        {
            return null;
        }

        var added = _participants.FirstOrDefault(p => p.UserId == actor.UserId)?.AddedAt;
        return added is { } at && at > joined ? at : joined;
    }

    /// <summary>Who may write, react and send media here: a reader with <c>chat.write</c>, while it is not archived.</summary>
    public Result CanWrite(Actor actor)
    {
        var readable = CanRead(actor);
        if (readable.IsFailed)
        {
            return readable;
        }

        if (!actor.Writes)
        {
            return Result.Fail(ChatErrors.ReadOnly);
        }

        return IsArchived ? Result.Fail(ChatErrors.ConversationArchived) : Result.Ok();
    }

    /// <summary>A new message arrived; conversations are listed by the newest one.</summary>
    public void MessageArrived(DateTimeOffset at)
    {
        if (LastMessageAt is null || at > LastMessageAt)
        {
            LastMessageAt = at;
        }
    }

    public Result Rename(Actor actor, string? name)
    {
        var allowed = CanKeep(actor);
        if (allowed.IsFailed)
        {
            return allowed;
        }

        var validName = RoomName.Create(name);
        if (validName.IsFailed)
        {
            return validName.ToResult();
        }

        Name = validName.Value;
        return Result.Ok();
    }

    /// <summary>
    /// Any participant with <c>chat.rooms</c> (checked before) adds people from the household, guests included (C13).
    /// People already there are skipped. Returns who was really added.
    /// </summary>
    public Result<IReadOnlyList<Guid>> AddParticipants(Actor actor, IEnumerable<Guid> userIds, TimeProvider time)
    {
        ArgumentNullException.ThrowIfNull(userIds);
        ArgumentNullException.ThrowIfNull(time);
        var allowed = CanChangeRoom(actor);
        if (allowed.IsFailed)
        {
            return allowed.ToResult<IReadOnlyList<Guid>>();
        }

        var now = time.GetUtcNow();
        var added = userIds.Where(id => id != Guid.Empty && !IsParticipant(id)).Distinct().ToList();
        if (added.Count == 0)
        {
            return Result.Fail<IReadOnlyList<Guid>>(ChatErrors.ParticipantsInvalid);
        }

        _participants.AddRange(added.Select(id => new Participant(id, now)));
        return added;
    }

    /// <summary>Only the keeper removes others; everyone else leaves with <see cref="Leave"/>.</summary>
    public Result RemoveParticipant(Actor actor, Guid userId)
    {
        var allowed = CanKeep(actor);
        if (allowed.IsFailed)
        {
            return allowed;
        }

        if (userId == actor.UserId || !IsParticipant(userId))
        {
            return Result.Fail(ChatErrors.ParticipantsInvalid);
        }

        Remove(userId);
        return Result.Ok();
    }

    /// <summary>
    /// Anyone leaves a room (C13). A keeper who leaves while others stay chooses the next keeper among them
    /// (<paramref name="successor"/>; the Application layer checks they may write); the last one out archives the room.
    /// </summary>
    public Result Leave(Actor actor, Guid? successor, TimeProvider time)
    {
        ArgumentNullException.ThrowIfNull(actor);
        ArgumentNullException.ThrowIfNull(time);
        if (Kind != ConversationKind.Room)
        {
            return Result.Fail(ChatErrors.NotARoom);
        }

        if (!IsParticipant(actor.UserId))
        {
            return Result.Fail(ChatErrors.ConversationNotFound);
        }

        if (KeeperId == actor.UserId && _participants.Count > 1)
        {
            if (successor is not { } next)
            {
                return Result.Fail(ChatErrors.SuccessorRequired);
            }

            if (next == actor.UserId || !IsParticipant(next))
            {
                return Result.Fail(ChatErrors.SuccessorInvalid);
            }

            KeeperId = next;
        }

        Remove(actor.UserId);
        ArchiveIfEmpty(time);
        return Result.Ok();
    }

    public Result Archive(Actor actor, TimeProvider time)
    {
        ArgumentNullException.ThrowIfNull(time);
        var allowed = CanKeep(actor);
        if (allowed.IsFailed)
        {
            return allowed;
        }

        ArchivedAt = time.GetUtcNow();
        return Result.Ok();
    }

    /// <summary>
    /// The person left the household (<c>MemberLeft</c>): out of every room and an empty room archived; a direct
    /// conversation with them stays readable for the other person but takes no new messages. Their messages stay (C5).
    /// A keeper removed from the household had no chance to choose, so the room goes to <paramref name="successor"/>
    /// (the Application layer picks the longest present who may write) or, without one, to the longest present.
    /// </summary>
    public void MemberLeft(Guid userId, Guid? successor, TimeProvider time)
    {
        ArgumentNullException.ThrowIfNull(time);
        switch (Kind)
        {
            case ConversationKind.Room when IsParticipant(userId):
                if (KeeperId == userId)
                {
                    KeeperId = successor is { } next && next != userId && IsParticipant(next)
                        ? next
                        : _participants.Where(p => p.UserId != userId).OrderBy(p => p.AddedAt).Select(p => (Guid?)p.UserId).FirstOrDefault();
                }

                Remove(userId);
                ArchiveIfEmpty(time);
                break;
            case ConversationKind.Direct when IsParticipant(userId) && !IsArchived:
                ArchivedAt = time.GetUtcNow();
                break;
        }
    }

    private Result CanChangeRoom(Actor actor)
    {
        ArgumentNullException.ThrowIfNull(actor);
        if (Kind != ConversationKind.Room)
        {
            return Kind == ConversationKind.Household || IsParticipant(actor.UserId)
                ? Result.Fail(ChatErrors.NotARoom)
                : Result.Fail(ChatErrors.ConversationNotFound);
        }

        return CanWrite(actor);
    }

    private Result CanKeep(Actor actor)
    {
        var allowed = CanChangeRoom(actor);
        if (allowed.IsFailed)
        {
            return allowed;
        }

        return KeeperId == actor.UserId ? Result.Ok() : Result.Fail(ChatErrors.NotKeeper);
    }

    private void Remove(Guid userId)
    {
        _participants.RemoveAll(p => p.UserId == userId);
        if (KeeperId == userId)
        {
            KeeperId = null;
        }
    }

    private void ArchiveIfEmpty(TimeProvider time)
    {
        if (_participants.Count == 0 && !IsArchived)
        {
            ArchivedAt = time.GetUtcNow();
        }
    }

    private static Guid RequireHousehold(Guid householdId) =>
        householdId == Guid.Empty ? throw new ArgumentException("The household id cannot be empty.", nameof(householdId)) : householdId;
}

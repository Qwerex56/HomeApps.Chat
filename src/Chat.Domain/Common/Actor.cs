namespace Chat.Domain.Common;

/// <summary>
/// Who acts, as the Application layer saw them through the manifest's permissions: membership and the permission of the
/// request itself are already checked (<c>HouseholdPermissionBehavior</c>); the domain adds the rules about
/// conversations, authors and keepers.
/// </summary>
/// <param name="Writes"><c>chat.write</c>: writes, reacts and sends media. Guests only read (C3).</param>
/// <param name="Moderates"><c>chat.moderate</c>: deletes other people's messages in the household's conversation.</param>
/// <param name="ReadsFrom">The oldest moment whose messages they see: a guest's <c>JoinedAt</c>; <c>null</c> for the whole
/// history (Member and up).</param>
public sealed record Actor(Guid UserId, bool Writes, bool Moderates, DateTimeOffset? ReadsFrom)
{
    public static Actor Member(Guid userId) => new(userId, Writes: true, Moderates: false, ReadsFrom: null);

    public static Actor Moderator(Guid userId) => new(userId, Writes: true, Moderates: true, ReadsFrom: null);

    public static Actor Guest(Guid userId, DateTimeOffset joinedAt) => new(userId, Writes: false, Moderates: false, ReadsFrom: joinedAt);
}

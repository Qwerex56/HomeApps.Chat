using Chat.Application.Abstractions;
using Chat.Domain.Conversations;

namespace Chat.Application.Common;

/// <summary>
/// The next keeper when the keeper cannot choose (removed from the household, or may no longer write): the longest present
/// participant who has written in the room, since guests never write. Without one the domain takes the longest present.
/// </summary>
internal static class Successors
{
    public static async Task<Guid?> PickAsync(Conversation room, Guid keeperId, IMessageRepository messages, CancellationToken cancellationToken)
    {
        var candidates = room.Participants.Where(p => p.UserId != keeperId).OrderBy(p => p.AddedAt).Select(p => p.UserId).ToList();
        if (candidates.Count == 0)
        {
            return null;
        }

        var authors = await messages.AuthorsAmongAsync(room.Id, candidates, cancellationToken);
        return candidates.Where(authors.Contains).Select(id => (Guid?)id).FirstOrDefault();
    }
}

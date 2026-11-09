using System.Collections.Concurrent;

namespace Chat.Api.Realtime;

/// <summary>One open hub connection: whose, which households it hears and which conversation is on screen.</summary>
internal sealed class Connection(Guid userId)
{
    public Guid UserId { get; } = userId;

    public ConcurrentDictionary<Guid, byte> Households { get; } = new();

    public Guid? OpenConversation { get; set; }
}

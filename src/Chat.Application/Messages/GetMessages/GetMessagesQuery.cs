using Chat.Application.Common;
using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Messages.GetMessages;

/// <summary>
/// One page of a conversation, oldest first: the newest <paramref name="Limit"/>, or older than <paramref name="Before"/>
/// (scrolling up), or newer than <paramref name="After"/> (catching up after a lost connection). A guest gets nothing
/// older than their joining (C3).
/// </summary>
public sealed record GetMessagesQuery(Guid HouseholdId, Guid ConversationId, Guid? Before, Guid? After, int Limit)
    : IQuery<IReadOnlyList<MessageView>>, IHouseholdRequest
{
    public const int MaxLimit = 100;

    public string Permission => ChatPlugin.Read;
}

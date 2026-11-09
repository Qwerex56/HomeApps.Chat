using Chat.Application.Common;
using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Messages.GetMessage;

public sealed record GetMessageQuery(Guid HouseholdId, Guid MessageId) : IQuery<MessageView>, IHouseholdRequest
{
    public string Permission => ChatPlugin.Read;
}

using Chat.Application.Common;
using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Attachments.GetAttachment;

/// <summary>The uploader asks how the check went (also told on the hub); nobody else sees an unsent upload.</summary>
public sealed record GetAttachmentQuery(Guid HouseholdId, Guid AttachmentId) : IQuery<AttachmentView>, IHouseholdRequest
{
    public string Permission => ChatPlugin.Write;
}

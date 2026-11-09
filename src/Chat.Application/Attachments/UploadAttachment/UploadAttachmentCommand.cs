using Chat.Application.Common;
using HomeApps.BuildingBlocks.Application.Messaging;
using HomeApps.Plugins;

namespace Chat.Application.Attachments.UploadAttachment;

/// <summary>
/// A photo or a video before the message (plan 4.2): stored at once, answered <c>Pending</c>, checked in the background
/// (<c>AttachmentChanged</c> on the hub when done). The household's space is limited (C11).
/// </summary>
/// <param name="ContentType">What the browser says; the content is checked later anyway.</param>
public sealed record UploadAttachmentCommand(Guid HouseholdId, string? ContentType, long Size, Stream Content)
    : ICommand<AttachmentView>, IHouseholdRequest
{
    public string Permission => ChatPlugin.Write;
}

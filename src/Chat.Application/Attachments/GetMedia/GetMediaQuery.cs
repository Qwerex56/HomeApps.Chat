using Chat.Application.Common;
using Chat.Domain.Attachments;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Attachments.GetMedia;

/// <summary>
/// The file behind a signed link (plan 4.4). The link is the permission and is checked before; this only finds the file
/// of a checked attachment.
/// </summary>
public sealed record GetMediaQuery(Guid AttachmentId, MediaVariant Variant) : IQuery<MediaFile>;

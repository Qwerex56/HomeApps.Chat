using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Attachments.PurgeAbandonedAttachments;

/// <summary>Uploads never sent within a day go with their files (plan 2). Sent by a job; returns how many went.</summary>
public sealed record PurgeAbandonedAttachmentsCommand : ICommand<int>;

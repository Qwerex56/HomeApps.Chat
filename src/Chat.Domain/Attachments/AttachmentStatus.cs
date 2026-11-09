namespace Chat.Domain.Attachments;

/// <summary>An upload's way: checked in the background, then joined to a message (plan 4.2).</summary>
public enum AttachmentStatus
{
    /// <summary>Uploaded, being checked (ffprobe, previews).</summary>
    Pending = 0,

    /// <summary>Checked and ready to be sent.</summary>
    Ready = 1,

    /// <summary>Not accepted: see <see cref="Attachment.FailureCode"/>.</summary>
    Failed = 2,

    /// <summary>Part of a message.</summary>
    Attached = 3,
}

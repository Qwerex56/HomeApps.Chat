using System.Globalization;
using Chat.Domain.Common;
using FluentResults;

namespace Chat.Domain.Attachments;

/// <summary>
/// A photo or a video, uploaded on its own before the message is sent (progress bar, retry without losing the text),
/// checked in the background and then joined to one message (plan 4.1, 4.2). It belongs to whoever uploaded it: nobody
/// else can send it. An upload not sent within <see cref="AbandonedAfter"/> is removed by a job.
/// </summary>
public sealed class Attachment
{
    /// <summary>C2: 20 MB for photos and videos alike.</summary>
    public const long MaxBytes = 20L * 1024 * 1024;

    /// <summary>C2: a video at most 30 seconds (and at most <see cref="MaxBytes"/>, both at once).</summary>
    public static readonly TimeSpan MaxVideoLength = TimeSpan.FromSeconds(30);

    public static readonly TimeSpan AbandonedAfter = TimeSpan.FromHours(24);

    /// <summary>What the browser may announce. The content is checked again later; this only stops the obvious early.</summary>
    private static readonly Dictionary<string, MediaKind> Accepted = new(StringComparer.OrdinalIgnoreCase)
    {
        ["image/jpeg"] = MediaKind.Image,
        ["image/png"] = MediaKind.Image,
        ["image/webp"] = MediaKind.Image,
        ["image/gif"] = MediaKind.Image,
        ["video/mp4"] = MediaKind.Video,
        ["video/quicktime"] = MediaKind.Video,
        ["video/webm"] = MediaKind.Video,
    };

    private Attachment() { }

    private Attachment(Guid id, Guid householdId, Guid uploaderId, MediaKind kind, string contentType, long size, DateTimeOffset now)
    {
        Id = id;
        HouseholdId = householdId;
        UploaderId = uploaderId;
        Kind = kind;
        ContentType = contentType;
        Size = size;
        CreatedAt = now;
    }

    public Guid Id { get; private set; }

    public Guid HouseholdId { get; private set; }

    public Guid UploaderId { get; private set; }

    public MediaKind Kind { get; private set; }

    public AttachmentStatus Status { get; private set; }

    /// <summary>As announced at upload; after checking, the real type.</summary>
    public string ContentType { get; private set; } = null!;

    /// <summary>Bytes of the original.</summary>
    public long Size { get; private set; }

    public int? Width { get; private set; }

    public int? Height { get; private set; }

    public TimeSpan? Duration { get; private set; }

    /// <summary>Why it was not accepted, as an error code (<c>attachment.too_long</c>, ...).</summary>
    public string? FailureCode { get; private set; }

    public Guid? MessageId { get; private set; }

    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>A new upload, before its content is read. Guests do not send media (C3).</summary>
    public static Result<Attachment> Upload(Guid householdId, Actor actor, string? contentType, long size, TimeProvider time)
    {
        ArgumentNullException.ThrowIfNull(actor);
        ArgumentNullException.ThrowIfNull(time);
        if (householdId == Guid.Empty)
        {
            throw new ArgumentException("The household id cannot be empty.", nameof(householdId));
        }

        if (!actor.Writes)
        {
            return Result.Fail<Attachment>(ChatErrors.ReadOnly);
        }

        var type = contentType?.Split(';')[0].Trim() ?? string.Empty;
        if (!Accepted.TryGetValue(type, out var kind))
        {
            return Result.Fail<Attachment>(ChatErrors.AttachmentUnsupported);
        }

        if (size is <= 0 or > MaxBytes)
        {
            return Result.Fail<Attachment>(ChatErrors.AttachmentTooLarge);
        }

        var now = time.GetUtcNow();
        return new Attachment(Guid.CreateVersion7(now), householdId, actor.UserId, kind, type.ToLowerInvariant(), size, now);
    }

    /// <summary>
    /// The content was read. A file that is not what it claimed to be (a "photo" that is a video) or a video longer than
    /// <see cref="MaxVideoLength"/> is refused and stays <see cref="AttachmentStatus.Failed"/>, so the UI can say why.
    /// </summary>
    public Result Checked(MediaInfo info)
    {
        ArgumentNullException.ThrowIfNull(info);
        if (Status != AttachmentStatus.Pending)
        {
            return Result.Fail(ChatErrors.AttachmentNotPending);
        }

        if (info.Kind != Kind)
        {
            return Refuse(ChatErrors.AttachmentUnsupported);
        }

        if (Kind == MediaKind.Video && (info.Duration is not { } length || length > MaxVideoLength))
        {
            return Refuse(ChatErrors.AttachmentTooLong);
        }

        ContentType = info.ContentType;
        Width = info.Width;
        Height = info.Height;
        Duration = info.Duration;
        Status = AttachmentStatus.Ready;
        return Result.Ok();
    }

    /// <summary>The file could not be read at all (broken, or not a photo or video).</summary>
    public void Unreadable()
    {
        if (Status == AttachmentStatus.Pending)
        {
            Refuse(ChatErrors.AttachmentUnreadable);
        }
    }

    /// <summary>Only the uploader's own, ready attachments from the same household; someone else's looks like none.</summary>
    public Result CanAttach(Guid householdId, Actor actor)
    {
        ArgumentNullException.ThrowIfNull(actor);
        if (UploaderId != actor.UserId || HouseholdId != householdId)
        {
            return Result.Fail(ChatErrors.AttachmentNotFound);
        }

        return Status == AttachmentStatus.Ready ? Result.Ok() : Result.Fail(ChatErrors.AttachmentNotReady);
    }

    /// <summary>Joins it to a message (<see cref="Messages.Message.Send"/>).</summary>
    internal Result AttachTo(Guid messageId, Guid householdId, Actor actor)
    {
        var allowed = CanAttach(householdId, actor);
        if (allowed.IsFailed)
        {
            return allowed;
        }

        MessageId = messageId;
        Status = AttachmentStatus.Attached;
        return Result.Ok();
    }

    /// <summary>Uploaded but never sent; a job removes it with its files.</summary>
    public bool IsAbandoned(DateTimeOffset now) => Status != AttachmentStatus.Attached && now - CreatedAt >= AbandonedAfter;

    /// <summary>Where a variant is stored (<c>IMediaStore</c>), one folder per household so its size is easy to count.</summary>
    public string Key(MediaVariant variant) =>
        $"households/{HouseholdId:N}/{Id:N}/{variant.ToString().ToLowerInvariant()}";

    /// <summary>Plain words for MCP and push notifications: "zdjęcie 1600×1200", "film 12 s".</summary>
    public string Describe() => Kind switch
    {
        MediaKind.Image when Width is { } w && Height is { } h => string.Create(CultureInfo.InvariantCulture, $"zdjęcie {w}×{h}"),
        MediaKind.Image => "zdjęcie",
        _ when Duration is { } d => string.Create(CultureInfo.InvariantCulture, $"film {Math.Max(1, (int)Math.Round(d.TotalSeconds))} s"),
        _ => "film",
    };

    private Result Refuse(FluentResults.Error error)
    {
        Status = AttachmentStatus.Failed;
        FailureCode = (string)error.Metadata[HomeApps.BuildingBlocks.Domain.Errors.AppError.CodeKey];
        return Result.Fail(error);
    }
}

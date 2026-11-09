using Chat.Domain.Attachments;

namespace Chat.Application.Abstractions;

/// <summary>Loads and stores <see cref="Attachment"/>; its files are <see cref="IMediaStore"/>'s.</summary>
public interface IAttachmentRepository
{
    Task<Attachment?> GetAsync(Guid attachmentId, CancellationToken cancellationToken);

    /// <summary>The ones found, in no particular order; missing ids are simply left out.</summary>
    Task<IReadOnlyList<Attachment>> ListAsync(IReadOnlyCollection<Guid> attachmentIds, CancellationToken cancellationToken);

    Task<IReadOnlyList<Attachment>> ListPendingAsync(CancellationToken cancellationToken);

    /// <summary>Uploads never sent within <see cref="Attachment.AbandonedAfter"/>.</summary>
    Task<IReadOnlyList<Attachment>> ListAbandonedAsync(DateTimeOffset now, CancellationToken cancellationToken);

    /// <summary>Uploads of one person that are not part of a message (<c>UserErased</c>).</summary>
    Task<IReadOnlyList<Attachment>> ListUnsentOfAsync(Guid uploaderId, CancellationToken cancellationToken);

    /// <summary>The bytes a household's uploads take (C11), failed ones left out.</summary>
    Task<long> UsedBytesAsync(Guid householdId, CancellationToken cancellationToken);

    void Add(Attachment attachment);

    void Remove(Attachment attachment);
}

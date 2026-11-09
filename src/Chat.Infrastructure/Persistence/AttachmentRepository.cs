using Chat.Application.Abstractions;
using Chat.Domain.Attachments;
using Microsoft.EntityFrameworkCore;

namespace Chat.Infrastructure.Persistence;

internal sealed class AttachmentRepository(ChatDbContext db) : IAttachmentRepository
{
    public Task<Attachment?> GetAsync(Guid attachmentId, CancellationToken cancellationToken) =>
        db.Attachments.FirstOrDefaultAsync(a => a.Id == attachmentId, cancellationToken);

    public async Task<IReadOnlyList<Attachment>> ListAsync(IReadOnlyCollection<Guid> attachmentIds, CancellationToken cancellationToken) =>
        attachmentIds.Count == 0 ? [] : await db.Attachments.Where(a => attachmentIds.Contains(a.Id)).ToListAsync(cancellationToken);

    public async Task<IReadOnlyList<Attachment>> ListPendingAsync(CancellationToken cancellationToken) =>
        await db.Attachments.Where(a => a.Status == AttachmentStatus.Pending).OrderBy(a => a.CreatedAt).ToListAsync(cancellationToken);

    public async Task<IReadOnlyList<Attachment>> ListAbandonedAsync(DateTimeOffset now, CancellationToken cancellationToken)
    {
        var before = now - Attachment.AbandonedAfter;
        return await db.Attachments
            .Where(a => a.Status != AttachmentStatus.Attached && a.CreatedAt <= before)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Attachment>> ListUnsentOfAsync(Guid uploaderId, CancellationToken cancellationToken) =>
        await db.Attachments.Where(a => a.UploaderId == uploaderId && a.Status != AttachmentStatus.Attached).ToListAsync(cancellationToken);

    public Task<long> UsedBytesAsync(Guid householdId, CancellationToken cancellationToken) =>
        db.Attachments
            .Where(a => a.HouseholdId == householdId && a.Status != AttachmentStatus.Failed)
            .SumAsync(a => a.Size, cancellationToken);

    public void Add(Attachment attachment) => db.Attachments.Add(attachment);

    public void Remove(Attachment attachment) => db.Attachments.Remove(attachment);
}

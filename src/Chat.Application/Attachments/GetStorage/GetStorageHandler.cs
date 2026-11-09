using Chat.Application.Abstractions;
using Chat.Application.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Attachments.GetStorage;

internal sealed class GetStorageHandler(IAttachmentRepository attachments, ChatLimits limits) : IQueryHandler<GetStorageQuery, StorageView>
{
    public async Task<Result<StorageView>> Handle(GetStorageQuery query, CancellationToken cancellationToken) =>
        new StorageView(await attachments.UsedBytesAsync(query.HouseholdId, cancellationToken), limits.StorageBytesPerHousehold);
}

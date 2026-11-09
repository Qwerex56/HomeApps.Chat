using Chat.Api.Http;
using Chat.Application.Attachments.GetAttachment;
using Chat.Application.Attachments.GetStorage;
using Chat.Application.Attachments.UploadAttachment;
using Chat.Application.Common;
using Chat.Domain.Attachments;
using HomeApps.BuildingBlocks.Api.Endpoints;
using HomeApps.BuildingBlocks.Api.Results;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Chat.Api.Endpoints;

/// <summary>Uploads before a message (plan 4.2) and the household's space (C11).</summary>
internal sealed class AttachmentEndpoints : IEndpoint
{
    /// <summary>20 MB of file plus the multipart envelope; only this route accepts a body this big.</summary>
    public const long MaxBody = Attachment.MaxBytes + (1024 * 1024);

    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        var household = app.MapGroup("/households/{householdId:guid}").WithTags("Attachments");

        household.MapPost("/attachments", async (Guid householdId, IFormFile file, ISender sender, CancellationToken ct) =>
            {
                await using var content = file.OpenReadStream();
                var uploaded = await sender.Send(new UploadAttachmentCommand(householdId, file.ContentType, file.Length, content), ct);
                return uploaded.IsSuccess
                    ? Results.Accepted($"/plugins/chat/api/households/{householdId}/attachments/{uploaded.Value.Id}", uploaded.Value)
                    : uploaded.ToHttpResult();
            })
            .DisableAntiforgery()
            .WithMetadata(new RequestSizeLimitAttribute(MaxBody), new RequestFormLimitsAttribute { MultipartBodyLengthLimit = MaxBody })
            .RequireRateLimiting(RateLimits.Uploads)
            .Produces<AttachmentView>(StatusCodes.Status202Accepted);

        household.MapGet("/attachments/{attachmentId:guid}", async (Guid householdId, Guid attachmentId, ISender sender, CancellationToken ct) =>
            (await sender.Send(new GetAttachmentQuery(householdId, attachmentId), ct)).ToHttpResult())
            .Produces<AttachmentView>();

        household.MapGet("/storage", async (Guid householdId, ISender sender, CancellationToken ct) =>
            (await sender.Send(new GetStorageQuery(householdId), ct)).ToHttpResult())
            .Produces<StorageView>();
    }
}

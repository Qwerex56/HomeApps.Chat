using Chat.Application.Abstractions;
using Chat.Application.Attachments.GetMedia;
using Chat.Domain.Attachments;
using MediatR;
using Microsoft.Net.Http.Headers;

namespace Chat.Api.Endpoints;

/// <summary>
/// <c>/plugins/chat/media/{id}/{variant}?exp=&amp;sig=</c>, outside <c>/api</c> (plan 4.4): anonymous, since
/// <c>&lt;img&gt;</c> and <c>&lt;video&gt;</c> send no token; the signed link is the permission. Supports <c>Range</c>,
/// so videos can be scrubbed, and is cached privately for as long as a link lives.
/// </summary>
internal static class MediaEndpoint
{
    public static void MapMedia(this IEndpointRouteBuilder app)
    {
        app.MapGet("/media/{attachmentId:guid}/{variant}", async (Guid attachmentId, string variant, long? exp, string? sig,
                IMediaLinks links, IMediaStore store, ISender sender, HttpContext http, CancellationToken ct) =>
            {
                if (!Enum.TryParse<MediaVariant>(variant, ignoreCase: true, out var parsed)
                    || !Enum.IsDefined(parsed)
                    || exp is not { } expires
                    || !links.IsValid(attachmentId, parsed, expires, sig))
                {
                    return Results.NotFound();
                }

                var file = await sender.Send(new GetMediaQuery(attachmentId, parsed), ct);
                var content = file.IsSuccess ? store.OpenRead(file.Value.Key) : null;
                if (content is null)
                {
                    return Results.NotFound();
                }

                http.Response.Headers[HeaderNames.CacheControl] = "private, max-age=3600";
                return Results.Stream(content, file.Value.ContentType, enableRangeProcessing: true);
            })
            .AllowAnonymous()
            .ExcludeFromDescription();
    }
}

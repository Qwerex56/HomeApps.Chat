using System.Globalization;
using System.Threading.RateLimiting;
using HomeApps.BuildingBlocks.Api.Auth;
using HomeApps.BuildingBlocks.Api.Results;
using Microsoft.Extensions.Options;

namespace Chat.Api.Http;

/// <summary>Plan 6: per signed-in user, 30 messages a minute and 20 uploads in 10 minutes; <c>429 rate_limited</c> like Households.</summary>
internal static class RateLimits
{
    public const string Messages = "chat-messages";
    public const string Uploads = "chat-uploads";

    public static IServiceCollection AddChatRateLimits(this IServiceCollection services)
    {
        services.AddOptions<RateLimitOptions>().BindConfiguration(RateLimitOptions.SectionName);

        services.AddRateLimiter(limiter =>
        {
            limiter.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
            limiter.OnRejected = async (context, cancellationToken) =>
            {
                var http = context.HttpContext;
                http.Response.Headers.RetryAfter = context.Lease.TryGetMetadata(MetadataName.RetryAfter, out var retryAfter)
                    ? ((int)Math.Ceiling(retryAfter.TotalSeconds)).ToString(CultureInfo.InvariantCulture)
                    : "60";
                await http.RequestServices.GetRequiredService<IProblemDetailsService>().WriteAsync(new ProblemDetailsContext
                {
                    HttpContext = http,
                    ProblemDetails =
                    {
                        Status = StatusCodes.Status429TooManyRequests,
                        Title = "Too many requests",
                        Detail = "Too many requests in a short time. Wait a moment and try again.",
                        Extensions = { [ResultHttpMapper.CodeExtension] = "rate_limited" },
                    },
                });
            };

            limiter.AddPolicy(Messages, http =>
            {
                var limits = http.RequestServices.GetRequiredService<IOptions<RateLimitOptions>>().Value;
                return SlidingWindow(http, Messages, limits.Messages, limits.MessagesWindow);
            });

            limiter.AddPolicy(Uploads, http =>
            {
                var limits = http.RequestServices.GetRequiredService<IOptions<RateLimitOptions>>().Value;
                return SlidingWindow(http, Uploads, limits.Uploads, limits.UploadsWindow);
            });
        });

        return services;
    }

    private static RateLimitPartition<string> SlidingWindow(HttpContext http, string policy, int permits, TimeSpan window) =>
        RateLimitPartition.GetSlidingWindowLimiter($"{policy}:{Caller(http)}", _ => new SlidingWindowRateLimiterOptions
        {
            PermitLimit = permits,
            Window = window,
            SegmentsPerWindow = 10,
            QueueLimit = 0,
        });

    /// <summary>The signed-in user; the limiter runs after authorization, so <c>sub</c> is known.</summary>
    private static string Caller(HttpContext http) =>
        http.User.FindFirst(ClaimNames.Subject)?.Value ?? http.Connection.RemoteIpAddress?.ToString() ?? "unknown";
}

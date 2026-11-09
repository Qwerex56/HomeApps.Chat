namespace Chat.Api.Http;

/// <summary>Section <c>Chat:RateLimits</c> (plan 6). In memory: one instance, a restart starts from zero.</summary>
internal sealed class RateLimitOptions
{
    public const string SectionName = "Chat:RateLimits";

    public int Messages { get; set; } = 30;

    public TimeSpan MessagesWindow { get; set; } = TimeSpan.FromMinutes(1);

    public int Uploads { get; set; } = 20;

    public TimeSpan UploadsWindow { get; set; } = TimeSpan.FromMinutes(10);
}

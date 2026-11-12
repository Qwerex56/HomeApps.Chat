using System.Collections.Concurrent;
using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using HomeApps.Contracts.Households;

namespace Chat.Api.Tests;

/// <summary>
/// Stands in for Households: <c>members/me</c> and <c>members/names</c> for anyone with access, <c>members</c> for
/// Member and up (a guest gets 403, D2a), and <c>GET /households</c> for the MCP tools. Reads the caller from the test token.
/// </summary>
public sealed class FakeHouseholds : HttpMessageHandler
{
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web) { Converters = { new JsonStringEnumConverter() } };
    private readonly ConcurrentDictionary<(Guid HouseholdId, Guid UserId), (HouseholdRole Role, DateTimeOffset JoinedAt, string Name)> _members = new();

    /// <summary>Names for <c>GET /households</c>.</summary>
    public ConcurrentDictionary<Guid, string> HouseholdNames { get; } = new();

    public void Set(Guid householdId, Guid userId, HouseholdRole? role, DateTimeOffset? joinedAt = null, string? name = null)
    {
        if (role is { } value)
        {
            _members[(householdId, userId)] = (value, joinedAt ?? DateTimeOffset.UtcNow.AddYears(-1), name ?? $"Osoba {userId.ToString()[..4]}");
        }
        else
        {
            _members.TryRemove((householdId, userId), out _);
        }
    }

    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        var segments = request.RequestUri!.AbsolutePath.Trim('/').Split('/');
        var caller = SubjectOf(request.Headers.Authorization?.ToString());
        if (segments.Length == 1)
        {
            return Answer(HttpStatusCode.OK, _members.Keys.Where(k => k.UserId == caller)
                .Select(k => new { Id = k.HouseholdId, Name = HouseholdNames.GetValueOrDefault(k.HouseholdId, "?") }).ToList());
        }

        var householdId = Guid.Parse(segments[1]);
        if (!_members.TryGetValue((householdId, caller), out var me))
        {
            return Answer(HttpStatusCode.NotFound);
        }

        if (segments.Length == 4 && segments[3] == "me")
        {
            return Answer(HttpStatusCode.OK, new { householdId, me.Role, me.JoinedAt, AccessUntil = (DateTimeOffset?)null });
        }

        if (segments.Length == 4 && segments[3] == "names")
        {
            return Answer(HttpStatusCode.OK, _members.Where(m => m.Key.HouseholdId == householdId)
                .Select(m => new { m.Key.UserId, m.Value.Name, AvatarUrl = (string?)null }).ToList());
        }

        if (me.Role < HouseholdRole.Member)
        {
            return Answer(HttpStatusCode.Forbidden);
        }

        var members = _members
            .Where(m => m.Key.HouseholdId == householdId)
            .Select(m => new { m.Key.UserId, m.Value.Name, m.Value.Role, m.Value.JoinedAt })
            .ToList();
        return Answer(HttpStatusCode.OK, members);
    }

    private static Task<HttpResponseMessage> Answer(HttpStatusCode status, object? body = null) =>
        Task.FromResult(new HttpResponseMessage(status) { Content = body is null ? null : JsonContent.Create(body, options: Json) });

    /// <summary>The <c>sub</c> of a test token, read without validating it (Households would validate it).</summary>
    private static Guid SubjectOf(string? authorization)
    {
        var payload = authorization!["Bearer ".Length..].Split('.')[1];
        var padded = payload.Replace('-', '+').Replace('_', '/').PadRight(payload.Length + ((4 - (payload.Length % 4)) % 4), '=');
        using var json = JsonDocument.Parse(Convert.FromBase64String(padded));
        return Guid.Parse(json.RootElement.GetProperty("sub").GetString()!);
    }
}

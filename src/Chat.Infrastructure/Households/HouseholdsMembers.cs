using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using Chat.Application;
using Chat.Application.Abstractions;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;

namespace Chat.Infrastructure.Households;

/// <summary>
/// <see cref="IHouseholdMembers"/> through <c>GET /households/{id}/members</c>, sent with the caller's own token (the
/// Authorization header, or <c>?access_token=</c> on the hub), so Households applies its own rules. Anything but 200
/// throws: the plugin refuses rather than guesses.
/// </summary>
internal sealed class HouseholdsMembers(HttpClient http, IHttpContextAccessor accessor) : IHouseholdMembers
{
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web) { Converters = { new JsonStringEnumConverter() } };

    public async Task<IReadOnlyList<HouseholdMember>> ListAsync(Guid householdId, CancellationToken cancellationToken)
    {
        using var request = new HttpRequestMessage(HttpMethod.Get, $"households/{householdId}/members");
        request.Headers.TryAddWithoutValidation(HeaderNames.Authorization, Authorization()
            ?? throw new InvalidOperationException("Listing members needs the caller's access token; there is no HTTP request with one."));

        using var response = await http.SendAsync(request, cancellationToken);
        if (response.StatusCode != HttpStatusCode.OK)
        {
            throw new HttpRequestException(
                $"Households answered {(int)response.StatusCode} when asked for the members of {householdId}.", null, response.StatusCode);
        }

        return await response.Content.ReadFromJsonAsync<List<HouseholdMember>>(Json, cancellationToken) ?? [];
    }

    private string? Authorization()
    {
        if (accessor.HttpContext?.Request is not { } request)
        {
            return null;
        }

        var header = request.Headers[HeaderNames.Authorization].ToString();
        if (!string.IsNullOrEmpty(header))
        {
            return header;
        }

        var token = request.Path.StartsWithSegments($"/{ChatPlugin.Hub}") ? request.Query["access_token"].ToString() : null;
        return string.IsNullOrEmpty(token) ? null : $"Bearer {token}";
    }
}

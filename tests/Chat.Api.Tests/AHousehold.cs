using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using Chat.Application.Common;
using Chat.Domain.Attachments;
using HomeApps.Contracts.Households;

namespace Chat.Api.Tests;

/// <summary>One household with an Owner, an Admin, two Members and a Guest who joined just now, and calls as any of them.</summary>
internal sealed class AHousehold(ChatFactory factory)
{
    public static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web) { Converters = { new JsonStringEnumConverter() } };

    public Guid Id { get; } = Guid.NewGuid();

    public Guid Owner { get; } = Guid.NewGuid();

    public Guid Admin { get; } = Guid.NewGuid();

    public Guid Member { get; } = Guid.NewGuid();

    public Guid Other { get; } = Guid.NewGuid();

    public Guid Guest { get; } = Guid.NewGuid();

    public string Api => $"/plugins/chat/api/households/{Id}";

    public static async Task<AHousehold> SwitchedOnAsync(ChatFactory factory)
    {
        var h = new AHousehold(factory);
        factory.Households.Set(h.Id, h.Owner, HouseholdRole.Owner, name: "Ola");
        factory.Households.Set(h.Id, h.Admin, HouseholdRole.Admin, name: "Adam");
        factory.Households.Set(h.Id, h.Member, HouseholdRole.Member, name: "Ania");
        factory.Households.Set(h.Id, h.Other, HouseholdRole.Member, name: "Tomek");
        factory.Households.Set(h.Id, h.Guest, HouseholdRole.Guest, factory.Time.GetUtcNow(), "Gość");
        (await h.As(h.Owner).PutAsJsonAsync($"{h.Api}/enablement", new { enabled = true })).EnsureSuccessStatusCode();
        return h;
    }

    public HttpClient As(Guid userId) => factory.CreateAuthenticatedClient(userId);

    public async Task<List<ConversationView>> ConversationsAsync(Guid userId) =>
        (await As(userId).GetFromJsonAsync<List<ConversationView>>($"{Api}/conversations", Json))!;

    public async Task<Guid> HomeAsync() => (await ConversationsAsync(Owner)).Single(c => c.Name == "Dom").Id;

    public async Task<MessageView> SendAsync(Guid userId, Guid conversationId, string? text, Guid[]? attachments = null, Guid? replyTo = null)
    {
        var response = await PostMessageAsync(userId, conversationId, text, attachments, replyTo);
        response.EnsureSuccessStatusCode();
        return (await response.Content.ReadFromJsonAsync<MessageView>(Json))!;
    }

    public Task<HttpResponseMessage> PostMessageAsync(
        Guid userId, Guid conversationId, string? text, Guid[]? attachments = null, Guid? replyTo = null, Guid? clientMessageId = null)
    {
        factory.Time.Advance(TimeSpan.FromSeconds(1));
        return As(userId).PostAsJsonAsync($"{Api}/conversations/{conversationId}/messages",
            new { clientMessageId = clientMessageId ?? Guid.NewGuid(), text, attachmentIds = attachments ?? [], replyToId = replyTo });
    }

    public async Task<List<MessageView>> MessagesAsync(Guid userId, Guid conversationId, string query = "") =>
        (await As(userId).GetFromJsonAsync<List<MessageView>>($"{Api}/conversations/{conversationId}/messages{query}", Json))!;

    public async Task<Guid> CreateRoomAsync(Guid userId, string name, params Guid[] participants)
    {
        var response = await As(userId).PostAsJsonAsync($"{Api}/rooms", new { name, participantIds = participants });
        response.EnsureSuccessStatusCode();
        return (await response.Content.ReadFromJsonAsync<JsonElement>()).GetProperty("id").GetGuid();
    }

    public Task<HttpResponseMessage> UploadAsync(Guid userId, byte[] content, string contentType, string fileName)
    {
        var form = new MultipartFormDataContent();
        var file = new ByteArrayContent(content);
        file.Headers.ContentType = new MediaTypeHeaderValue(contentType);
        form.Add(file, "file", fileName);
        return As(userId).PostAsync($"{Api}/attachments", form);
    }

    /// <summary>Uploads and waits for the background check to finish.</summary>
    public async Task<AttachmentView> UploadCheckedAsync(Guid userId, byte[] content, string contentType, string fileName)
    {
        var response = await UploadAsync(userId, content, contentType, fileName);
        response.EnsureSuccessStatusCode();
        var view = (await response.Content.ReadFromJsonAsync<AttachmentView>(Json))!;
        for (var attempt = 0; view.Status == AttachmentStatus.Pending && attempt < 300; attempt++)
        {
            await Task.Delay(100);
            view = (await As(userId).GetFromJsonAsync<AttachmentView>($"{Api}/attachments/{view.Id}", Json))!;
        }

        return view;
    }

    public static async Task<string?> CodeOf(HttpResponseMessage response)
    {
        var json = await response.Content.ReadFromJsonAsync<JsonElement>();
        return json.TryGetProperty("code", out var code) ? code.GetString() : json.ToString();
    }
}

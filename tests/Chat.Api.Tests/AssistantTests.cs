using System.Net;
using System.Net.Http.Json;
using Chat.Application.Settings;
using Chat.Domain.Messages;
using HomeApps.Contracts.Assistant;

namespace Chat.Api.Tests;

/// <summary>JARVIS in the household's chat (jarvis-v1.md 5): who wakes him, his answer and card, and who decides.</summary>
public sealed class AssistantTests(ChatFactory factory) : IClassFixture<ChatFactory>
{
    [Fact]
    public async Task He_listens_only_after_an_Admin_turns_him_on()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        var home = await h.HomeAsync();
        await h.SendAsync(h.Member, home, "@Jarvis dodaj mleko");

        var byMember = await h.As(h.Member).PutAsJsonAsync($"{h.Api}/settings", new { assistant = true });
        var byAdmin = await h.As(h.Admin).PutAsJsonAsync($"{h.Api}/settings", new { assistant = true });
        var seen = await h.As(h.Guest).GetFromJsonAsync<SettingsView>($"{h.Api}/settings", AHousehold.Json);

        Assert.DoesNotContain(Invocations(home), _ => true);
        Assert.Equal(HttpStatusCode.Forbidden, byMember.StatusCode);
        Assert.Equal(HttpStatusCode.OK, byAdmin.StatusCode);
        Assert.True(seen!.Assistant);
    }

    [Fact]
    public async Task A_mention_asks_him_with_the_last_messages_as_context_and_a_plain_message_does_not()
    {
        var h = await OnAsync();
        var home = await h.HomeAsync();
        await h.SendAsync(h.Other, home, "Kończy się **mleko**");
        await h.SendAsync(h.Member, home, "piszę o jarvis@dom.pl i `@Jarvis` w kodzie");

        var asked = await h.SendAsync(h.Member, home, "@jarvis dodaj mleko na jutro");

        var invoked = Assert.Single(Invocations(home));
        Assert.Equal(($"{home}/{asked.Id}", h.Member, h.Id, "@jarvis dodaj mleko na jutro"),
            (invoked.Reference, invoked.UserId, invoked.HouseholdId, invoked.Text));
        Assert.Equal("Kończy się mleko", invoked.Context[0].Text);
    }

    [Fact]
    public async Task His_answer_replies_to_the_question_with_a_card_and_a_reply_to_him_asks_again()
    {
        var h = await OnAsync();
        var home = await h.HomeAsync();
        var asked = await h.SendAsync(h.Member, home, "@Jarvis dodaj mleko");
        var invocation = Assert.Single(Invocations(home)).InvocationId;

        await AnswerAsync(invocation, $"{home}/{asked.Id}", "Dodałem »Mleko«.", new AssistantAction("Dodano zadanie Mleko", "Done", null, null, null));
        await AnswerAsync(invocation, $"{home}/{asked.Id}", "Dodałem »Mleko«.", new AssistantAction("Dodano zadanie Mleko", "Done", null, null, null));
        var answer = (await h.MessagesAsync(h.Other, home)).Single(m => m.AuthorKind == AuthorKind.Assistant);
        await h.SendAsync(h.Other, home, "A chleb?", replyTo: answer.Id);

        Assert.Equal(("Dodałem »Mleko«.", asked.Id, Guid.Empty), (answer.Text, answer.ReplyTo!.Id, answer.AuthorId));
        Assert.Equal("Done", Assert.Single(answer.Actions).Status);
        Assert.Equal(2, Invocations(home).Count());
    }

    [Fact]
    public async Task Only_the_person_who_asked_confirms_and_his_new_card_line_replaces_the_old()
    {
        var h = await OnAsync();
        var home = await h.HomeAsync();
        var asked = await h.SendAsync(h.Member, home, "@Jarvis usuń listę Zakupy");
        var reference = $"{home}/{asked.Id}";
        var confirmation = Guid.NewGuid();
        await AnswerAsync(Assist(home).InvocationId, reference, "Czeka na potwierdzenie.",
            new AssistantAction("todo_delete_list {\"name\":\"Zakupy\"}", "NeedsConfirmation", null, confirmation, factory.Time.GetUtcNow().AddMinutes(10)));
        var card = (await h.MessagesAsync(h.Member, home)).Single(m => m.AuthorKind == AuthorKind.Assistant);

        var byOther = await h.As(h.Other).PostAsJsonAsync($"{h.Api}/messages/{card.Id}/actions/{confirmation}", new { approve = true });
        var byAsker = await h.As(h.Member).PostAsJsonAsync($"{h.Api}/messages/{card.Id}/actions/{confirmation}", new { approve = true });
        await AnswerAsync(confirmation, reference, "Usunięto listę Zakupy", new AssistantAction("Usunięto listę Zakupy", "Done", null, confirmation, null));

        Assert.Equal("assistant.not_asker", await AHousehold.CodeOf(byOther));
        Assert.Equal(HttpStatusCode.Accepted, byAsker.StatusCode);
        var decided = factory.Published.OfType<AssistantConfirmed>().Single(c => c.ConfirmationId == confirmation);
        Assert.Equal((h.Member, true, "chat", reference), (decided.UserId, decided.Approved, decided.Channel, decided.Reference));
        var updated = (await h.MessagesAsync(h.Member, home)).Single(m => m.AuthorKind == AuthorKind.Assistant);
        Assert.Equal(("Done", "Usunięto listę Zakupy"), (updated.Actions[0].Status, updated.Actions[0].Description));
    }

    [Fact]
    public async Task Never_in_a_direct_conversation()
    {
        var h = await OnAsync();
        var direct = await h.As(h.Member).PostAsJsonAsync($"{h.Api}/conversations/direct", new { userId = h.Other });
        var id = (await direct.Content.ReadFromJsonAsync<IdResponse>())!.Id;

        await h.SendAsync(h.Member, id, "@Jarvis hej");

        Assert.Empty(Invocations(id));
    }

    private async Task<AHousehold> OnAsync()
    {
        var h = await AHousehold.SwitchedOnAsync(factory);
        (await h.As(h.Admin).PutAsJsonAsync($"{h.Api}/settings", new { assistant = true })).EnsureSuccessStatusCode();
        return h;
    }

    private IEnumerable<AssistantInvoked> Invocations(Guid conversationId) =>
        factory.Published.OfType<AssistantInvoked>().Where(i => i.Reference.StartsWith($"{conversationId}/", StringComparison.Ordinal));

    private AssistantInvoked Assist(Guid conversationId) => Assert.Single(Invocations(conversationId));

    private async Task AnswerAsync(Guid invocationId, string reference, string text, params AssistantAction[] actions)
    {
        var before = factory.Harness.Consumed.Select<AssistantResponded>().Count();
        await factory.Harness.Bus.Publish(new AssistantResponded(invocationId, "chat", reference, text, actions));
        for (var i = 0; i < 100 && factory.Harness.Consumed.Select<AssistantResponded>().Count() == before; i++)
        {
            await Task.Delay(50);
        }

        var consumed = factory.Harness.Consumed.Select<AssistantResponded>().Last();
        Assert.Null(consumed.Exception);
    }

    private sealed record IdResponse(Guid Id);
}

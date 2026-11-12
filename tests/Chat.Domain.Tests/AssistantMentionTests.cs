using Chat.Domain.Assistant;

namespace Chat.Domain.Tests;

public sealed class AssistantMentionTests
{
    [Theory]
    [InlineData("@Jarvis dodaj mleko", true)]
    [InlineData("hej @jarvis, co jutro?", true)]
    [InlineData("(@JARVIS)", true)]
    [InlineData("Jarvis dodaj mleko", false)]
    [InlineData("mail jarvis@dom.pl", false)]
    [InlineData("@Jarvisek", false)]
    [InlineData("`@Jarvis` w kodzie", false)]
    [InlineData("```\n@Jarvis\n```", false)]
    [InlineData("> @Jarvis dodaj\nto był cytat", false)]
    [InlineData("> cytat\n@Jarvis a teraz ja", true)]
    [InlineData(null, false)]
    public void Finds_him_only_as_a_word_outside_code_and_quotes(string? text, bool mentioned) =>
        Assert.Equal(mentioned, AssistantMention.In(text));
}

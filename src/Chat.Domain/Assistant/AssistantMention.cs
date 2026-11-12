using System.Text.RegularExpressions;

namespace Chat.Domain.Assistant;

/// <summary>
/// <c>@Jarvis</c> in a message (jarvis-v1.md 5.1): as a word of its own, any case, not inside code or a quote, so
/// writing about him in a code block or quoting his name does not wake him.
/// </summary>
public static partial class AssistantMention
{
    public const string Name = "Jarvis";

    public static bool In(string? markdown)
    {
        if (string.IsNullOrWhiteSpace(markdown))
        {
            return false;
        }

        var text = InlineCode().Replace(CodeBlocks().Replace(markdown, " "), " ");
        var outsideQuotes = string.Join('\n', text.Split('\n').Where(line => !line.TrimStart().StartsWith('>')));
        return Mention().IsMatch(outsideQuotes);
    }

    [GeneratedRegex(@"```.*?(```|$)", RegexOptions.Singleline)]
    private static partial Regex CodeBlocks();

    [GeneratedRegex(@"`[^`\n]*`")]
    private static partial Regex InlineCode();

    [GeneratedRegex(@"(?<![\p{L}\p{N}_@])@jarvis(?![\p{L}\p{N}_])", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant)]
    private static partial Regex Mention();
}

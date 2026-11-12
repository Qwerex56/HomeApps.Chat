using System.Text.RegularExpressions;

namespace Chat.Application.Common;

/// <summary>
/// A message's Markdown as one plain line, for where marks make no sense (9a): push notifications and MCP answers,
/// which JARVIS may read aloud. <c>null</c> when nothing is left.
/// </summary>
public static partial class PlainText
{
    public static string? Of(string? markdown)
    {
        if (markdown is null)
        {
            return null;
        }

        var plain = Whitespace().Replace(MarkdownMarks().Replace(markdown, string.Empty), " ").Trim();
        return plain.Length == 0 ? null : plain;
    }

    [GeneratedRegex(@"[*_~`>#]+")]
    private static partial Regex MarkdownMarks();

    [GeneratedRegex(@"\s+")]
    private static partial Regex Whitespace();
}

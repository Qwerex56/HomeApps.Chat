using Chat.Application.Assistant.AskAssistant;
using System.Globalization;
using System.Text;
using Chat.Application.Common;
using Chat.Domain.Messages;

namespace Chat.Api.Mcp;

/// <summary>Messages as plain lines a model can repeat or read aloud: who, when (server's local time), what.</summary>
internal static class MessageLines
{
    public const string FormerMember = "former member";

    public static string Of(MessageView message, IReadOnlyDictionary<Guid, string> names, TimeZoneInfo zone)
    {
        var at = TimeZoneInfo.ConvertTime(message.SentAt, zone);
        var line = new StringBuilder(string.Create(CultureInfo.InvariantCulture,
            $"- {(message.AuthorKind == AuthorKind.Assistant ? AssistantCaller.AssistantName : names.GetValueOrDefault(message.AuthorId, FormerMember))}, {at:yyyy-MM-dd HH:mm}"));
        if (message.SentVia == SentVia.Mcp)
        {
            line.Append(" (via JARVIS)");
        }

        line.Append(": ");
        if (message.Deleted)
        {
            return line.Append("(message deleted)").ToString();
        }

        line.Append(PlainText.Of(message.Text) ?? string.Empty);
        if (message.Attachments.Count > 0)
        {
            line.Append(CultureInfo.InvariantCulture, $" [{string.Join(", ", message.Attachments.Select(a => a.Description))}]");
        }

        return line.ToString().TrimEnd();
    }
}

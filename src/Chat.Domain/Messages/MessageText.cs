using Chat.Domain.Common;
using FluentResults;

namespace Chat.Domain.Messages;

/// <summary>
/// A message's text: Markdown as typed (9a), at most 4000 characters, trimmed, no control characters except new lines
/// and tabs. Stored raw; only the UI renders it.
/// </summary>
public sealed record MessageText
{
    public const int MaxLength = 4000;

    private MessageText(string value) => Value = value;

    public string Value { get; }

    /// <summary><c>null</c> for a blank text (a message of attachments only).</summary>
    public static Result<MessageText?> Create(string? raw)
    {
        var value = Text.OrNull(raw);
        if (value is null)
        {
            return Result.Ok<MessageText?>(null);
        }

        if (value.Length > MaxLength || Text.HasControlCharacters(value, multiline: true))
        {
            return Result.Fail<MessageText?>(ChatErrors.MessageTextInvalid);
        }

        return new MessageText(value);
    }

    public override string ToString() => Value;
}

using System.Globalization;

namespace Chat.Domain.Messages;

/// <summary>A reaction is one emoji from the system keyboard: one text element, no letters, digits or spaces.</summary>
internal static class Emoji
{
    public const int MaxLength = 32;

    public static bool IsValid(string? value) =>
        !string.IsNullOrEmpty(value)
        && value.Length <= MaxLength
        && new StringInfo(value).LengthInTextElements == 1
        && !value.Any(c => char.IsLetterOrDigit(c) || char.IsWhiteSpace(c) || char.IsControl(c) || char.IsPunctuation(c));
}

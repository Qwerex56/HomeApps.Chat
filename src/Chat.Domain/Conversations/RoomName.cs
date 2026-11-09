using Chat.Domain.Common;
using FluentResults;

namespace Chat.Domain.Conversations;

/// <summary>A room's name: 1–60 characters, trimmed, no control characters.</summary>
public sealed record RoomName
{
    public const int MaxLength = 60;

    private RoomName(string value) => Value = value;

    public string Value { get; }

    public static Result<RoomName> Create(string? raw)
    {
        var value = raw?.Trim() ?? string.Empty;
        if (value.Length is 0 or > MaxLength || Text.HasControlCharacters(value))
        {
            return Result.Fail<RoomName>(ChatErrors.RoomNameInvalid);
        }

        return new RoomName(value);
    }

    public override string ToString() => Value;
}

using Chat.Domain.Conversations;
using Chat.Domain.Messages;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Chat.Infrastructure.Persistence.Configurations;

/// <summary>Value objects stored as one column. Reading back goes through the domain factory, so bad data fails loudly.</summary>
internal static class Converters
{
    /// <summary>For nullable columns; EF never passes null to a converter, it stores null as is.</summary>
    public static readonly ValueConverter<RoomName?, string> RoomName = new(n => n!.Value, v => Domain.Conversations.RoomName.Create(v).Value!);

    public static readonly ValueConverter<MessageText?, string> MessageText = new(t => t!.Value, v => Domain.Messages.MessageText.Create(v).Value!);

    /// <summary>Enums are stored as their names: readable in the database and safe if members are reordered.</summary>
    public const int EnumLength = 16;
}

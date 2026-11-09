namespace Chat.Application.Abstractions;

/// <summary>Which messages: the newest (<c>null</c> cursors), older than <see cref="Before"/> or newer than <see cref="After"/>.</summary>
public sealed record MessagePage(Guid? Before, Guid? After, int Limit);

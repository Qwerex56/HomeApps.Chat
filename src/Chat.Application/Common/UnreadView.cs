namespace Chat.Application.Common;

/// <summary>For the menu badge and the widget: unread messages and in how many conversations.</summary>
public sealed record UnreadView(int Messages, int Conversations);

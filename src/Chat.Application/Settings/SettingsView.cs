namespace Chat.Application.Settings;

/// <param name="Assistant">"JARVIS w czacie": <c>@Jarvis</c> and replies to him wake JARVIS in this household's chats.</param>
public sealed record SettingsView(bool Assistant);

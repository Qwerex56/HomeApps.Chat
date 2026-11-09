using HomeApps.Contracts.Accounts;
using HomeApps.Contracts.Households;
using HomeApps.Plugins.Manifest;

namespace Chat.Application;

/// <summary>
/// The chat plugin's manifest (plan section 3, docs/plugins.md in HomeApps). The UI is src/Chat.Web, built into
/// Chat.Api/wwwroot/ui; MCP comes after 1.0 (C5).
/// </summary>
public static class ChatPlugin
{
    /// <summary>Read the household's conversation and one's own rooms and direct conversations (a guest: from joining).</summary>
    public const string Read = "chat.read";

    /// <summary>Write, react, send photos and videos.</summary>
    public const string Write = "chat.write";

    /// <summary>Direct conversations with other members.</summary>
    public const string Direct = "chat.direct";

    /// <summary>Create rooms and add people to them.</summary>
    public const string Rooms = "chat.rooms";

    /// <summary>Delete other people's messages in the household's conversation.</summary>
    public const string Moderate = "chat.moderate";

    /// <summary>The one kind of notification: a new message.</summary>
    public const string MessageNotification = "message";

    /// <summary>Where the realtime hub lives, under <c>/plugins/chat</c>.</summary>
    public const string Hub = "hub";

    /// <summary>The widget on the household's page: the last messages of "Dom" and the unread count.</summary>
    public const string Widget = "chat";

    public static PluginManifest Manifest { get; } = new()
    {
        Id = "chat",
        Version = typeof(ChatPlugin).Assembly.GetName().Version is { } v ? $"{v.Major}.{v.Minor}.{v.Build}" : "1.0.0",
        MinHomeAppsVersion = "2.2.0",
        Name = new LocalizedText("Czat", "Chat"),
        Description = new LocalizedText("Rozmowy domowników: tekst, zdjęcia i filmy", "Household conversations: text, photos and videos"),
        Icon = "pi-comments",
        Scopes = [DataScope.HouseholdUser],
        Enablement = new PluginEnablementRule(HouseholdRole.Admin),
        Permissions =
        [
            new PluginPermission(Read, HouseholdRole.Guest, new LocalizedText("Czytanie rozmów", "Read conversations")),
            new PluginPermission(Write, HouseholdRole.Member, new LocalizedText("Pisanie, reakcje, zdjęcia i filmy", "Write, react, send photos and videos")),
            new PluginPermission(Direct, HouseholdRole.Member, new LocalizedText("Rozmowy prywatne", "Direct conversations")),
            new PluginPermission(Rooms, HouseholdRole.Member, new LocalizedText("Zakładanie pokoi", "Create rooms")),
            new PluginPermission(Moderate, HouseholdRole.Admin, new LocalizedText("Usuwanie cudzych wiadomości w rozmowie domu", "Delete others' messages in the household's conversation")),
        ],
        Realtime = Hub,
        Ui = new PluginUi
        {
            Routes = [new PluginRoute("", new LocalizedText("Czat", "Chat"))],
            // The household's page only: on /wall the chat would be read by whoever walks by (C12).
            Widgets = [new PluginWidget(Widget, new LocalizedText("Czat", "Chat"), WidgetSize.Medium, [WidgetPlace.Household])],
        },
        Notifications = [new PluginNotificationCategory(MessageNotification, new LocalizedText("Wiadomości", "Messages"))],
        Events = new PluginEvents([], [typeof(MemberLeft), typeof(MemberRoleChanged), typeof(UserErased)]),
    };
}

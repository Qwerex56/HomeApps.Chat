namespace Chat.Application.Common;

/// <summary>The hub's client methods (plan 5); the UI listens for these names.</summary>
public static class SignalNames
{
    public const string MessageSent = "MessageSent";
    public const string MessageEdited = "MessageEdited";
    public const string MessageDeleted = "MessageDeleted";
    public const string ReactionChanged = "ReactionChanged";
    public const string ReadMarkerMoved = "ReadMarkerMoved";
    public const string ConversationChanged = "ConversationChanged";
    public const string AttachmentChanged = "AttachmentChanged";
    public const string Typing = "Typing";
    public const string AccessChanged = "AccessChanged";
}

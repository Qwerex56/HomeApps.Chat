namespace Chat.Domain.Messages;

/// <summary>How a message was written, so the UI can mark one JARVIS wrote for someone (plan section 8).</summary>
public enum SentVia
{
    App = 0,
    Mcp = 1,
}

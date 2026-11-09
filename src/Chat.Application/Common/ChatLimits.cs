namespace Chat.Application.Common;

/// <summary>Section <c>Chat</c>.</summary>
public sealed class ChatLimits
{
    public const string SectionName = "Chat";

    /// <summary>C11: photos and videos one household may keep, 10 GB unless configured.</summary>
    public long StorageBytesPerHousehold { get; set; } = 10L * 1024 * 1024 * 1024;
}

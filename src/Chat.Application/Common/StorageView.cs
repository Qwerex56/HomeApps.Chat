namespace Chat.Application.Common;

/// <summary>C11: what the household's photos and videos take, and the limit.</summary>
public sealed record StorageView(long UsedBytes, long LimitBytes);

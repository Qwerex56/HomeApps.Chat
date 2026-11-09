namespace Chat.Application.Common;

/// <summary>A stored file and the type it is served as.</summary>
public sealed record MediaFile(string Key, string ContentType);

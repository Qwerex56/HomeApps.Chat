namespace Chat.Application.Common;

/// <summary>
/// The message answered. When the reader may not see it (a guest, older than their joining, C3) only
/// <see cref="Visible"/> = <c>false</c> is told: the UI says "Starsza wiadomość".
/// </summary>
/// <param name="Text">The start of its text, at most <see cref="MaxLength"/> characters.</param>
public sealed record MessageQuoteView(Guid Id, bool Visible, Guid? AuthorId, string? Text, int Attachments, bool Deleted)
{
    public const int MaxLength = 200;
}

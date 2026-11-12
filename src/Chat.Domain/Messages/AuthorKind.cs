namespace Chat.Domain.Messages;

/// <summary>Who wrote a message: a person of the household, or JARVIS (jarvis-v1.md 5.1), who is not a member.</summary>
public enum AuthorKind
{
    Person = 0,
    Assistant = 1,
}

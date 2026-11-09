namespace Chat.Domain.Conversations;

public enum ConversationKind
{
    /// <summary>"Dom": everyone in the household with <c>chat.read</c>; nobody is listed, membership decides.</summary>
    Household = 0,

    /// <summary>A named group of chosen people from the household (C1, C13).</summary>
    Room = 1,

    /// <summary>Exactly two people from the household.</summary>
    Direct = 2,
}

using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Households.UserErased;

/// <summary>
/// An account was erased (C5, "forget me"): the text and files of everything they wrote go ("Wiadomość usunięta" stays),
/// their reactions, unsent uploads, read markers and mutes go, and they leave every room. Sent by the consumer of
/// Accounts' events.
/// </summary>
public sealed record UserErasedCommand(Guid UserId) : ICommand;

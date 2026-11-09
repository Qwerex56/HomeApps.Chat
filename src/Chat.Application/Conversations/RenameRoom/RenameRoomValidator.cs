using FluentValidation;

namespace Chat.Application.Conversations.RenameRoom;

internal sealed class RenameRoomValidator : AbstractValidator<RenameRoomCommand>
{
    public RenameRoomValidator() => RuleFor(c => c.Name).NotNull();
}

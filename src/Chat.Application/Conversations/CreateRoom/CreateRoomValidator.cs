using FluentValidation;

namespace Chat.Application.Conversations.CreateRoom;

internal sealed class CreateRoomValidator : AbstractValidator<CreateRoomCommand>
{
    public CreateRoomValidator()
    {
        RuleFor(c => c.Name).NotNull();
        RuleFor(c => c.ParticipantIds).NotNull();
    }
}

using FluentValidation;

namespace Chat.Application.Conversations.AddParticipants;

internal sealed class AddParticipantsValidator : AbstractValidator<AddParticipantsCommand>
{
    public AddParticipantsValidator() => RuleFor(c => c.UserIds).NotEmpty();
}

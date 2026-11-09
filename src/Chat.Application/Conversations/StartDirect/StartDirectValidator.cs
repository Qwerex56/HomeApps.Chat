using FluentValidation;

namespace Chat.Application.Conversations.StartDirect;

internal sealed class StartDirectValidator : AbstractValidator<StartDirectCommand>
{
    public StartDirectValidator() => RuleFor(c => c.OtherUserId).NotEmpty();
}

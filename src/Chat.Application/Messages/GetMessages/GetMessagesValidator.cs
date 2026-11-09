using FluentValidation;

namespace Chat.Application.Messages.GetMessages;

internal sealed class GetMessagesValidator : AbstractValidator<GetMessagesQuery>
{
    public GetMessagesValidator()
    {
        RuleFor(q => q.Limit).InclusiveBetween(1, GetMessagesQuery.MaxLimit);
        RuleFor(q => q.After).Null().When(q => q.Before is not null).WithMessage("Podaj before albo after, nie oba naraz.");
    }
}

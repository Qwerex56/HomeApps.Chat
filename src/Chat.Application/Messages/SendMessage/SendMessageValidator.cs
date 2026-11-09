using Chat.Domain.Messages;
using FluentValidation;

namespace Chat.Application.Messages.SendMessage;

internal sealed class SendMessageValidator : AbstractValidator<SendMessageCommand>
{
    public SendMessageValidator()
    {
        RuleFor(c => c.ClientMessageId).NotEmpty();
        RuleFor(c => c.AttachmentIds).NotNull();
        RuleFor(c => c.AttachmentIds.Count).LessThanOrEqualTo(Message.MaxAttachments).When(c => c.AttachmentIds is not null);
        RuleFor(c => c.Via).IsInEnum();
    }
}

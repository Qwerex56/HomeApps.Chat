using FluentValidation;

namespace Chat.Application.Attachments.UploadAttachment;

internal sealed class UploadAttachmentValidator : AbstractValidator<UploadAttachmentCommand>
{
    public UploadAttachmentValidator() => RuleFor(c => c.Content).NotNull();
}

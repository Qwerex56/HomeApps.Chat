using Chat.Domain.Attachments;
using Chat.Domain.Conversations;
using Chat.Domain.Messages;
using FluentResults;
using HomeApps.BuildingBlocks.Domain.Errors;

namespace Chat.Domain.Common;

public static class ChatErrors
{
    /// <summary>Also for a room or direct conversation the caller is not in: its existence is private too.</summary>
    public static Error ConversationNotFound => new AppError("conversation.not_found", "The conversation does not exist.", ErrorKind.NotFound);

    public static Error ConversationArchived => new AppError("conversation.archived",
        "The conversation is archived and can only be read.", ErrorKind.Conflict);

    public static Error ReadOnly => new AppError("conversation.read_only",
        "Guests read the chat but do not write in it.", ErrorKind.Forbidden);

    public static Error RoomNameInvalid => new AppError("conversation.name_invalid",
        $"A room name must have 1–{RoomName.MaxLength} characters and no control characters.", ErrorKind.Validation);

    public static Error NotARoom => new AppError("conversation.not_a_room",
        "Only rooms have names and participants to change.", ErrorKind.Conflict);

    public static Error NotKeeper => new AppError("conversation.not_keeper",
        "Only the room's keeper renames it, removes others and archives it.", ErrorKind.Forbidden);

    public static Error ParticipantsInvalid => new AppError("conversation.participants_invalid",
        "Choose people from the household who are not in the room yet (to leave, use leave).", ErrorKind.Validation);

    public static Error DirectWithSelf => new AppError("conversation.direct_invalid",
        "A direct conversation needs another person.", ErrorKind.Validation);

    public static Error MessageNotFound => new AppError("message.not_found", "The message does not exist.", ErrorKind.NotFound);

    public static Error MessageTextInvalid => new AppError("message.text_invalid",
        $"A message may have at most {MessageText.MaxLength} characters and no control characters except new lines.",
        ErrorKind.Validation);

    public static Error MessageEmpty => new AppError("message.empty",
        "A message needs text or at least one photo or video.", ErrorKind.Validation);

    public static Error TooManyAttachments => new AppError("message.too_many_attachments",
        $"A message may have at most {Message.MaxAttachments} photos and videos.", ErrorKind.Validation);

    public static Error ReplyInvalid => new AppError("message.reply_invalid",
        "A reply must answer a message from the same conversation.", ErrorKind.Validation);

    public static Error NotAuthor => new AppError("message.forbidden",
        "Only the author changes a message; household moderators also delete in the household's conversation.",
        ErrorKind.Forbidden);

    public static Error MessageDeleted => new AppError("message.deleted", "The message was deleted.", ErrorKind.Conflict);

    public static Error ReactionInvalid => new AppError("reaction.invalid", "A reaction is a single emoji.", ErrorKind.Validation);

    public static Error AttachmentNotFound => new AppError("attachment.not_found", "The attachment does not exist.", ErrorKind.NotFound);

    public static Error AttachmentUnsupported => new AppError("attachment.unsupported",
        "Send photos (JPEG, PNG, WebP, GIF) or videos (MP4, MOV, WebM).", ErrorKind.Validation);

    public static Error AttachmentTooLarge => new AppError("attachment.too_large",
        $"A photo or video may have at most {Attachment.MaxBytes / 1024 / 1024} MB.", ErrorKind.Validation);

    public static Error AttachmentTooLong => new AppError("attachment.too_long",
        $"A video may be at most {Attachment.MaxVideoLength.TotalSeconds:0} seconds long.", ErrorKind.Validation);

    public static Error AttachmentUnreadable => new AppError("attachment.unreadable",
        "The file could not be read as a photo or video.", ErrorKind.Validation);

    public static Error AttachmentNotReady => new AppError("attachment.not_ready",
        "The photo or video is still being checked, or was not accepted.", ErrorKind.Conflict);

    public static Error AttachmentNotPending => new AppError("attachment.not_pending",
        "The attachment was already checked.", ErrorKind.Conflict);
}

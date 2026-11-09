using Chat.Domain.Attachments;
using Chat.Domain.Common;
using Chat.Domain.Conversations;
using Chat.Domain.Messages;
using HomeApps.BuildingBlocks.Domain.Errors;

namespace Chat.Domain.Tests;

internal static class A
{
    public static readonly DateTimeOffset Now = new(2026, 11, 9, 18, 0, 0, TimeSpan.Zero);

    public static readonly Guid Household = Guid.Parse("0199a3f0-0000-7000-8000-00000000000a");

    public static string Code(this FluentResults.ResultBase result) => (string)result.Errors[0].Metadata[AppError.CodeKey];

    public static Actor Member() => Actor.Member(Guid.NewGuid());

    public static Conversation HouseholdConversation(TimeProvider time) => Conversation.CreateForHousehold(Household, time);

    public static Conversation Room(Actor keeper, TimeProvider time, params Guid[] others) =>
        Conversation.CreateRoom(Household, keeper, "Rodzice", others, time).Value;

    public static Message Message(Conversation conversation, Actor author, TimeProvider time, string text = "Obiad o 18") =>
        Domain.Messages.Message.Send(conversation, author, text, [], null, Guid.NewGuid(), SentVia.App, time).Value;

    public static Attachment ReadyPhoto(Actor uploader, TimeProvider time)
    {
        var photo = Attachment.Upload(Household, uploader, "image/jpeg", 2_000_000, time).Value;
        photo.Checked(new MediaInfo(MediaKind.Image, "image/jpeg", 1600, 1200, null));
        return photo;
    }
}

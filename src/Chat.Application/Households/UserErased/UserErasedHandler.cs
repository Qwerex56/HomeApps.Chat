using Chat.Application.Abstractions;
using Chat.Application.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Households.UserErased;

internal sealed class UserErasedHandler(
    IConversationRepository conversations,
    IMessageRepository messages,
    IAttachmentRepository attachments,
    IReadMarkerRepository markers,
    IMuteRepository mutes,
    AfterCommit after,
    TimeProvider time)
    : ICommandHandler<UserErasedCommand>
{
    public async Task<Result> Handle(UserErasedCommand command, CancellationToken cancellationToken)
    {
        var userId = command.UserId;
        var files = new List<Guid>();
        foreach (var message in await messages.ListByAuthorAsync(userId, cancellationToken))
        {
            files.AddRange(message.AuthorErased(time));
        }

        foreach (var message in await messages.ListReactedByAsync(userId, cancellationToken))
        {
            message.RemoveReactionsOf(userId);
        }

        var unsent = await attachments.ListUnsentOfAsync(userId, cancellationToken);
        foreach (var attachment in (await attachments.ListAsync(files, cancellationToken)).Concat(unsent))
        {
            attachments.Remove(attachment);
            after.DeleteFiles(attachment);
        }

        foreach (var conversation in await conversations.ListWithParticipantAsync(null, userId, cancellationToken))
        {
            var successor = conversation.KeeperId == userId ? await Successors.PickAsync(conversation, userId, messages, cancellationToken) : null;
            conversation.MemberLeft(userId, successor, time);
        }

        foreach (var marker in await markers.ListOfAsync(userId, cancellationToken))
        {
            markers.Remove(marker);
        }

        foreach (var mute in await mutes.ListOfAsync(userId, cancellationToken))
        {
            mutes.Remove(mute);
        }

        return Result.Ok();
    }
}

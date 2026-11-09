using Chat.Application.Abstractions;
using Chat.Application.Common;
using Chat.Domain.Common;
using Chat.Domain.Conversations;
using Chat.Domain.ReadMarkers;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Conversations.MarkRead;

internal sealed class MarkReadHandler(
    IConversationRepository conversations, IMessageRepository messages, IReadMarkerRepository markers, Actors actors, AfterCommit after,
    TimeProvider time)
    : ICommandHandler<MarkReadCommand>
{
    public async Task<Result> Handle(MarkReadCommand command, CancellationToken cancellationToken)
    {
        var actor = await actors.GetAsync(command.HouseholdId, cancellationToken);
        var found = await messages.FindReadableAsync(conversations, command.HouseholdId, command.MessageId, actor, cancellationToken);
        if (found.IsFailed || found.Value.Conversation.Id != command.ConversationId)
        {
            return Result.Fail(ChatErrors.MessageNotFound);
        }

        var (message, conversation) = found.Value;
        var marker = await markers.GetAsync(conversation.Id, actor.UserId, cancellationToken);
        if (marker is null)
        {
            markers.Add(ReadMarker.Start(actor.UserId, message, time));
        }
        else if (!marker.MoveTo(message, time))
        {
            return Result.Ok();
        }

        // The reader's other devices clear their badge; in a direct conversation the other person sees "Przeczytane" (C7).
        var audience = conversation.Kind == ConversationKind.Direct
            ? conversation.Participants.Select(p => p.UserId)
            : [actor.UserId];
        after.Signal(audience, SignalNames.ReadMarkerMoved,
            new { command.HouseholdId, command.ConversationId, actor.UserId, command.MessageId });
        return Result.Ok();
    }
}

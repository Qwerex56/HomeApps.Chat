using Chat.Application.Abstractions;
using Chat.Application.Common;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Assistant.ShowWorking;

internal sealed class ShowAssistantWorkingHandler(IMessageRepository messages, IConversationRepository conversations, AfterCommit after)
    : ICommandHandler<ShowAssistantWorkingCommand>
{
    public async Task<Result> Handle(ShowAssistantWorkingCommand command, CancellationToken cancellationToken)
    {
        // A message deleted or a conversation gone meanwhile: nobody to tell.
        if (await messages.FindAsync(command.Reference.MessageId, cancellationToken) is not { } asked
            || await conversations.GetAsync(asked.HouseholdId, asked.ConversationId, cancellationToken) is not { } conversation)
        {
            return Result.Ok();
        }

        after.Signal(conversation, SignalNames.AssistantWorking,
            new { asked.HouseholdId, ConversationId = conversation.Id, MessageId = asked.Id });
        return Result.Ok();
    }
}

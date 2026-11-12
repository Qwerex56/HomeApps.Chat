using Chat.Application.Assistant;
using Chat.Application.Assistant.ReceiveAnswer;
using Chat.Application.Assistant.ShowWorking;
using Chat.Infrastructure.Households;
using CardLine = Chat.Domain.Assistant.AssistantAction;
using HomeApps.Contracts.Assistant;
using MassTransit;
using MediatR;

namespace Chat.Infrastructure.Assistant;

/// <summary>JARVIS's side of the chat (jarvis-v1.md 5.2); other channels' messages are not ours. Public for MassTransit's scan.</summary>
public sealed class AssistantConsumer(ISender sender) : IConsumer<AssistantWorking>, IConsumer<AssistantResponded>
{
    public async Task Consume(ConsumeContext<AssistantWorking> context)
    {
        ArgumentNullException.ThrowIfNull(context);
        var m = context.Message;
        if (m.Channel == AssistantReference.Channel && AssistantReference.Parse(m.Reference) is { } reference)
        {
            Failed.ThrowIf(await sender.Send(new ShowAssistantWorkingCommand(reference), context.CancellationToken), m);
        }
    }

    public async Task Consume(ConsumeContext<AssistantResponded> context)
    {
        ArgumentNullException.ThrowIfNull(context);
        var m = context.Message;
        if (m.Channel != AssistantReference.Channel || AssistantReference.Parse(m.Reference) is not { } reference)
        {
            return;
        }

        var actions = m.Actions.Select(a => new CardLine(a.Description, a.Status, a.Url, a.ConfirmationId, a.ConfirmBy)).ToList();
        Failed.ThrowIf(await sender.Send(new ReceiveAssistantAnswerCommand(m.InvocationId, reference, m.Text, actions), context.CancellationToken), m);
    }
}

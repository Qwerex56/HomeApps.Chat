using Chat.Application.Assistant.ConfirmAction;
using Chat.Application.Settings;
using Chat.Application.Settings.ChangeSettings;
using Chat.Application.Settings.GetSettings;
using HomeApps.BuildingBlocks.Api.Endpoints;
using HomeApps.BuildingBlocks.Api.Results;
using MediatR;

namespace Chat.Api.Endpoints;

/// <summary>JARVIS in the chat (jarvis-v1.md 5): the household's switch and the decisions on his cards.</summary>
internal sealed class AssistantEndpoints : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        var household = app.MapGroup("/households/{householdId:guid}").WithTags("JARVIS");

        household.MapGet("/settings", async (Guid householdId, ISender sender, CancellationToken ct) =>
            (await sender.Send(new GetSettingsQuery(householdId), ct)).ToHttpResult())
            .Produces<SettingsView>();

        household.MapPut("/settings", async (Guid householdId, SettingsRequest body, ISender sender, CancellationToken ct) =>
            (await sender.Send(new ChangeSettingsCommand(householdId, body.Assistant), ct)).ToHttpResult())
            .Produces<SettingsView>();

        // Accepted: JARVIS runs or drops the action and the card changes through MessageEdited.
        household.MapPost("/messages/{messageId:guid}/actions/{confirmationId:guid}", async (Guid householdId, Guid messageId,
                Guid confirmationId, DecisionRequest body, ISender sender, CancellationToken ct) =>
            {
                var sent = await sender.Send(new ConfirmAssistantActionCommand(householdId, messageId, confirmationId, body.Approve), ct);
                return sent.IsFailed ? sent.ToHttpResult() : Results.Accepted();
            })
            .Produces(StatusCodes.Status202Accepted);
    }
}

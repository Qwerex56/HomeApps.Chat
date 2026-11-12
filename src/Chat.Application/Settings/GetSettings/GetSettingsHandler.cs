using Chat.Application.Abstractions;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Settings.GetSettings;

internal sealed class GetSettingsHandler(IChatSettingsRepository settings) : IQueryHandler<GetSettingsQuery, SettingsView>
{
    public async Task<Result<SettingsView>> Handle(GetSettingsQuery query, CancellationToken cancellationToken) =>
        new SettingsView((await settings.FindAsync(query.HouseholdId, cancellationToken))?.AssistantEnabled ?? false);
}

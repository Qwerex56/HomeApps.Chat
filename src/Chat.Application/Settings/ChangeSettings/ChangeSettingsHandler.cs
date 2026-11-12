using Chat.Application.Abstractions;
using Chat.Domain.Settings;
using FluentResults;
using HomeApps.BuildingBlocks.Application.Abstractions;
using HomeApps.BuildingBlocks.Application.Messaging;

namespace Chat.Application.Settings.ChangeSettings;

internal sealed class ChangeSettingsHandler(IChatSettingsRepository settings, ICurrentUser user, TimeProvider time)
    : ICommandHandler<ChangeSettingsCommand, SettingsView>
{
    public async Task<Result<SettingsView>> Handle(ChangeSettingsCommand command, CancellationToken cancellationToken)
    {
        var current = await settings.FindAsync(command.HouseholdId, cancellationToken);
        if (current is null)
        {
            settings.Add(ChatSettings.Create(command.HouseholdId, command.Assistant, user.RequiredUserId, time));
        }
        else
        {
            current.Change(command.Assistant, user.RequiredUserId, time);
        }

        return new SettingsView(command.Assistant);
    }
}

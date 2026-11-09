using Chat.Application.Households.MemberLeft;
using Chat.Application.Households.MemberRoleChanged;
using HomeApps.Contracts.Households;
using MassTransit;
using MediatR;

namespace Chat.Infrastructure.Households;

/// <summary>
/// Follows who leaves households and whose role changes (C5, plan 5). Each message only sends a command; the commands
/// are idempotent. A failed result throws, so the message is retried and ends in the <c>_error</c> queue rather than
/// lost. Public because MassTransit's scan finds public consumers only.
/// </summary>
public sealed class HouseholdMembersConsumer(ISender sender) : IConsumer<MemberLeft>, IConsumer<MemberRoleChanged>
{
    public async Task Consume(ConsumeContext<MemberLeft> context)
    {
        ArgumentNullException.ThrowIfNull(context);
        var m = context.Message;
        Failed.ThrowIf(await sender.Send(new MemberLeftCommand(m.HouseholdId, m.UserId), context.CancellationToken), m);
    }

    public async Task Consume(ConsumeContext<MemberRoleChanged> context)
    {
        ArgumentNullException.ThrowIfNull(context);
        var m = context.Message;
        Failed.ThrowIf(await sender.Send(new MemberRoleChangedCommand(m.HouseholdId, m.UserId, m.NewRole), context.CancellationToken), m);
    }
}

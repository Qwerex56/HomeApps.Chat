using Chat.Application.Households.UserErased;
using HomeApps.Contracts.Accounts;
using MassTransit;
using MediatR;

namespace Chat.Infrastructure.Households;

/// <summary>An erased account's messages lose their content (C5). Public for MassTransit's scan.</summary>
public sealed class AccountsConsumer(ISender sender) : IConsumer<UserErased>
{
    public async Task Consume(ConsumeContext<UserErased> context)
    {
        ArgumentNullException.ThrowIfNull(context);
        Failed.ThrowIf(await sender.Send(new UserErasedCommand(context.Message.UserId), context.CancellationToken), context.Message);
    }
}

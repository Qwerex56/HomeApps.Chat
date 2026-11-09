using FluentResults;

namespace Chat.Infrastructure.Households;

internal static class Failed
{
    /// <summary>Turns a failed result into an exception, so MassTransit retries the message.</summary>
    public static void ThrowIf(Result result, object message)
    {
        if (result.IsFailed)
        {
            throw new InvalidOperationException($"Handling {message} failed: {string.Join("; ", result.Errors.Select(e => e.Message))}");
        }
    }
}

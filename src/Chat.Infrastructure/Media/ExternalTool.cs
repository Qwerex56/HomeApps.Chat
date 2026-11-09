using System.Diagnostics;

namespace Chat.Infrastructure.Media;

/// <summary>Runs ffmpeg or ffprobe with arguments (never through a shell) and returns standard output, or <c>null</c> when it failed.</summary>
internal static class ExternalTool
{
    private static readonly TimeSpan Timeout = TimeSpan.FromMinutes(1);

    public static async Task<string?> RunAsync(string tool, IEnumerable<string> arguments, CancellationToken cancellationToken)
    {
        var start = new ProcessStartInfo(tool)
        {
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
        };
        foreach (var argument in arguments)
        {
            start.ArgumentList.Add(argument);
        }

        using var process = Process.Start(start) ?? throw new InvalidOperationException($"Could not start {tool}.");
        using var timeout = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        timeout.CancelAfter(Timeout);
        var output = process.StandardOutput.ReadToEndAsync(timeout.Token);
        var errors = process.StandardError.ReadToEndAsync(timeout.Token);
        try
        {
            await process.WaitForExitAsync(timeout.Token);
        }
        catch (OperationCanceledException) when (!cancellationToken.IsCancellationRequested)
        {
            process.Kill(entireProcessTree: true);
            return null;
        }

        await errors;
        return process.ExitCode == 0 ? await output : null;
    }
}

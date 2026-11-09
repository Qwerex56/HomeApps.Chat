namespace Chat.Api.Tests;

/// <summary>The real clock plus an offset the tests move forward.</summary>
public sealed class MovableTime : TimeProvider
{
    private TimeSpan _offset;

    public override DateTimeOffset GetUtcNow() => System.GetUtcNow() + _offset;

    public void Advance(TimeSpan by) => _offset += by;
}

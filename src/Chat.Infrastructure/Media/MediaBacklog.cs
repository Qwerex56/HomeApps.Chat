using System.Threading.Channels;
using Chat.Application.Abstractions;

namespace Chat.Infrastructure.Media;

/// <summary><see cref="IMediaProcessing"/> in memory (plan 4.2): a channel the <see cref="MediaProcessingJob"/> reads.</summary>
internal sealed class MediaBacklog : IMediaProcessing
{
    private readonly Channel<Guid> _channel = Channel.CreateUnbounded<Guid>(new UnboundedChannelOptions { SingleReader = true });

    public ChannelReader<Guid> Reader => _channel.Reader;

    public void Enqueue(Guid attachmentId) => _channel.Writer.TryWrite(attachmentId);
}

namespace Chat.Application.Abstractions;

/// <summary>Uploads waiting for <see cref="IMediaProcessor"/>, processed in the background one by one.</summary>
public interface IMediaProcessing
{
    void Enqueue(Guid attachmentId);
}

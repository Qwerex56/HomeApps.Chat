namespace Chat.Domain.Messages;

/// <summary>C14: no end-to-end encryption in 1.0. The field is here so secret 1:1 conversations can come later without a migration.</summary>
public enum MessageEncryption
{
    None = 0,
}

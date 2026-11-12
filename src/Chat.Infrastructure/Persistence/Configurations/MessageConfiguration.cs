using Chat.Domain.Conversations;
using Chat.Domain.Messages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Chat.Infrastructure.Persistence.Configurations;

internal sealed class MessageConfiguration : IEntityTypeConfiguration<Message>
{
    /// <summary>A gap-free order of messages for paging (<c>before</c>/<c>after</c>), even when two share a timestamp.</summary>
    public const string Number = "Number";

    public void Configure(EntityTypeBuilder<Message> builder)
    {
        builder.ToTable("Messages");
        builder.HasKey(m => m.Id);
        builder.Property(m => m.Id).ValueGeneratedNever();
        builder.Property<uint>("Version").IsRowVersion();
        builder.Property<long>(Number).UseIdentityByDefaultColumn();

        builder.Property(m => m.Text).HasConversion(Converters.MessageText).HasMaxLength(MessageText.MaxLength);
        builder.Property(m => m.SentVia).HasConversion<string>().HasMaxLength(Converters.EnumLength);
        builder.Property(m => m.Encryption).HasConversion<string>().HasMaxLength(Converters.EnumLength);
        builder.Ignore(m => m.IsDeleted);
        builder.Property(m => m.AuthorKind).HasConversion<string>().HasMaxLength(Converters.EnumLength);

        // JARVIS's card as JSON on his message: shown whole, never queried.
        builder.OwnsMany(m => m.Actions, action =>
        {
            action.ToJson("Actions");
            action.Property(a => a.Description).HasMaxLength(1000);
        });
        builder.Navigation(m => m.Actions).HasField("_actions").UsePropertyAccessMode(PropertyAccessMode.Field);

        builder.Ignore(m => m.AttachmentIds);
        builder.Property<List<Guid>>("_attachmentIds").HasColumnName("AttachmentIds");

        builder.OwnsMany(m => m.Reactions, reaction =>
        {
            reaction.ToTable("Reactions");
            reaction.WithOwner().HasForeignKey("MessageId");
            reaction.HasKey("MessageId", nameof(Reaction.UserId), nameof(Reaction.Emoji));
            reaction.Property(r => r.Emoji).HasMaxLength(32);
            reaction.HasIndex(r => r.UserId);
        });
        builder.Navigation(m => m.Reactions).HasField("_reactions").UsePropertyAccessMode(PropertyAccessMode.Field);

        builder.HasOne<Conversation>().WithMany().HasForeignKey(m => m.ConversationId).OnDelete(DeleteBehavior.Restrict);
        builder.HasIndex(m => new { m.ConversationId, m.AuthorId, m.ClientMessageId }).IsUnique();
        builder.HasIndex(Number).IsUnique();
        builder.HasIndex(m => m.AuthorId);
    }
}

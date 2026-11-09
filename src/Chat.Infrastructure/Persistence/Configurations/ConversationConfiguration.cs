using Chat.Domain.Conversations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Chat.Infrastructure.Persistence.Configurations;

internal sealed class ConversationConfiguration : IEntityTypeConfiguration<Conversation>
{
    public void Configure(EntityTypeBuilder<Conversation> builder)
    {
        builder.ToTable("Conversations");
        builder.HasKey(c => c.Id);
        builder.Property(c => c.Id).ValueGeneratedNever();
        builder.Property<uint>("Version").IsRowVersion();

        builder.Property(c => c.Kind).HasConversion<string>().HasMaxLength(Converters.EnumLength);
        builder.Property(c => c.Name).HasConversion(Converters.RoomName).HasMaxLength(RoomName.MaxLength);
        builder.Property(c => c.DirectKey).HasMaxLength(65);
        builder.Ignore(c => c.IsArchived);

        builder.OwnsMany(c => c.Participants, participant =>
        {
            participant.ToTable("Participants");
            participant.WithOwner().HasForeignKey("ConversationId");
            participant.HasKey("ConversationId", nameof(Participant.UserId));
            participant.HasIndex(p => p.UserId);
        });
        builder.Navigation(c => c.Participants).HasField("_participants").UsePropertyAccessMode(PropertyAccessMode.Field);

        builder.HasIndex(c => c.HouseholdId).IsUnique().HasFilter("\"Kind\" = 'Household'").HasDatabaseName("IX_Conversations_Household");
        builder.HasIndex(c => new { c.HouseholdId, c.DirectKey }).IsUnique()
            .HasFilter("\"DirectKey\" IS NOT NULL AND \"ArchivedAt\" IS NULL");
    }
}

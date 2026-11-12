using Chat.Domain.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Chat.Infrastructure.Persistence.Configurations;

internal sealed class ChatSettingsConfiguration : IEntityTypeConfiguration<ChatSettings>
{
    public void Configure(EntityTypeBuilder<ChatSettings> builder)
    {
        builder.ToTable("Settings");
        builder.HasKey(s => s.HouseholdId);
        builder.Property(s => s.HouseholdId).ValueGeneratedNever();
    }
}

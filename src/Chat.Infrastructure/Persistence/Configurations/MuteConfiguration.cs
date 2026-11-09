using Chat.Domain.Mutes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Chat.Infrastructure.Persistence.Configurations;

internal sealed class MuteConfiguration : IEntityTypeConfiguration<Mute>
{
    public void Configure(EntityTypeBuilder<Mute> builder)
    {
        builder.ToTable("Mutes");
        builder.HasKey(m => new { m.ConversationId, m.UserId });
        builder.HasIndex(m => m.UserId);
    }
}

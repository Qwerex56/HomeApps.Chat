using Chat.Domain.ReadMarkers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Chat.Infrastructure.Persistence.Configurations;

internal sealed class ReadMarkerConfiguration : IEntityTypeConfiguration<ReadMarker>
{
    public void Configure(EntityTypeBuilder<ReadMarker> builder)
    {
        builder.ToTable("ReadMarkers");
        builder.HasKey(m => new { m.ConversationId, m.UserId });
        builder.HasIndex(m => m.UserId);
    }
}

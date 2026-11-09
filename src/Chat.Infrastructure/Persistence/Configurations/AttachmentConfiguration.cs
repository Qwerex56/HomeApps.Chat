using Chat.Domain.Attachments;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Chat.Infrastructure.Persistence.Configurations;

internal sealed class AttachmentConfiguration : IEntityTypeConfiguration<Attachment>
{
    public void Configure(EntityTypeBuilder<Attachment> builder)
    {
        builder.ToTable("Attachments");
        builder.HasKey(a => a.Id);
        builder.Property(a => a.Id).ValueGeneratedNever();
        builder.Property<uint>("Version").IsRowVersion();

        builder.Property(a => a.Kind).HasConversion<string>().HasMaxLength(Converters.EnumLength);
        builder.Property(a => a.Status).HasConversion<string>().HasMaxLength(Converters.EnumLength);
        builder.Property(a => a.ContentType).HasMaxLength(100);
        builder.Property(a => a.FailureCode).HasMaxLength(64);

        builder.HasIndex(a => new { a.HouseholdId, a.Status });
        builder.HasIndex(a => new { a.Status, a.CreatedAt });
        builder.HasIndex(a => a.UploaderId);
    }
}

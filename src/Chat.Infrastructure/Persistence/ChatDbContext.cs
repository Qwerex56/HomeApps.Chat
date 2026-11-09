using Chat.Domain.Attachments;
using Chat.Domain.Conversations;
using Chat.Domain.Messages;
using Chat.Domain.Mutes;
using Chat.Domain.ReadMarkers;
using HomeApps.Plugins.Hosting;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Chat.Infrastructure.Persistence;

/// <summary>The plugin's own database (<c>homeapps_chat</c>): conversations, messages, attachments, read markers, mutes and the kit's switch.</summary>
public sealed class ChatDbContext(DbContextOptions<ChatDbContext> options, IPublisher publisher) : PluginDbContext(options, publisher)
{
    public DbSet<Conversation> Conversations => Set<Conversation>();

    public DbSet<Message> Messages => Set<Message>();

    public DbSet<Attachment> Attachments => Set<Attachment>();

    public DbSet<ReadMarker> ReadMarkers => Set<ReadMarker>();

    public DbSet<Mute> Mutes => Set<Mute>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ChatDbContext).Assembly);
    }
}

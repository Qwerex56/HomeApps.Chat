using Chat.Api.Endpoints;
using Chat.Api.Http;
using Chat.Api.Realtime;
using Chat.Application;
using Chat.Infrastructure;
using Chat.Infrastructure.Persistence;
using HomeApps.BuildingBlocks.Infrastructure.Persistence;
using HomeApps.Plugins.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.AddHomeAppsPlugin(ChatPlugin.Manifest, typeof(Program).Assembly);
builder.Services.AddChatApplication();
builder.Services.AddChatInfrastructure(builder.Configuration);
builder.Services.AddChatRealtime();
builder.Services.AddChatRateLimits();

var app = builder.Build();

app.UseHomeAppsPlugin();
app.UseRateLimiter();
app.MapHub<ChatHub>($"/{ChatPlugin.Hub}");
app.MapMedia();

await app.MigrateDatabaseOnStartupAsync<ChatDbContext>();

await app.RunAsync();

public partial class Program;

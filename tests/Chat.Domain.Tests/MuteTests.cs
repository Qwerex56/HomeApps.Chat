using Chat.Domain.Mutes;

namespace Chat.Domain.Tests;

public sealed class MuteTests
{
    [Fact]
    public void A_mute_lasts_until_its_time_or_for_good()
    {
        var forGood = Mute.Start(Guid.NewGuid(), Guid.NewGuid(), null);
        var forEightHours = Mute.Start(Guid.NewGuid(), Guid.NewGuid(), A.Now.AddHours(8));

        Assert.True(forGood.IsActive(A.Now.AddYears(1)));
        Assert.True(forEightHours.IsActive(A.Now.AddHours(7)));
        Assert.False(forEightHours.IsActive(A.Now.AddHours(8)));
    }
}

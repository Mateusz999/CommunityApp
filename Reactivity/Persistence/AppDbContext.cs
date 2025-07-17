using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Activity> Activities { get; set; }
    public required DbSet<ActivityAttendee> ActivityAttendees { get; set; }
    public required DbSet<Comment> Comments{ get; set; }
    public required DbSet<Photo> Photos { get; set; }
    public required DbSet<UserFollowing> UserFollowings{ get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        //  tworzymy klucz g³ówny, który sk³ada sie z dwóch pól
        builder.Entity<ActivityAttendee>(x => x.HasKey(a => new { a.ActivityId, a.UserId }));
        // okreœlamy relacje naszej nowej encji w, której to mo¿emy mieæ j
        builder.Entity<ActivityAttendee>()
            .HasOne(u => u.User)
            .WithMany(a => a.Activities)
            .HasForeignKey(u => u.UserId);

        builder.Entity<ActivityAttendee>()
            .HasOne(u => u.Activity)
            .WithMany(a => a.Attendees)
            .HasForeignKey(u => u.ActivityId);


        builder.Entity<UserFollowing>(x =>
        {
            x.HasKey(k => new { k.ObserverId, k.TargetId });

            x.HasOne(o => o.Observer)
                .WithMany(f => f.Followings)
                .HasForeignKey(o => o.ObserverId)
                .OnDelete(DeleteBehavior.Cascade);

            x.HasOne(o => o.Target)
                .WithMany(f => f.Followers)
                .HasForeignKey(o => o.TargetId)
                .OnDelete(DeleteBehavior.Cascade);
        });



        var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
                V => V.ToUniversalTime(),
                V => DateTime.SpecifyKind(V, DateTimeKind.Utc)
                );

        foreach( var entityType in builder.Model.GetEntityTypes())
        {
            foreach(var property in entityType.GetProperties())
            {
                if(property.ClrType == typeof(DateTime))
                {
                    property.SetValueConverter(dateTimeConverter);
                }
            }
        }
    }
}

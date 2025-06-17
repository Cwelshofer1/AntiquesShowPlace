using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using AntiquesShowCase.Models;


namespace AntiquesShowCase.Data;

public class AntiquesShowCaseDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;

    public DbSet<Category> Categories { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<CommentLike> CommentLikes { get; set; }
    public DbSet<Item> Items { get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }





    public AntiquesShowCaseDbContext(DbContextOptions<AntiquesShowCaseDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser[]
        {
            new IdentityUser
            {
                Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                UserName = "Administrator",
                Email = "admina@strator.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                UserName = "JohnDoe",
                Email = "john@doe.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "a7d21fac-3b21-454a-a747-075f072d0cf3",
                UserName = "JaneSmith",
                Email = "jane@smith.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                UserName = "AliceJohnson",
                Email = "alice@johnson.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                UserName = "BobWilliams",
                Email = "bob@williams.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                UserName = "EveDavis",
                Email = "Eve@Davis.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },

        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>[]
        {
            new IdentityUserRole<string>
            {
                RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
            },
            new IdentityUserRole<string>
            {
                RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                UserId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df"
            },

        });
        modelBuilder.Entity<Category>().HasData(new Category[]
        {
            new Category
            {
                Id = 1,
                Name = "Polarizing Stuff"
            },
            new Category
            {
                Id = 2,
                Name = "Rad Stuff"
            },

            new Category
            {
                Id = 3,
                Name = "Coool stuff"
            }
        });
        modelBuilder.Entity<Comment>().HasData(new Comment[]
{
    new Comment { Id = 1, Message = "Hi there Welcome!", DatePosted = new DateTime(2024, 5, 2), UserId = 1, CommentId = 1 },
    new Comment { Id = 2, Message = "Nice stuff!!", DatePosted = new DateTime(2024, 6, 1), UserId = 2, CommentId = 2 },
    new Comment { Id = 3, Message = "Price Too high!", DatePosted = new DateTime(2024, 4, 1), UserId = 3, CommentId = 3 },
    new Comment { Id = 4, Message = "Where did you get this?", DatePosted = new DateTime(2024, 3, 1), UserId = 4, CommentId = 4 }
});
        modelBuilder.Entity<CommentLike>().HasData(new CommentLike[]
        {
            new CommentLike
            {
                Id = 1,
                UserId = 1,
                CommentId = 1

            },
            new CommentLike
            {
                Id = 2,
                UserId = 2,
                CommentId = 2

            },
            new CommentLike
            {
                Id = 3,
                UserId = 3,
                CommentId = 3

            },
        });
        modelBuilder.Entity<Item>().HasData(new Item[]
        {
            new Item
            {
                Id = 1,
                Name = "Old Wardrobe",
                Description = "100 year old warerobe, maybe haunted.",
                YearMade = 1925,
                IsAntique = true,
                IsSeller = false,
                Price = "",
                ItemPhotoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsOSvbM1W_0mSQcrj3lWSkMnzPLaj2p5IP6A&s",
                UserId = 1,
                CategoryId = 1
            },
            new Item
            {
                Id = 2,
                Name = "Old Tractor Hitch",
                Description = "Old 3 point tractor hitch",
                YearMade = 1915,
                IsAntique = true,
                IsSeller = true,
                Price = "300",
                ItemPhotoUrl = "https://i.ebayimg.com/images/g/OQ4AAOSwZ-FmV5qi/s-l400.jpg",
                UserId = 1,
                CategoryId = 1
            },
            new Item
            {
                Id = 3,
                Name = "Antique Painting",
                Description = "Old painting by unknown author dated 1912",
                YearMade = 1912,
                IsAntique = true,
                IsSeller = true,
                Price = "1000",
                ItemPhotoUrl = "https://www.bisgart.com/images/stories/virtuemart/product/QR510%205a%20antique%20oil%20portrait%20paintings%20man%20portrait%2019thpg.jpg",
                UserId = 1,
                CategoryId = 1
            },
        });

        modelBuilder.Entity<UserProfile>().HasData(new UserProfile[]
{
            new UserProfile
            {
                Id = 4,
                Name = "Alice",
                Email = "Alice@alice.com",
                UserDescription = "Hi hello.",
                UserPhotoUrl = "",
                Password = "alice",
                UserIdentityId = "c806cfae-bda9-47c5-8473-dd52fd056a9b"
            }
    });
    }
}


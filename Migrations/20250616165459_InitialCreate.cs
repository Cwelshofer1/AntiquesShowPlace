using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AntiquesShowcase.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CommentLikes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    CommentId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentLikes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Message = table.Column<string>(type: "text", nullable: false),
                    DatePosted = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    CommentId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    YearMade = table.Column<int>(type: "integer", nullable: false),
                    IsAntique = table.Column<bool>(type: "boolean", nullable: false),
                    IsSeller = table.Column<bool>(type: "boolean", nullable: false),
                    Price = table.Column<string>(type: "text", nullable: true),
                    ItemPhotoUrl = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    UserDescription = table.Column<string>(type: "text", nullable: false),
                    UserPhotoUrl = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", null, "Admin", "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "9ce89d88-75da-4a80-9b0d-3fe58582b8e2", 0, "2efe3382-a21c-481e-b06b-ff58fe7d3edd", "bob@williams.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEJYtajZ1wGzq4fvXJchktBe9f4zTB60hUguWYVqrSPL8cRx9VIqE1MK1NWekcgfR/g==", null, false, "a9f46fe7-879b-4347-93c1-b4028e36aceb", false, "BobWilliams" },
                    { "a7d21fac-3b21-454a-a747-075f072d0cf3", 0, "729350df-557f-49f5-bfdf-5d9fe26e6bc5", "jane@smith.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEHEgAlFuY18BBtU++cRjrIC/I+aZgbYIyfVC2QXA5Qy5wPj07YGmbpwrRporIrlL1w==", null, false, "264edc81-3e14-488f-9ef7-bcb23ca034da", false, "JaneSmith" },
                    { "c806cfae-bda9-47c5-8473-dd52fd056a9b", 0, "651ea789-8769-425a-93bb-ab247c136340", "alice@johnson.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEOqZqMrsqEYFDsv9th6eqO9SyaUrAjaZuVext/erbUWrjWZwta8C/P81rDS0YhKbeg==", null, false, "c078a51f-7147-4719-abca-06bee381c05c", false, "AliceJohnson" },
                    { "d224a03d-bf0c-4a05-b728-e3521e45d74d", 0, "b0909e6e-54f9-4434-b546-0d70f5bd33d3", "Eve@Davis.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAENLLMkTZlh+iY2hpg4iGfjzE3cJl7dVfXk5zOnd/kTcaT58dh7iA/yGTv/h4HMNDeQ==", null, false, "fb588b5a-403e-4856-bed2-c2a7dfa2c111", false, "EveDavis" },
                    { "d8d76512-74f1-43bb-b1fd-87d3a8aa36df", 0, "f55457d9-e096-4956-9e4b-537b7d0cc589", "john@doe.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEIb2f1cyGgbOEgWR77z+n5lBcNQT86b9s5bUfe2i2LlsrjzCzu3Hvu3/ednZwP58Ig==", null, false, "b3ebbc75-7fe3-4905-98dc-019ca2e5bc3f", false, "JohnDoe" },
                    { "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", 0, "fcb17e93-f4b6-403b-9f40-feb15672966b", "admina@strator.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEBRQ/ysK6Jo5Ek0vmYyxwY685M1yOqbdHTIGCR4AzTHIJYw351nqX+7jTvOxcLjUUw==", null, false, "c17cd802-16f6-4a74-a050-749b4c59a90f", false, "Administrator" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Polarizing Stuff" },
                    { 2, "Rad Stuff" },
                    { 3, "Coool stuff" }
                });

            migrationBuilder.InsertData(
                table: "CommentLikes",
                columns: new[] { "Id", "CommentId", "UserId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 2, 2 },
                    { 3, 3, 3 }
                });

            migrationBuilder.InsertData(
                table: "Comments",
                columns: new[] { "Id", "CommentId", "DatePosted", "Message", "UserId" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2024, 5, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Hi there Welcome!", 1 },
                    { 2, 2, new DateTime(2024, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Nice stuff!!", 2 },
                    { 3, 3, new DateTime(2024, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Price Too high!", 3 },
                    { 4, 4, new DateTime(2024, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Where did you get this?", 4 }
                });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Id", "CategoryId", "Description", "IsAntique", "IsSeller", "ItemPhotoUrl", "Name", "Price", "UserId", "YearMade" },
                values: new object[,]
                {
                    { 1, 1, "100 year old warerobe, maybe haunted.", true, false, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsOSvbM1W_0mSQcrj3lWSkMnzPLaj2p5IP6A&s", "Old Wardrobe", "", 1, 1925 },
                    { 2, 1, "Old 3 point tractor hitch", true, true, "https://i.ebayimg.com/images/g/OQ4AAOSwZ-FmV5qi/s-l400.jpg", "Old Tractor Hitch", "300", 1, 1915 },
                    { 3, 1, "Old painting by unknown author dated 1912", true, true, "https://www.bisgart.com/images/stories/virtuemart/product/QR510%205a%20antique%20oil%20portrait%20paintings%20man%20portrait%2019thpg.jpg", "Antique Painting", "1000", 1, 1912 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Name", "Password", "UserDescription", "UserId", "UserPhotoUrl" },
                values: new object[,]
                {
                    { 1, "colin@colin.com", "Colin", "colin", "Just a guy who likes antiques!", 1, "https://i.pinimg.com/736x/71/c3/44/71c3441d006039873bfb2ed701af628a.jpg" },
                    { 2, "charlie@charlie.com", "Charlie", "charile", "Big antique collector looking to sell items.", 2, "https://media.istockphoto.com/id/525072301/photo/vintage-portrait.jpg?s=612x612&w=0&k=20&c=G3dImxHiFnj4jb-qF1Bl2PcdOdJivZE9CqMtMVMg3iY=" },
                    { 3, "larry@larry.com", "Larry", "larry", "New to antiques just here to look around.", 3, "https://media.istockphoto.com/id/2157613224/vector/naturalist.jpg?s=612x612&w=0&k=20&c=OmfcN0GG5gZMrhUtOD4QKSKD7V3idey5AUEXaZxdiAI=" },
                    { 4, "mary@mary.com", "Mary", "mary", "Antique Lover", 4, "https://media.istockphoto.com/id/2157613224/vector/naturalist.jpg?s=612x612&w=0&k=20&c=OmfcN0GG5gZMrhUtOD4QKSKD7V3idey" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "d8d76512-74f1-43bb-b1fd-87d3a8aa36df" },
                    { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "CommentLikes");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}

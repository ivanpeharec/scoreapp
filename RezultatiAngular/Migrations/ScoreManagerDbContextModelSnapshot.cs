﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RezultatiAngular.Models;

namespace RezultatiAngular.Migrations
{
    [DbContext(typeof(ScoreManagerDbContext))]
    partial class ScoreManagerDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.11-servicing-32099")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderKey")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128);

                    b.Property<string>("Name")
                        .HasMaxLength(128);

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("RezultatiAngular.Models.Attachment", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Image");

                    b.Property<int>("TeamID");

                    b.HasKey("ID");

                    b.HasIndex("TeamID");

                    b.ToTable("Attachments");
                });

            modelBuilder.Entity("RezultatiAngular.Models.BasketballMatchComponents", b =>
                {
                    b.Property<int>("MatchID");

                    b.Property<int?>("FirstQuarterAwayTeamScore");

                    b.Property<int?>("FirstQuarterHomeTeamScore");

                    b.Property<int?>("FourthQuarterAwayTeamScore");

                    b.Property<int?>("FourthQuarterHomeTeamScore");

                    b.Property<int?>("SecondQuarterAwayTeamScore");

                    b.Property<int?>("SecondQuarterHomeTeamScore");

                    b.Property<int?>("ThirdQuarterAwayTeamScore");

                    b.Property<int?>("ThirdQuarterHomeTeamScore");

                    b.HasKey("MatchID");

                    b.ToTable("BasketballMatchComponents");
                });

            modelBuilder.Entity("RezultatiAngular.Models.Competition", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.Property<int>("SportID");

                    b.HasKey("ID");

                    b.HasIndex("SportID");

                    b.ToTable("Competitions");

                    b.HasData(
                        new { ID = 1, Name = "La Liga", SportID = 1 },
                        new { ID = 2, Name = "Premier League", SportID = 1 },
                        new { ID = 3, Name = "Ligue 1", SportID = 1 },
                        new { ID = 4, Name = "Bundesliga", SportID = 1 },
                        new { ID = 5, Name = "Serie A", SportID = 1 }
                    );
                });

            modelBuilder.Entity("RezultatiAngular.Models.CompetitionTeam", b =>
                {
                    b.Property<int>("CompetitionID");

                    b.Property<int>("TeamID");

                    b.Property<bool>("Active");

                    b.HasKey("CompetitionID", "TeamID");

                    b.HasIndex("TeamID");

                    b.ToTable("CompetitionTeams");
                });

            modelBuilder.Entity("RezultatiAngular.Models.FootballMatchComponents", b =>
                {
                    b.Property<int>("MatchID");

                    b.Property<int?>("AwayTeamScore");

                    b.Property<int?>("HalfTimeAwayTeamScore");

                    b.Property<int?>("HalfTimeHomeTeamScore");

                    b.Property<int?>("HomeTeamScore");

                    b.HasKey("MatchID");

                    b.ToTable("FootballMatchComponents");
                });

            modelBuilder.Entity("RezultatiAngular.Models.IceHockeyMatchComponents", b =>
                {
                    b.Property<int>("MatchID");

                    b.Property<int?>("FirstPeriodAwayTeamScore");

                    b.Property<int?>("FirstPeriodHomeTeamScore");

                    b.Property<int?>("SecondPeriodAwayTeamScore");

                    b.Property<int?>("SecondPeriodHomeTeamScore");

                    b.Property<int?>("ThirdPeriodAwayTeamScore");

                    b.Property<int?>("ThirdPeriodHomeTeamScore");

                    b.HasKey("MatchID");

                    b.ToTable("IceHockeyMatchComponents");
                });

            modelBuilder.Entity("RezultatiAngular.Models.Match", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AwayTeamID");

                    b.Property<int>("CompetitionID");

                    b.Property<DateTime>("Date");

                    b.Property<int>("HomeTeamID");

                    b.Property<int>("SportID");

                    b.HasKey("ID");

                    b.HasIndex("AwayTeamID");

                    b.HasIndex("CompetitionID");

                    b.HasIndex("HomeTeamID");

                    b.HasIndex("SportID");

                    b.ToTable("Matches");
                });

            modelBuilder.Entity("RezultatiAngular.Models.Sport", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("ID");

                    b.ToTable("Sports");

                    b.HasData(
                        new { ID = 1, Name = "Football" },
                        new { ID = 2, Name = "Basketball" },
                        new { ID = 3, Name = "Tennis" },
                        new { ID = 4, Name = "Volleyball" },
                        new { ID = 5, Name = "Ice hockey" },
                        new { ID = 6, Name = "American football" },
                        new { ID = 7, Name = "Baseball" },
                        new { ID = 8, Name = "Handball" },
                        new { ID = 9, Name = "Water polo" }
                    );
                });

            modelBuilder.Entity("RezultatiAngular.Models.Team", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.Property<int>("SportID");

                    b.HasKey("ID");

                    b.HasIndex("SportID");

                    b.ToTable("Teams");

                    b.HasData(
                        new { ID = 1, Name = "FC Barcelona", SportID = 1 },
                        new { ID = 2, Name = "Real Madrid CF", SportID = 1 },
                        new { ID = 3, Name = "Atletico Madrid", SportID = 1 },
                        new { ID = 4, Name = "Getafe CF", SportID = 1 },
                        new { ID = 5, Name = "Valencia CF", SportID = 1 },
                        new { ID = 6, Name = "Sevilla FC", SportID = 1 },
                        new { ID = 7, Name = "Real Betis", SportID = 1 },
                        new { ID = 8, Name = "Villareal CF", SportID = 1 },
                        new { ID = 9, Name = "Real Sociedad", SportID = 1 },
                        new { ID = 10, Name = "Celta de Vigo", SportID = 1 },
                        new { ID = 11, Name = "Athletic Bilbao", SportID = 1 },
                        new { ID = 12, Name = "Deportivo Alaves", SportID = 1 },
                        new { ID = 13, Name = "RCD Espanyol", SportID = 1 },
                        new { ID = 14, Name = "Rayo Vallecano", SportID = 1 },
                        new { ID = 15, Name = "SD Eibar", SportID = 1 },
                        new { ID = 16, Name = "Levante UD", SportID = 1 },
                        new { ID = 17, Name = "CD Leganes", SportID = 1 },
                        new { ID = 18, Name = "Real Valladolid", SportID = 1 },
                        new { ID = 19, Name = "SD Huesca", SportID = 1 },
                        new { ID = 20, Name = "CD Leganes", SportID = 1 },
                        new { ID = 21, Name = "Manchester United F.C.", SportID = 1 },
                        new { ID = 22, Name = "Chelsea F.C.", SportID = 1 },
                        new { ID = 23, Name = "Arsenal F.C.", SportID = 1 },
                        new { ID = 24, Name = "PSG", SportID = 1 },
                        new { ID = 25, Name = "Juventus F.C.", SportID = 1 },
                        new { ID = 26, Name = "FC Bayern Munich", SportID = 1 }
                    );
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RezultatiAngular.Models.Attachment", b =>
                {
                    b.HasOne("RezultatiAngular.Models.Team", "Team")
                        .WithMany("Attachments")
                        .HasForeignKey("TeamID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RezultatiAngular.Models.BasketballMatchComponents", b =>
                {
                    b.HasOne("RezultatiAngular.Models.Match", "Match")
                        .WithOne("BasketballMatchComponents")
                        .HasForeignKey("RezultatiAngular.Models.BasketballMatchComponents", "MatchID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RezultatiAngular.Models.Competition", b =>
                {
                    b.HasOne("RezultatiAngular.Models.Sport", "Sport")
                        .WithMany("Competitions")
                        .HasForeignKey("SportID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RezultatiAngular.Models.CompetitionTeam", b =>
                {
                    b.HasOne("RezultatiAngular.Models.Competition", "Competition")
                        .WithMany("CompetitionTeams")
                        .HasForeignKey("CompetitionID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RezultatiAngular.Models.Team", "Team")
                        .WithMany("CompetitionTeams")
                        .HasForeignKey("TeamID")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("RezultatiAngular.Models.FootballMatchComponents", b =>
                {
                    b.HasOne("RezultatiAngular.Models.Match", "Match")
                        .WithOne("FootballMatchComponents")
                        .HasForeignKey("RezultatiAngular.Models.FootballMatchComponents", "MatchID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RezultatiAngular.Models.IceHockeyMatchComponents", b =>
                {
                    b.HasOne("RezultatiAngular.Models.Match", "Match")
                        .WithOne("IceHockeyMatchComponents")
                        .HasForeignKey("RezultatiAngular.Models.IceHockeyMatchComponents", "MatchID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RezultatiAngular.Models.Match", b =>
                {
                    b.HasOne("RezultatiAngular.Models.Team", "AwayTeam")
                        .WithMany()
                        .HasForeignKey("AwayTeamID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RezultatiAngular.Models.Competition", "Competition")
                        .WithMany("Matches")
                        .HasForeignKey("CompetitionID")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("RezultatiAngular.Models.Team", "HomeTeam")
                        .WithMany("Matches")
                        .HasForeignKey("HomeTeamID")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("RezultatiAngular.Models.Sport", "Sport")
                        .WithMany("Matches")
                        .HasForeignKey("SportID")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("RezultatiAngular.Models.Team", b =>
                {
                    b.HasOne("RezultatiAngular.Models.Sport", "Sport")
                        .WithMany()
                        .HasForeignKey("SportID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}

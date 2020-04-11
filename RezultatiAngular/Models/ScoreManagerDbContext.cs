using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RezultatiAngular.Models
{
    public class ScoreManagerDbContext : IdentityDbContext
    {
        protected ScoreManagerDbContext()
        {
        }

        public ScoreManagerDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Sport> Sports { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<Competition> Competitions { get; set; }
        public DbSet<CompetitionTeam> CompetitionTeams { get; set; }
        public DbSet<Attachment> Attachments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Match>()
                .HasOne(m => m.HomeTeam)
                .WithMany(t => t.Matches)
                .HasForeignKey(m => m.HomeTeamID).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Match>()
                .HasOne(m => m.Sport)
                .WithMany(s => s.Matches)
                .HasForeignKey(m => m.SportID).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Match>()
                .HasOne(m => m.Competition)
                .WithMany(c => c.Matches)
                .HasForeignKey(m => m.CompetitionID).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CompetitionTeam>()
                .HasKey(c => new { c.CompetitionID, c.TeamID });

            modelBuilder.Entity<CompetitionTeam>()
                .HasOne(c => c.Team)
                .WithMany(t => t.CompetitionTeams)
                .HasForeignKey(c => c.TeamID).OnDelete(DeleteBehavior.Restrict);

            // Sports.
            modelBuilder.Entity<Sport>().HasData(new Sport { ID = 1, Name = "Football" });
            modelBuilder.Entity<Sport>().HasData(new Sport { ID = 2, Name = "Basketball" });
            modelBuilder.Entity<Sport>().HasData(new Sport { ID = 3, Name = "Tennis" });

            // Clubs.
            modelBuilder.Entity<Team>().HasData(new Team { ID = 1, Name = "FC Barcelona", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 2, Name = "Real Madrid CF", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 3, Name = "Atletico Madrid", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 4, Name = "Getafe CF", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 5, Name = "Valencia CF", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 6, Name = "Sevilla FC", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 7, Name = "Real Betis", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 8, Name = "Villareal CF", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 9, Name = "Real Sociedad", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 10, Name = "Celta de Vigo", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 11, Name = "Athletic Bilbao", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 12, Name = "Deportivo Alaves", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 13, Name = "RCD Espanyol", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 14, Name = "Rayo Vallecano", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 15, Name = "SD Eibar", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 16, Name = "Levante UD", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 17, Name = "CD Leganes", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 18, Name = "Real Valladolid", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 19, Name = "SD Huesca", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 20, Name = "CD Leganes", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 21, Name = "Manchester United F.C.", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 22, Name = "Chelsea F.C.", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 23, Name = "Arsenal F.C.", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 24, Name = "PSG", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 25, Name = "Juventus F.C.", SportID = 1 });
            modelBuilder.Entity<Team>().HasData(new Team { ID = 26, Name = "FC Bayern Munich", SportID = 1 });

            // Competitions.
            modelBuilder.Entity<Competition>().HasData(new Competition { ID = 1, Name = "La Liga", SportID = 1 });
            modelBuilder.Entity<Competition>().HasData(new Competition { ID = 2, Name = "Premier League", SportID = 1 });
            modelBuilder.Entity<Competition>().HasData(new Competition { ID = 3, Name = "Ligue 1", SportID = 1 });
            modelBuilder.Entity<Competition>().HasData(new Competition { ID = 4, Name = "Bundesliga", SportID = 1 });
            modelBuilder.Entity<Competition>().HasData(new Competition { ID = 5, Name = "Serie A", SportID = 1 });
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace RezultatiAngular.Migrations
{
    public partial class HalfTimeScores : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HalfTimeAwayTeamScore",
                table: "Matches",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "HalfTimeHomeTeamScore",
                table: "Matches",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HalfTimeAwayTeamScore",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "HalfTimeHomeTeamScore",
                table: "Matches");
        }
    }
}

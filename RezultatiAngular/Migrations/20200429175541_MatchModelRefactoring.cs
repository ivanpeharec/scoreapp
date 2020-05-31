using Microsoft.EntityFrameworkCore.Migrations;

namespace RezultatiAngular.Migrations
{
    public partial class MatchModelRefactoring : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AwayTeamScore",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "HalfTimeAwayTeamScore",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "HalfTimeHomeTeamScore",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "HomeTeamScore",
                table: "Matches");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AwayTeamScore",
                table: "Matches",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "HalfTimeAwayTeamScore",
                table: "Matches",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "HalfTimeHomeTeamScore",
                table: "Matches",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "HomeTeamScore",
                table: "Matches",
                nullable: true);
        }
    }
}

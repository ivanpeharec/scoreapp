using Microsoft.EntityFrameworkCore.Migrations;

namespace RezultatiAngular.Migrations
{
    public partial class MatchModelRefactoring2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BasketballMatchComponents",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false),
                    MatchID = table.Column<int>(nullable: false),
                    FirstQuarterHomeTeamScore = table.Column<int>(nullable: true),
                    FirstQuarterAwayTeamScore = table.Column<int>(nullable: true),
                    SecondQuarterHomeTeamScore = table.Column<int>(nullable: true),
                    SecondQuarterAwayTeamScore = table.Column<int>(nullable: true),
                    ThirdQuarterHomeTeamScore = table.Column<int>(nullable: true),
                    ThirdQuarterAwayTeamScore = table.Column<int>(nullable: true),
                    FourthQuarterHomeTeamScore = table.Column<int>(nullable: true),
                    FourthQuarterAwayTeamScore = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BasketballMatchComponents", x => x.MatchID);
                    table.ForeignKey(
                        name: "FK_BasketballMatchComponents_Matches_MatchID",
                        column: x => x.MatchID,
                        principalTable: "Matches",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FootballMatchComponents",
                columns: table => new
                {
                    MatchID = table.Column<int>(nullable: false),
                    HalfTimeHomeTeamScore = table.Column<int>(nullable: true),
                    HalfTimeAwayTeamScore = table.Column<int>(nullable: true),
                    HomeTeamScore = table.Column<int>(nullable: true),
                    AwayTeamScore = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FootballMatchComponents", x => x.MatchID);
                    table.ForeignKey(
                        name: "FK_FootballMatchComponents_Matches_MatchID",
                        column: x => x.MatchID,
                        principalTable: "Matches",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "IceHockeyMatchComponents",
                columns: table => new
                {
                    MatchID = table.Column<int>(nullable: false),
                    FirstPeriodHomeTeamScore = table.Column<int>(nullable: true),
                    FirstPeriodAwayTeamScore = table.Column<int>(nullable: true),
                    SecondPeriodHomeTeamScore = table.Column<int>(nullable: true),
                    SecondPeriodAwayTeamScore = table.Column<int>(nullable: true),
                    ThirdPeriodHomeTeamScore = table.Column<int>(nullable: true),
                    ThirdPeriodAwayTeamScore = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IceHockeyMatchComponents", x => x.MatchID);
                    table.ForeignKey(
                        name: "FK_IceHockeyMatchComponents_Matches_MatchID",
                        column: x => x.MatchID,
                        principalTable: "Matches",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BasketballMatchComponents");

            migrationBuilder.DropTable(
                name: "FootballMatchComponents");

            migrationBuilder.DropTable(
                name: "IceHockeyMatchComponents");
        }
    }
}

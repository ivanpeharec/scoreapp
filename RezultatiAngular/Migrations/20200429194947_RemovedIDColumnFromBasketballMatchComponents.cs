using Microsoft.EntityFrameworkCore.Migrations;

namespace RezultatiAngular.Migrations
{
    public partial class RemovedIDColumnFromBasketballMatchComponents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ID",
                table: "BasketballMatchComponents");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ID",
                table: "BasketballMatchComponents",
                nullable: false,
                defaultValue: 0);
        }
    }
}

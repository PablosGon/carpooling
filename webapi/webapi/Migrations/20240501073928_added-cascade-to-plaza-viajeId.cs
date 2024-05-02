using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class addedcascadetoplazaviajeId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plazas_Viajes_ViajeId",
                table: "Plazas");

            migrationBuilder.AddForeignKey(
                name: "FK_Plazas_Viajes_ViajeId",
                table: "Plazas",
                column: "ViajeId",
                principalTable: "Viajes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plazas_Viajes_ViajeId",
                table: "Plazas");

            migrationBuilder.AddForeignKey(
                name: "FK_Plazas_Viajes_ViajeId",
                table: "Plazas",
                column: "ViajeId",
                principalTable: "Viajes",
                principalColumn: "Id");
        }
    }
}

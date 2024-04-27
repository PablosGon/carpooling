using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class addedpropertiestoViajeandNotificaciones : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Precio",
                table: "Viajes",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "ViajeId",
                table: "Notificacion",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Notificacion_ViajeId",
                table: "Notificacion",
                column: "ViajeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notificacion_Viajes_ViajeId",
                table: "Notificacion",
                column: "ViajeId",
                principalTable: "Viajes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notificacion_Viajes_ViajeId",
                table: "Notificacion");

            migrationBuilder.DropIndex(
                name: "IX_Notificacion_ViajeId",
                table: "Notificacion");

            migrationBuilder.DropColumn(
                name: "Precio",
                table: "Viajes");

            migrationBuilder.DropColumn(
                name: "ViajeId",
                table: "Notificacion");
        }
    }
}

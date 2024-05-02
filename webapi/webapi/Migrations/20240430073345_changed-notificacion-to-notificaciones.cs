using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class changednotificaciontonotificaciones : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notificacion_Usuarios_UsuarioId",
                table: "Notificacion");

            migrationBuilder.DropForeignKey(
                name: "FK_Notificacion_Viajes_ViajeId",
                table: "Notificacion");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Notificacion",
                table: "Notificacion");

            migrationBuilder.RenameTable(
                name: "Notificacion",
                newName: "Notificaciones");

            migrationBuilder.RenameIndex(
                name: "IX_Notificacion_ViajeId",
                table: "Notificaciones",
                newName: "IX_Notificaciones_ViajeId");

            migrationBuilder.RenameIndex(
                name: "IX_Notificacion_UsuarioId",
                table: "Notificaciones",
                newName: "IX_Notificaciones_UsuarioId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Notificaciones",
                table: "Notificaciones",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notificaciones_Usuarios_UsuarioId",
                table: "Notificaciones",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notificaciones_Viajes_ViajeId",
                table: "Notificaciones",
                column: "ViajeId",
                principalTable: "Viajes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notificaciones_Usuarios_UsuarioId",
                table: "Notificaciones");

            migrationBuilder.DropForeignKey(
                name: "FK_Notificaciones_Viajes_ViajeId",
                table: "Notificaciones");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Notificaciones",
                table: "Notificaciones");

            migrationBuilder.RenameTable(
                name: "Notificaciones",
                newName: "Notificacion");

            migrationBuilder.RenameIndex(
                name: "IX_Notificaciones_ViajeId",
                table: "Notificacion",
                newName: "IX_Notificacion_ViajeId");

            migrationBuilder.RenameIndex(
                name: "IX_Notificaciones_UsuarioId",
                table: "Notificacion",
                newName: "IX_Notificacion_UsuarioId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Notificacion",
                table: "Notificacion",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notificacion_Usuarios_UsuarioId",
                table: "Notificacion",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notificacion_Viajes_ViajeId",
                table: "Notificacion",
                column: "ViajeId",
                principalTable: "Viajes",
                principalColumn: "Id");
        }
    }
}

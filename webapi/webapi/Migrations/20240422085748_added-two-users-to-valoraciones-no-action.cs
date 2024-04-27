using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class addedtwouserstovaloracionesnoaction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Valoraciones_Usuarios_Id",
                table: "Valoraciones");

            migrationBuilder.DropForeignKey(
                name: "FK_Valoraciones_Usuarios_UsuarioId",
                table: "Valoraciones");

            migrationBuilder.RenameColumn(
                name: "UsuarioId",
                table: "Valoraciones",
                newName: "PasajeroId");

            migrationBuilder.RenameIndex(
                name: "IX_Valoraciones_UsuarioId",
                table: "Valoraciones",
                newName: "IX_Valoraciones_PasajeroId");

            migrationBuilder.AddColumn<int>(
                name: "ConductorId",
                table: "Valoraciones",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Valoraciones_ConductorId",
                table: "Valoraciones",
                column: "ConductorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Valoraciones_Usuarios_ConductorId",
                table: "Valoraciones",
                column: "ConductorId",
                principalTable: "Usuarios",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Valoraciones_Usuarios_PasajeroId",
                table: "Valoraciones",
                column: "PasajeroId",
                principalTable: "Usuarios",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Valoraciones_Usuarios_ConductorId",
                table: "Valoraciones");

            migrationBuilder.DropForeignKey(
                name: "FK_Valoraciones_Usuarios_PasajeroId",
                table: "Valoraciones");

            migrationBuilder.DropIndex(
                name: "IX_Valoraciones_ConductorId",
                table: "Valoraciones");

            migrationBuilder.DropColumn(
                name: "ConductorId",
                table: "Valoraciones");

            migrationBuilder.RenameColumn(
                name: "PasajeroId",
                table: "Valoraciones",
                newName: "UsuarioId");

            migrationBuilder.RenameIndex(
                name: "IX_Valoraciones_PasajeroId",
                table: "Valoraciones",
                newName: "IX_Valoraciones_UsuarioId");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Valoraciones",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddForeignKey(
                name: "FK_Valoraciones_Usuarios_Id",
                table: "Valoraciones",
                column: "Id",
                principalTable: "Usuarios",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Valoraciones_Usuarios_UsuarioId",
                table: "Valoraciones",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

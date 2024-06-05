using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class addedcascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Valoraciones_Usuarios_PasajeroId",
                table: "Valoraciones");

            migrationBuilder.DropForeignKey(
                name: "FK_Viajes_Centros_CentroId",
                table: "Viajes");

            migrationBuilder.DropForeignKey(
                name: "FK_Viajes_Nucleos_NucleoId",
                table: "Viajes");

            migrationBuilder.DropForeignKey(
                name: "FK_Viajes_Usuarios_ConductorId",
                table: "Viajes");

            migrationBuilder.AddForeignKey(
                name: "FK_Valoraciones_Usuarios_PasajeroId",
                table: "Valoraciones",
                column: "PasajeroId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Viajes_Centros_CentroId",
                table: "Viajes",
                column: "CentroId",
                principalTable: "Centros",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Viajes_Nucleos_NucleoId",
                table: "Viajes",
                column: "NucleoId",
                principalTable: "Nucleos",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Viajes_Usuarios_ConductorId",
                table: "Viajes",
                column: "ConductorId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Valoraciones_Usuarios_PasajeroId",
                table: "Valoraciones");

            migrationBuilder.DropForeignKey(
                name: "FK_Viajes_Centros_CentroId",
                table: "Viajes");

            migrationBuilder.DropForeignKey(
                name: "FK_Viajes_Nucleos_NucleoId",
                table: "Viajes");

            migrationBuilder.DropForeignKey(
                name: "FK_Viajes_Usuarios_ConductorId",
                table: "Viajes");

            migrationBuilder.AddForeignKey(
                name: "FK_Valoraciones_Usuarios_PasajeroId",
                table: "Valoraciones",
                column: "PasajeroId",
                principalTable: "Usuarios",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Viajes_Centros_CentroId",
                table: "Viajes",
                column: "CentroId",
                principalTable: "Centros",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Viajes_Nucleos_NucleoId",
                table: "Viajes",
                column: "NucleoId",
                principalTable: "Nucleos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Viajes_Usuarios_ConductorId",
                table: "Viajes",
                column: "ConductorId",
                principalTable: "Usuarios",
                principalColumn: "Id");
        }
    }
}

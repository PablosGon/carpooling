using System.Diagnostics.CodeAnalysis;

namespace webapi.DTOs
{
    public class PlazaDTO
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Correo { get; set; }
        public required string Telefono { get; set; }
        public string? ComentariosConductor { get; set; }
        public string? ComentariosPasajero { get; set; }
        public bool Aceptada { get; set; }
        public string? Imagen { get; set; }
        public int? UsuarioId { get; set; }
        public int ViajeId { get; set; }

    }
}

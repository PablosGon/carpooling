using System.Diagnostics.CodeAnalysis;

namespace webapi.DTOs
{
    public class PlazaDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = String.Empty;
        public string Correo { get; set; } = String.Empty;
        public string Telefono { get; set; } = String.Empty;
        public double LatitudRecogida { get; set; }
        public double LongitudRecogida { get; set; }
        public string ComentariosConductor { get; set; } = String.Empty;
        public string ComentariosPasajero { get; set; } = String.Empty;
        public bool Aceptada { get; set; }
        public string Imagen { get; set; } = String.Empty;
        public int? UsuarioId { get; set; }
        public int ViajeId { get; set; }

    }
}

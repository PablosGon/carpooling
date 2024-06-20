using System.Diagnostics.CodeAnalysis;

namespace webapi.DTOs
{
    public class ViajeDTO
    {
        public int Id { get; set; }
        public DateTime FechaYHora { get; set; }
        public int MaxPlazas { get; set; }
        public string? Comentarios { get; set; }
        public string? DescripcionCoche { get; set; }
        public bool IsVuelta { get; set; }
        public double Precio { get; set; }
        public required CentroDTO Centro { get; set; }
        public required NucleoDTO Nucleo { get; set; }
        public int ConductorId { get; set; }

    }
}

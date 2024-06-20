using System.Diagnostics.CodeAnalysis;

namespace webapi.DTOs
{
    public class UniversidadDTO
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public string? Imagen { get; set; }
    }
}

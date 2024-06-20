using System.Diagnostics.CodeAnalysis;
using webapi.Models;

namespace webapi.DTOs
{
    public class CentroDTO
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public string? Imagen { get; set; }
        public required UniversidadDTO Universidad { get; set; }
    }
}

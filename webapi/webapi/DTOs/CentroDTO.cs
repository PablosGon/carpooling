using System.Diagnostics.CodeAnalysis;
using webapi.Models;

namespace webapi.DTOs
{
    public class CentroDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = String.Empty;
        [AllowNull]
        public UniversidadDTO Universidad { get; set; }
    }
}

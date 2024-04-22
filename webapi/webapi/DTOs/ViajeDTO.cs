using System.Diagnostics.CodeAnalysis;

namespace webapi.DTOs
{
    public class ViajeDTO
    {
        public int Id { get; set; }
        public DateTime FechaYHora { get; set; }
        public int MaxPlazas { get; set; }
        public string Comentarios { get; set; } = String.Empty;
        public string DescripcionCoche { get; set; } = String.Empty;
        [AllowNull]
        public CentroDTO Centro { get; set; }
        [AllowNull]
        public NucleoDTO Nucleo { get; set; }
        [AllowNull]
        public UsuarioDTO Conductor { get; set; }

    }
}

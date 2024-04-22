using System.Diagnostics.CodeAnalysis;

namespace webapi.DTOs
{
    public class UsuarioDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = String.Empty;
        public string Correo { get; set; } = String.Empty;
        public string Telefono { get; set; } = String.Empty;
        public string Grado { get; set; } = String.Empty;
        public string Imagen { get; set; } = String.Empty;
        [AllowNull]
        public UniversidadDTO Universidad { get; set; }
        [AllowNull]
        public MunicipioDTO Municipio { get; set; }
    }
}

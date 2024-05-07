using System.Diagnostics.CodeAnalysis;

namespace webapi.DTOs
{
    public class UsuarioDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = String.Empty;
        public string Correo { get; set; } = String.Empty;
        public string Pass { get; set; } = String.Empty;
        public string Telefono { get; set; } = String.Empty;
        public string Grado { get; set; } = String.Empty;
        public string Imagen { get; set; } = String.Empty;
        public UniversidadDTO? Universidad { get; set; }
        public MunicipioDTO? Municipio { get; set; }
        public double ValoracionMedia { get; set; } = 0;
        public int NumValoraciones { get; set; } = 0;
        public int NotificacionesNoLeidas { get; set; } = 0;
    }
}

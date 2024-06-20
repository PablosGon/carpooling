using System.Diagnostics.CodeAnalysis;

namespace webapi.DTOs
{
    public class UsuarioDTO
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Correo { get; set; }
        public required string Pass { get; set; }
        public required string Telefono { get; set; }
        public string? Grado { get; set; }
        public string? Imagen { get; set; }
        public bool IsAdmin { get; set; } = false;
        public UniversidadDTO? Universidad { get; set; }
        public MunicipioDTO? Municipio { get; set; }
        public double ValoracionMedia { get; set; }
        public int NumValoraciones { get; set; }
        public int NotificacionesNoLeidas { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using webapi.DTOs;

namespace webapi.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = String.Empty;
        public string Correo { get; set; } = String.Empty;
        public string Telefono { get; set; } = String.Empty;
        [AllowNull]
        public string Imagen { get; set; } = String.Empty;
        [AllowNull]
        public string Grado { get; set; } = String.Empty;
        public Universidad Universidad { get; set; }
        [AllowNull]
        public int UniversidadId { get; set; }
        public Municipio Municipio { get; set; }
        [AllowNull]
        public int MunicipioId { get; set; }
        public ICollection<Valoracion> ValoracionesEnviadas { get; set; }
        public ICollection<Valoracion> ValoracionesRecibidas { get; set; }
        public ICollection<Plaza> Plazas { get; set; }
        public ICollection<Viaje> ViajesCreados { get; set; }

        public UsuarioDTO ToDTO()
        {
            return new UsuarioDTO
            {
                Id = Id,
                Nombre = Nombre,
                Correo = Correo,
                Telefono = Telefono,
                Grado = Grado,
                Imagen = Imagen,
                Municipio = Municipio.ToDTO(),
                Universidad = Universidad.ToDTO()
            };
        }
    }
}

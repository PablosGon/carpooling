using System.Diagnostics.CodeAnalysis;
using webapi.DTOs;

namespace webapi.Models
{
    public class Municipio
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = String.Empty;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        [AllowNull]
        public string Imagen { get; set; } = String.Empty;
        public ICollection<Nucleo> Nucleos { get; set; }
        public ICollection<Usuario> Usuarios { get; set; }

        public MunicipioDTO ToDTO()
        {
            return new MunicipioDTO
            {
                Id = Id,
                Nombre = Nombre,
                Imagen = Imagen
            };
        }
    }
}

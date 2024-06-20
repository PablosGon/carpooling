using webapi.DTOs;

namespace webapi.Models
{
    public class Municipio
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public string? Imagen { get; set; }
        public ICollection<Nucleo>? Nucleos { get; set; }
        public ICollection<Usuario>? Usuarios { get; set; }

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

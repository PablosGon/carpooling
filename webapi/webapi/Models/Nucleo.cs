using System.Diagnostics.CodeAnalysis;
using webapi.DTOs;

namespace webapi.Models
{
    public class Nucleo
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public Municipio? Municipio { get; set; }
        public int MunicipioId { get; set; }
        public string? Imagen { get; set; }
        public ICollection<Viaje>? Viajes { get; set; }

        public NucleoDTO ToDTO()
        {
            return new NucleoDTO
            {
                Id = Id,
                Nombre = Nombre,
                Imagen = Imagen,
                Municipio = Municipio!.ToDTO()
            };
        }
    }
}

using System.Diagnostics.CodeAnalysis;
using webapi.DTOs;

namespace webapi.Models
{
    public class Nucleo
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = String.Empty;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public Municipio Municipio { get; set; }
        public int MunicipioId { get; set; }
        [AllowNull]
        public string Imagen { get; set; } = String.Empty;
        public ICollection<Viaje> Viajes { get; set; }

        public NucleoDTO ToDTO()
        {
            return new NucleoDTO
            {
                Id = Id,
                Nombre = Nombre,
                Municipio = Municipio.ToDTO()
            };
        }
    }
}

using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;
using webapi.DTOs;

namespace webapi.Models
{
    public class Centro
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public Universidad Universidad { get; set; }
        public int UniversidadId { get; set; }
        public string Imagen { get; set; } = string.Empty;
        public ICollection<Viaje> Viajes { get; set; }

        public CentroDTO ToDTO()
        {
            return new CentroDTO
            {
                Id = Id,
                Nombre = Nombre,
                Universidad = Universidad.ToDTO(),
                Imagen = Imagen
            };
        }
    }
}

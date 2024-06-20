using webapi.DTOs;

namespace webapi.Models
{
    public class Centro
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public Universidad? Universidad { get; set; }
        public int UniversidadId { get; set; }
        public string? Imagen { get; set; }
        public ICollection<Viaje>? Viajes { get; set; }

        public CentroDTO ToDTO()
        {
            return new CentroDTO
            {
                Id = Id,
                Nombre = Nombre,
                Universidad = Universidad!.ToDTO(),
                Imagen = Imagen
            };
        }
    }
}

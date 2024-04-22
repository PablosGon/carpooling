using webapi.DTOs;

namespace webapi.Models
{
    public class Plaza
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = String.Empty;
        public string Correo { get; set; } = String.Empty;
        public string Telefono { get; set; } = String.Empty;
        public double LatitudeRecogida { get; set; }
        public double LongitudeRecogida { get; set; }
        public string ComentariosPasajero { get; set; } = String.Empty;
        public string ComentariosConductor { get; set; } = String.Empty;
        public bool Aceptada { get; set; }
        public Viaje Viaje { get; set; }
        public int ViajeId { get; set; }
        public Usuario Usuario { get; set; }
        public int UsuarioId { get; set; }

        public PlazaDTO ToDTO()
        {
            return new PlazaDTO
            {
                Id = Id,
                Nombre = Nombre,
                Correo = Correo,
                Telefono = Telefono,
                LatitudRecogida = LatitudeRecogida,
                LongitudRecogida = LongitudeRecogida,
                ComentariosPasajero = ComentariosPasajero,
                ComentariosConductor = ComentariosConductor
            };
        }
    }
}

using webapi.DTOs;

namespace webapi.Models
{
    public class Valoracion
    {
        public int Id { get; set; }
        public Usuario Pasajero { get; set; }
        public int PasajeroId { get; set; }
        public Usuario Conductor { get; set; }
        public int ConductorId { get; set; }
        public int Estrellas { get; set; }

        public ValoracionDTO ToDTO()
        {
            return new ValoracionDTO
            {
                Id = Id,
                Estrellas = Estrellas,
                ConductorId = ConductorId,
                PasajeroId = PasajeroId
            };
        }
    }
}

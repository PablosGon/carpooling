using webapi.DTOs;

namespace webapi.Models
{
    public class Viaje
    {
        public int Id { get; set; }
        public DateTime FechaYHora { get; set; }
        public int MaxPlazas { get; set; }
        public bool IsVuelta { get; set; }
        public string Comentarios { get; set; } = String.Empty;
        public string DescripcionCoche { get; set; } = String.Empty;
        public double Precio { get; set; }
        public Centro Centro { get; set; }
        public int CentroId { get; set; }
        public Nucleo Nucleo { get; set; }
        public int NucleoId { get; set; }
        public Usuario Conductor { get; set; }
        public int ConductorId { get; set; }
        public ICollection<Plaza> Plazas { get; set; }
        public ICollection<Notificacion> Notificaciones { get; set; }

        public ViajeDTO ToDTO()
        {
            return new ViajeDTO
            {
                Id = Id,
                Centro = Centro.ToDTO(),
                Comentarios = Comentarios,
                DescripcionCoche = DescripcionCoche,
                FechaYHora = FechaYHora,
                MaxPlazas = MaxPlazas,
                Nucleo = Nucleo.ToDTO(),
                Conductor = Conductor.ToDTO()
            };
        }
    }
}

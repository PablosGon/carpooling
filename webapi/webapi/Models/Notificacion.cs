using webapi.DTOs;

namespace webapi.Models
{
    public class Notificacion
    {
        public int Id { get; set; }
        public string Mensaje { get; set; } = String.Empty;
        public bool Leida { get; set; } = false;
        public Usuario Usuario { get; set; }
        public int UsuarioId { get; set; }
        public Viaje Viaje { get; set; }
        public int? ViajeId { get; set; }

        public NotificacionDTO ToDTO()
        {
            return new NotificacionDTO
            {
                Id = Id,
                Mensaje = Mensaje,
                Leida = Leida,
                UsuarioId = UsuarioId,
                ViajeId = ViajeId
            };
        }
    }
}

using webapi.DTOs;

namespace webapi.Models
{
    public class Plaza
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Correo { get; set; }
        public required string Telefono { get; set; }
        public string? ComentariosPasajero { get; set; }
        public string? ComentariosConductor { get; set; }
        public bool Aceptada { get; set; }
        public Viaje? Viaje { get; set; }
        public int ViajeId { get; set; }
        public Usuario? Usuario { get; set; }
        public int? UsuarioId { get; set; }

        public PlazaDTO ToDTO()
        {
            var img = "";
            if(Usuario != null)
            {
                img = Usuario.Imagen;
            }
            return new PlazaDTO
            {
                Id = Id,
                Nombre = Nombre,
                Correo = Correo,
                Telefono = Telefono,
                ComentariosPasajero = ComentariosPasajero,
                ComentariosConductor = ComentariosConductor,
                Aceptada = Aceptada,
                UsuarioId = UsuarioId,
                Imagen = img,
                ViajeId = ViajeId
            };
        }
    }
}

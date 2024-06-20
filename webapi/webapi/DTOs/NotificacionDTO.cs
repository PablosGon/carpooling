namespace webapi.DTOs
{
    public class NotificacionDTO
    {
        public int Id { get; set; }
        public required string Mensaje { get; set; }
        public bool Leida { get; set; }
        public int UsuarioId { get; set; }
        public int? ViajeId { get; set; }
    }
}

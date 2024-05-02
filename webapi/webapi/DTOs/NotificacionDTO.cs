namespace webapi.DTOs
{
    public class NotificacionDTO
    {
        public int Id { get; set; }
        public string Mensaje { get; set; } = string.Empty;
        public bool Leida { get; set; }
        public int UsuarioId { get; set; }
        public int? ViajeId { get; set; }
    }
}

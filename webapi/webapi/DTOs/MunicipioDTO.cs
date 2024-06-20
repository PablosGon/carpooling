namespace webapi.DTOs
{
    public class MunicipioDTO
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public string? Imagen { get; set; }
    }
}

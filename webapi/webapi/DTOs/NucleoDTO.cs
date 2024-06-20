namespace webapi.DTOs
{
    public class NucleoDTO
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public string? Imagen { get; set; }
        public required MunicipioDTO Municipio { get; set; }
    }
}

namespace webapi.DTOs
{
    public class NucleoDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = String.Empty;
        public string Imagen { get; set; } = String.Empty;
        public MunicipioDTO Municipio { get; set; }
    }
}

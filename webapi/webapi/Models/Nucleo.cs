namespace webapi.Models
{
    public class Nucleo
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public Municipio Municipio { get; set; }
        public int MunicipioId { get; set; }
        public ICollection<Viaje> Viajes { get; set; }
    }
}

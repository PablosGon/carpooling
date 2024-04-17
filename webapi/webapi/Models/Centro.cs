namespace webapi.Models
{
    public class Centro
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public Universidad Universidad { get; set; }
        public int UniversidadId { get; set; }
        public ICollection<Viaje> Viajes { get; set; }
    }
}

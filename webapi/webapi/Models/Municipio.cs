namespace webapi.Models
{
    public class Municipio
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public ICollection<Nucleo> Nucleos { get; set; }
        public ICollection<Usuario> Usuarios { get; set; }
    }
}

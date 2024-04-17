namespace webapi.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Correo { get; set; }
        public string Telefono { get; set; }
        public string Grado { get; set; }
        public Universidad Universidad { get; set; }
        public int UniversidadId { get; set; }
        public Municipio Municipio { get; set; }
        public int MunicipioId { get; set; }
        public ICollection<Valoracion> ValoracionesEnviadas { get; set; }
        public ICollection<Valoracion> ValoracionesRecibidas { get; set; }
        public ICollection<Plaza> Plazas { get; set; }
        public ICollection<Viaje> ViajesCreados { get; set; }
    }
}

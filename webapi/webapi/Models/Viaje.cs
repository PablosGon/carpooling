namespace webapi.Models
{
    public class Viaje
    {
        public int Id { get; set; }
        public DateTime FechaYHora { get; set; }
        public int MaxPlazas { get; set; }
        public bool IsVuelta { get; set; }
        public string Comentarios { get; set; }
        public string DescripcionCoche { get; set; }
        public Centro Centro { get; set; }
        public int CentroId { get; set; }
        public Nucleo Nucleo { get; set; }
        public int NucleoId { get; set; }
        public Usuario Conductor { get; set; }
        public int ConductorId { get; set; }
        public ICollection<Plaza> Plazas { get; set; }
    }
}

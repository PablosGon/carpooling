namespace webapi.Models
{
    public class Universidad
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public ICollection<Centro> Centros { get; set; }
        public ICollection<Usuario> Usuarios { get; set; }
    }
}

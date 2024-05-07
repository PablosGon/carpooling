using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using webapi.DTOs;

namespace webapi.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = String.Empty;
        public string Correo { get; set; } = String.Empty;
        public string Pass { get; set; } = String.Empty;
        public string Telefono { get; set; } = String.Empty;
        public string Imagen { get; set; } = String.Empty;
        public string Grado { get; set; } = String.Empty;
        public Universidad? Universidad { get; set; }
        public int? UniversidadId { get; set; }
        public Municipio? Municipio { get; set; }
        public int? MunicipioId { get; set; }
        public ICollection<Valoracion> ValoracionesEnviadas { get; set; }
        public ICollection<Valoracion> ValoracionesRecibidas { get; set; }
        public ICollection<Plaza> Plazas { get; set; }
        public ICollection<Viaje> ViajesCreados { get; set; }
        public ICollection<Notificacion> Notificaciones { get; set; }

        public UsuarioDTO ToDTO()
        {
            return new UsuarioDTO
            {
                Id = Id,
                Nombre = Nombre,
                Correo = Correo,
                Pass = Pass,
                Telefono = Telefono,
                Grado = Grado,
                Imagen = Imagen,
                Municipio = this.Municipio != null ? Municipio.ToDTO() : null,
                Universidad = this.Universidad != null ? Universidad.ToDTO() : null,
                NumValoraciones = ValoracionesRecibidas.Count(),
                ValoracionMedia = getValoracionMedia(),
                NotificacionesNoLeidas = Notificaciones != null ? Notificaciones.Where(x => !x.Leida).Count() : 0,
            };
        }

        private double getValoracionMedia()
        {
            if(ValoracionesRecibidas.Count() <= 0)
            {
                return 0;
            }

            double res = 0;
            foreach(var v in ValoracionesRecibidas)
            {
                res += v.Estrellas;
            }
            res /= ValoracionesRecibidas.Count();
            return res;
        }
    }
}

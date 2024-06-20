using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using webapi.DTOs;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViajesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ViajesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Viajes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ViajeDTO>>> GetViajes(
            [FromQuery] bool? isVuelta, 
            [FromQuery] DateTime? fechaHora, 
            [FromQuery] int? nucleoId, 
            [FromQuery] int? centroId, 
            [FromQuery] int? conductorId, 
            [FromQuery] int? universidadId, 
            [FromQuery] int? municipioId,
            [FromQuery] bool? onlyUpcoming,
            [FromQuery] int? pasajeroId
        )
        {
            List<Viaje> res = await _context.Viajes.OrderBy(x => x.FechaYHora).ToListAsync(); ;

            List<ViajeDTO> list = new List<ViajeDTO>();

            if(isVuelta.HasValue)
            {
                res = res.Where(x => x.IsVuelta == isVuelta).ToList();
            }

            if (fechaHora.HasValue)
            {
                res = res.Where(x => x.FechaYHora.Date.Equals(fechaHora.Value.Date)).ToList();
            }

            if (nucleoId.HasValue)
            {
                res = res.Where(x => x.NucleoId == nucleoId).ToList();
            } else if(municipioId.HasValue)
            {
                var nucleos = await _context.Nucleos.Where(c => c.MunicipioId == municipioId).ToListAsync();
                res = res.Where(x => nucleos.Exists(n => n.Id == x.NucleoId)).ToList();
            }

            if (centroId.HasValue)
            {
                res = res.Where(x => x.CentroId == centroId).ToList();
            } else if (universidadId.HasValue)
            {
                var centros = await _context.Centros.Where(c => c.UniversidadId == universidadId).ToListAsync();
                res = res.Where(x => centros.Exists(c => c.Id == x.CentroId)).ToList();
            }

            if(conductorId.HasValue)
            {
                res = res.Where(x => x.ConductorId == conductorId).ToList();
            }

            if (onlyUpcoming.HasValue && onlyUpcoming.Value)
            {
                res = res.Where(x => x.FechaYHora > DateTime.UtcNow).ToList();
            }

            if (pasajeroId.HasValue)
            {
                var plazas = _context.Plazas.ToList();
                res = res.Where(x => !plazas.Where(y => y.ViajeId == x.Id && y.UsuarioId == pasajeroId.Value).IsNullOrEmpty()).ToList();
            }

            foreach (Viaje viaje in res)
            {
                viaje.Centro = _context.Centros.FindAsync(viaje.CentroId).Result!;
                viaje.Centro.Universidad = _context.Universidades.FindAsync(viaje.Centro.UniversidadId).Result!;
                viaje.Nucleo = _context.Nucleos.FindAsync(viaje.NucleoId).Result!;
                viaje.Nucleo.Municipio = _context.Municipios.FindAsync(viaje.Nucleo.MunicipioId).Result!;
                viaje.Conductor = _context.Usuarios.FindAsync(viaje.ConductorId).Result!;
                viaje.Conductor.ValoracionesRecibidas = _context.Valoraciones.Where(x => x.ConductorId == viaje.ConductorId).ToList();
                viaje.Plazas = _context.Plazas.Where(x => x.ViajeId == viaje.Id).ToList();
                list.Add(viaje.ToDTO());
            }

            return list;
        }

        // GET: api/Viajes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ViajeDTO>> GetViaje(int id)
        {
            var viaje = await _context.Viajes.FindAsync(id);

            if (viaje == null)
            {
                return NotFound();
            }

            viaje.Centro = _context.Centros.FindAsync(viaje.CentroId).Result!;
            viaje.Centro.Universidad = _context.Universidades.FindAsync(viaje.Centro.UniversidadId).Result!;
            viaje.Nucleo = _context.Nucleos.FindAsync(viaje.NucleoId).Result!;
            viaje.Nucleo.Municipio = _context.Municipios.FindAsync(viaje.Nucleo.MunicipioId).Result!;
            viaje.Conductor = _context.Usuarios.FindAsync(viaje.ConductorId).Result!;
            viaje.Conductor.ValoracionesRecibidas = _context.Valoraciones.Where(x => x.ConductorId == viaje.ConductorId).ToList();

            return viaje.ToDTO();
        }

        // PUT: api/Viajes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutViaje(int id, ViajeDTO viajeDTO)
        {
            var viaje = new Viaje
            {
                Id = id,
                FechaYHora = viajeDTO.FechaYHora,
                MaxPlazas = viajeDTO.MaxPlazas,
                Comentarios = viajeDTO.Comentarios,
                DescripcionCoche = viajeDTO.DescripcionCoche,
                CentroId = viajeDTO.Centro.Id,
                NucleoId = viajeDTO.Nucleo.Id,
                ConductorId = viajeDTO.ConductorId,
                IsVuelta = viajeDTO.IsVuelta,
                Precio = viajeDTO.Precio,
            };

            _context.Entry(viaje).State = EntityState.Modified;

            SendNotifications("Un viaje en el que tenías plaza ha sido MODIFICADO (click para ver)", id, true);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ViajeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Viajes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ViajeDTO>> PostViaje(ViajeDTO viajeDTO)
        {
            var viaje = new Viaje
            {
                FechaYHora = viajeDTO.FechaYHora,
                MaxPlazas = viajeDTO.MaxPlazas,
                Comentarios = viajeDTO.Comentarios,
                DescripcionCoche = viajeDTO.DescripcionCoche,
                CentroId = viajeDTO.Centro.Id,
                NucleoId = viajeDTO.Nucleo.Id,
                ConductorId = viajeDTO.ConductorId,
                IsVuelta = viajeDTO.IsVuelta,
                Precio = viajeDTO.Precio
            };

            _context.Viajes.Add(viaje);
            await _context.SaveChangesAsync();

            viajeDTO.Id = viaje.Id;

            return CreatedAtAction("GetViaje", new { id = viaje.Id }, viajeDTO);
        }

        // DELETE: api/Viajes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteViaje(int id)
        {
            var viaje = await _context.Viajes.FindAsync(id);
            if (viaje == null)
            {
                return NotFound();
            }


            SendNotifications("Un viaje en el que tenías plaza ha sido ELIMINADO", id, false);

            _context.Viajes.Remove(viaje);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ViajeExists(int id)
        {
            return _context.Viajes.Any(e => e.Id == id);
        }

        private void SendNotifications(string text, int id, bool includeViaje)
        {
            var pasajeros = _context.Plazas.Where(x => x.ViajeId == id && x.Aceptada);

            foreach (var p in pasajeros)
            {
                if (p.UsuarioId != null)
                {
                    var notificacion = new Notificacion
                    {
                        Mensaje = text,
                        UsuarioId = p.UsuarioId.Value
                    };
                    if (includeViaje) notificacion.ViajeId = id;
                    _context.Notificaciones.Add(notificacion);
                }
            }

        }

        private double distanceFromTo(double latFrom, double lonFrom, double latTo, double lonTo)
        {
            return Math.Sqrt(Math.Abs(Math.Pow(latFrom - latTo, 2) - Math.Pow(lonFrom - lonTo, 2)));
        }
    }
}

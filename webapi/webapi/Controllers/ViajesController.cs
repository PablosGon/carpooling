using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<ActionResult<IEnumerable<ViajeDTO>>> GetViajes([FromQuery] bool? isVuelta, [FromQuery] DateTime? fechaHora, [FromQuery] int? nucleoId, [FromQuery] int? centroId, [FromQuery] int? conductorId)
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
            }

            if (centroId.HasValue)
            {
                res = res.Where(x => x.CentroId == centroId).ToList();
            }

            if(conductorId.HasValue)
            {
                res = res.Where(x => x.ConductorId == conductorId).ToList();
            }

            foreach (Viaje viaje in res)
            {
                viaje.Centro = _context.Centros.FindAsync(viaje.CentroId).Result!;
                viaje.Centro.Universidad = _context.Universidades.FindAsync(viaje.Centro.UniversidadId).Result!;
                viaje.Nucleo = _context.Nucleos.FindAsync(viaje.NucleoId).Result!;
                viaje.Nucleo.Municipio = _context.Municipios.FindAsync(viaje.Nucleo.MunicipioId).Result!;
                viaje.Conductor = _context.Usuarios.FindAsync(viaje.ConductorId).Result!;
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
                ConductorId = viajeDTO.Conductor.Id,
                IsVuelta = viajeDTO.IsVuelta,
                Precio = viajeDTO.Precio,
            };

            _context.Entry(viaje).State = EntityState.Modified;

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
                ConductorId = viajeDTO.Conductor.Id,
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

            _context.Viajes.Remove(viaje);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ViajeExists(int id)
        {
            return _context.Viajes.Any(e => e.Id == id);
        }

        private double distanceFromTo(double latFrom, double lonFrom, double latTo, double lonTo)
        {
            return Math.Sqrt(Math.Abs(Math.Pow(latFrom - latTo, 2) - Math.Pow(lonFrom - lonTo, 2)));
        }
    }
}

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
    public class ValoracionesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ValoracionesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Valoraciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ValoracionDTO>>> GetValoraciones([FromQuery] int? conductorId, [FromQuery] int? pasajeroId)
        {
            var res = new List<Valoracion>();

            if(conductorId != null && pasajeroId != null)
            {
                res = await _context.Valoraciones.Where(x => x.ConductorId == conductorId && x.PasajeroId == pasajeroId).ToListAsync();
            } else
            {
                res = await _context.Valoraciones.ToListAsync();
            }

            

            List<ValoracionDTO> list = new List<ValoracionDTO>();
            foreach (Valoracion v in res)
            {
                list.Add(v.ToDTO());
            }

            return list;
        }

        // GET: api/Valoraciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ValoracionDTO>> GetValoracion(int id)
        {
            var valoracion = await _context.Valoraciones.FindAsync(id);

            if (valoracion == null)
            {
                return NotFound();
            }

            return valoracion.ToDTO();
        }

        // PUT: api/Valoraciones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutValoracion(int id, ValoracionDTO valoracionDTO)
        {
            var valoracion = new Valoracion
            {
                Id = id,
                ConductorId = valoracionDTO.ConductorId,
                PasajeroId = valoracionDTO.PasajeroId,
                Estrellas = valoracionDTO.Estrellas
            };

            _context.Entry(valoracion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ValoracionExists(id))
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

        // POST: api/Valoraciones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ValoracionDTO>> PostValoracion(ValoracionDTO valoracionDTO)
        {
            var valoracion = new Valoracion
            {
                ConductorId = valoracionDTO.ConductorId,
                PasajeroId = valoracionDTO.PasajeroId,
                Estrellas = valoracionDTO.Estrellas
            };

            _context.Valoraciones.Add(valoracion);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ValoracionExists(valoracion.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            valoracionDTO.Id = valoracion.Id;

            return CreatedAtAction("GetValoracion", new { id = valoracion.Id }, valoracionDTO);
        }

        // DELETE: api/Valoraciones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteValoracion(int id)
        {
            var valoracion = await _context.Valoraciones.FindAsync(id);
            if (valoracion == null)
            {
                return NotFound();
            }

            _context.Valoraciones.Remove(valoracion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ValoracionExists(int id)
        {
            return _context.Valoraciones.Any(e => e.Id == id);
        }
    }
}

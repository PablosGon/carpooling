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
    public class UniversidadesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UniversidadesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Universidads
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UniversidadDTO>>> GetUniversidades()
        {
            var res = await _context.Universidades.ToListAsync();

            List<UniversidadDTO> list = new List<UniversidadDTO>();

            foreach (Universidad u in res)
            {
                list.Add(u.ToDTO());
            }

            return list;
        }

        // GET: api/Universidads/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UniversidadDTO>> GetUniversidad(int id)
        {
            var universidad = await _context.Universidades.FindAsync(id);

            if (universidad == null)
            {
                return NotFound();
            }

            return universidad.ToDTO();
        }

        // PUT: api/Universidads/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUniversidad(int id, UniversidadDTO universidadDTO)
        {

            var universidad = new Universidad
            {
                Id = id,
                Nombre = universidadDTO.Nombre,
                Imagen = universidadDTO.Imagen
            };

            _context.Entry(universidad).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UniversidadExists(id))
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

        // POST: api/Universidads
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UniversidadDTO>> PostUniversidad(UniversidadDTO universidadDTO)
        {

            var universidad = new Universidad
            {
                Nombre = universidadDTO.Nombre,
                Imagen = universidadDTO.Imagen
            };

            _context.Universidades.Add(universidad);
            await _context.SaveChangesAsync();

            universidadDTO.Id = universidad.Id;

            return CreatedAtAction("GetUniversidad", new { id = universidad.Id }, universidadDTO);
        }

        // DELETE: api/Universidads/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUniversidad(int id)
        {
            var universidad = await _context.Universidades.FindAsync(id);
            if (universidad == null)
            {
                return NotFound();
            }

            _context.Universidades.Remove(universidad);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UniversidadExists(int id)
        {
            return _context.Universidades.Any(e => e.Id == id);
        }
    }
}

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
    public class MunicipiosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MunicipiosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Municipios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MunicipioDTO>>> GetMunicipios()
        {
            var res = await _context.Municipios.ToListAsync();

            List<MunicipioDTO> list = new List<MunicipioDTO>();

            foreach (Municipio m in res)
            {
                list.Add(m.ToDTO());
            }

            return list;
        }

        // GET: api/Municipios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MunicipioDTO>> GetMunicipio(int id)
        {
            var municipio = await _context.Municipios.FindAsync(id);

            if (municipio == null)
            {
                return NotFound();
            }

            return municipio.ToDTO();
        }

        // PUT: api/Municipios/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMunicipio(int id, MunicipioDTO municipioDTO)
        {

            var municipio = new Municipio
            {
                Id = id,
                Nombre = municipioDTO.Nombre,
                Imagen = municipioDTO.Imagen
            };

            _context.Entry(municipio).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MunicipioExists(id))
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

        // POST: api/Municipios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MunicipioDTO>> PostMunicipio(MunicipioDTO municipioDTO)
        {

            var municipio = new Municipio
            {
                Nombre = municipioDTO.Nombre,
                Imagen = municipioDTO.Imagen
            };

            _context.Municipios.Add(municipio);
            await _context.SaveChangesAsync();

            municipioDTO.Id = municipio.Id;

            return CreatedAtAction("GetMunicipio", new { id = municipio.Id }, municipioDTO);
        }

        // DELETE: api/Municipios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMunicipio(int id)
        {
            var municipio = await _context.Municipios.FindAsync(id);
            if (municipio == null)
            {
                return NotFound();
            }

            _context.Municipios.Remove(municipio);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MunicipioExists(int id)
        {
            return _context.Municipios.Any(e => e.Id == id);
        }
    }
}

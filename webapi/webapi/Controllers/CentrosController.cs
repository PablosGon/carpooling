using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using webapi.DTOs;
using webapi.Models;
using webapi.Settings;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CentrosController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly Cloudinary _cloudinary;

        public CentrosController(AppDbContext context, IOptions<CloudinarySettings> config)
        {
            _context = context;
            var account = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);
            _cloudinary = new Cloudinary(account);
        }

        // GET: api/Centros
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CentroDTO>>> GetCentros([FromQuery] int? universidadId)
        {
            List<Centro> res;
            List<CentroDTO> centroDTOs = new List<CentroDTO>();

            if(universidadId != null)
            {
                res = await _context.Centros.Where(x => x.UniversidadId == universidadId).ToListAsync();
            }
            else
            {
                res = await _context.Centros.ToListAsync();
            }

            foreach (Centro centro in res)
            {
                centro.Universidad = _context.Universidades.FindAsync(centro.UniversidadId).Result!;
                centroDTOs.Add(centro.ToDTO());
            }

            return centroDTOs;
        }

        // GET: api/Centros/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CentroDTO>> GetCentro(int id)
        {
            var centro = await _context.Centros.FindAsync(id);

            if (centro == null)
            {
                return NotFound();
            }

            centro.Universidad = _context.Universidades.FindAsync(centro.UniversidadId).Result!;
            return centro.ToDTO();
        }

        // PUT: api/Centros/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCentro(int id, CentroDTO centroDTO)
        {

            var centro = new Centro
            {
                Id = id,
                Nombre = centroDTO.Nombre,
                UniversidadId = centroDTO.Universidad.Id,
                Imagen = centroDTO.Imagen
            };

            _context.Entry(centro).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CentroExists(id))
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

        // POST: api/Centros
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CentroDTO>> PostCentro(CentroDTO centroDTO)
        {
            var centro = new Centro
            {
                Id = centroDTO.Id,
                Nombre = centroDTO.Nombre,
                UniversidadId = centroDTO.Universidad.Id,
                Imagen = centroDTO.Imagen
            };

            _context.Centros.Add(centro);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CentroExists(centro.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            centroDTO.Id = centro.Id;

            return CreatedAtAction("GetCentro", new { id = centro.Id }, centroDTO);
        }

        // DELETE: api/Centros/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCentro(int id)
        {
            var centro = await _context.Centros.FindAsync(id);
            if (centro == null)
            {
                return NotFound();
            }

            _context.Centros.Remove(centro);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CentroExists(int id)
        {
            return _context.Centros.Any(e => e.Id == id);
        }

    }
}

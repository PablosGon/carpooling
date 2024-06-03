using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.DTOs;
using webapi.Models;
using Microsoft.Extensions.Options;
using webapi.Settings;
using Microsoft.IdentityModel.Tokens;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UniversidadesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly Cloudinary _cloudinary;

        public UniversidadesController(AppDbContext context, IOptions<CloudinarySettings> config)
        {
            _context = context;
            var account = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);
            _cloudinary = new Cloudinary(account);
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
            var u = _context.Universidades.Find(id);

            if(u == null)
            {
                return NotFound("Universidad no encontrada");
            }

            if (!universidadDTO.Imagen.IsNullOrEmpty() && universidadDTO.Imagen != u.Imagen)
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(filePath: universidadDTO.Imagen),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);
                await _cloudinary.DeleteResourcesAsync(u.Imagen);

                universidadDTO.Imagen = uploadResult.PublicId;
            }

            if (!universidadDTO.Nombre.IsNullOrEmpty()) u.Nombre = universidadDTO.Nombre;
            if (!universidadDTO.Imagen.IsNullOrEmpty()) u.Imagen = universidadDTO.Imagen;

            _context.Entry(u).State = EntityState.Modified;

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

        [HttpPut("{id}/deletePicture")]
        public async Task<IActionResult> DeletePicture(int id)
        {
            var u = await _context.Universidades.FindAsync(id);

            if (u == null)
            {
                return NotFound("No se ha encontrado la universidad");
            }

            await _cloudinary.DeleteResourcesAsync(u.Imagen);
            u.Imagen = "";

            _context.Entry(u).State = EntityState.Modified;

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
            if (!universidadDTO.Imagen.IsNullOrEmpty())
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(filePath: universidadDTO.Imagen),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                universidadDTO.Imagen = uploadResult.PublicId;
            }
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

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using webapi.DTOs;
using webapi.Models;
using webapi.Settings;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MunicipiosController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly Cloudinary _cloudinary;

        public MunicipiosController(AppDbContext context, IOptions<CloudinarySettings> config)
        {
            _context = context;
            var account = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);
            _cloudinary = new Cloudinary(account);
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
            if (!municipioDTO.Imagen.IsNullOrEmpty())
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(filePath: municipioDTO.Imagen),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                municipioDTO.Imagen = uploadResult.PublicId;
            }

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
            if (!municipioDTO.Imagen.IsNullOrEmpty())
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(filePath: municipioDTO.Imagen),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                municipioDTO.Imagen = uploadResult.PublicId;
            }

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

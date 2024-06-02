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
    public class NucleosController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly Cloudinary _cloudinary;

        public NucleosController(AppDbContext context, IOptions<CloudinarySettings> config)
        {
            _context = context;
            var account = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);
            _cloudinary = new Cloudinary(account);
        }

        // GET: api/Nucleos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NucleoDTO>>> GetNucleos([FromQuery] int? municipioId)
        {
            List<Nucleo> res;

            List<NucleoDTO> list = new List<NucleoDTO>();

            if(municipioId != null)
            {
                res = await _context.Nucleos.Where(x => x.MunicipioId == municipioId).ToListAsync();
            }
            else
            {
                res = await _context.Nucleos.ToListAsync();
            }

            foreach (Nucleo n in res)
            {
                n.Municipio = _context.Municipios.FindAsync(n.MunicipioId).Result!;
                list.Add(n.ToDTO());
            }

            return list;
        }

        // GET: api/Nucleos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NucleoDTO>> GetNucleo(int id)
        {
            var nucleo = await _context.Nucleos.FindAsync(id);

            if (nucleo == null)
            {
                return NotFound();
            }

            nucleo.Municipio = _context.Municipios.FindAsync(nucleo.MunicipioId).Result!;

            return nucleo.ToDTO();
        }

        // PUT: api/Nucleos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNucleo(int id, NucleoDTO nucleoDTO)
        {
            var n = _context.Nucleos.Find(id);

            if(n == null)
            {
                return NotFound("Núcleo no encontrado");
            }

            if (!nucleoDTO.Imagen.IsNullOrEmpty() && nucleoDTO.Imagen != n.Imagen)
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(filePath: nucleoDTO.Imagen),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);
                await _cloudinary.DeleteResourcesAsync(n.Imagen);

                nucleoDTO.Imagen = uploadResult.PublicId;
            }

            if(!nucleoDTO.Nombre.IsNullOrEmpty()) n.Nombre = nucleoDTO.Nombre;
            if(nucleoDTO.Municipio.Id != 0) n.MunicipioId = nucleoDTO.Municipio.Id;
            if(!nucleoDTO.Imagen.IsNullOrEmpty()) n.Imagen = nucleoDTO.Imagen;

            _context.Entry(n).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NucleoExists(id))
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

        // POST: api/Nucleos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<NucleoDTO>> PostNucleo(NucleoDTO nucleoDTO)
        {
            if (!nucleoDTO.Imagen.IsNullOrEmpty())
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(filePath: nucleoDTO.Imagen),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                nucleoDTO.Imagen = uploadResult.PublicId;
            }

            var nucleo = new Nucleo
            {
                Nombre = nucleoDTO.Nombre,
                MunicipioId = nucleoDTO.Municipio.Id,
                Imagen = nucleoDTO.Imagen
            };

            _context.Nucleos.Add(nucleo);
            await _context.SaveChangesAsync();

            nucleoDTO.Id = nucleo.Id;

            return CreatedAtAction("GetNucleo", new { id = nucleo.Id }, nucleoDTO);
        }

        // DELETE: api/Nucleos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNucleo(int id)
        {
            var nucleo = await _context.Nucleos.FindAsync(id);
            if (nucleo == null)
            {
                return NotFound();
            }

            _context.Nucleos.Remove(nucleo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NucleoExists(int id)
        {
            return _context.Nucleos.Any(e => e.Id == id);
        }
    }
}

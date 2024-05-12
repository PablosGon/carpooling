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
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> GetUsuarios([FromQuery] string? correo, [FromQuery] string? pass)
        {
            var res = new List<Usuario>();

            if(correo != null && pass != null)
            {
                res = await _context.Usuarios.Where(x => x.Correo == correo && x.Pass == pass).ToListAsync();
            }
            else
            {
                res = await _context.Usuarios.ToListAsync();
            }


            List<UsuarioDTO> list = new List<UsuarioDTO>();

            foreach (Usuario u in res)
            {
                u.Municipio = _context.Municipios.FindAsync(u.MunicipioId).Result!;
                u.Universidad = _context.Universidades.FindAsync(u.UniversidadId).Result!;
                u.ValoracionesRecibidas = _context.Valoraciones.Where(x => x.ConductorId == u.Id).ToList();
                list.Add(u.ToDTO());
            }

            return list;
        }

        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioDTO>> GetUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            usuario.Municipio = _context.Municipios.FindAsync(usuario.MunicipioId).Result!;
            usuario.Universidad = _context.Universidades.FindAsync(usuario.UniversidadId).Result!;
            usuario.ValoracionesRecibidas = _context.Valoraciones.Where(x => x.ConductorId == id).ToList();
            usuario.Notificaciones = _context.Notificaciones.Where(x => x.UsuarioId == id).ToList();

            return usuario.ToDTO();
        }

        // PUT: api/Usuarios/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, UsuarioDTO usuarioDTO)
        {
            var usuario = new Usuario
            {
                Id = id,
                Nombre = usuarioDTO.Nombre,
                Correo = usuarioDTO.Correo,
                Pass = usuarioDTO.Pass,
                Telefono = usuarioDTO.Telefono,
                Grado = usuarioDTO.Grado,
                Imagen = usuarioDTO.Imagen,
                IsAdmin = usuarioDTO.IsAdmin,
                UniversidadId = usuarioDTO.Universidad != null ? usuarioDTO.Universidad.Id : null,
                MunicipioId = usuarioDTO.Municipio != null ? usuarioDTO.Municipio.Id : null,
            };

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
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

        // POST: api/Usuarios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UsuarioDTO>> PostUsuario(UsuarioDTO usuarioDTO)
        {
            var res = await _context.Usuarios.Where(x => x.Correo == usuarioDTO.Correo || x.Telefono == usuarioDTO.Telefono).ToListAsync();

            if (res.Count() > 0)
            {
                return BadRequest();
            }

            var usuario = new Usuario
            {
                Nombre = usuarioDTO.Nombre,
                Correo = usuarioDTO.Correo,
                Pass = usuarioDTO.Pass,
                Telefono = usuarioDTO.Telefono,
                Grado = usuarioDTO.Grado,
                Imagen = usuarioDTO.Imagen,
                IsAdmin = usuarioDTO.IsAdmin,
                UniversidadId = usuarioDTO.Universidad != null ? usuarioDTO.Universidad.Id : null,
                MunicipioId = usuarioDTO.Municipio != null ? usuarioDTO.Municipio.Id : null,
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            usuarioDTO.Id = usuarioDTO.Id;

            return CreatedAtAction("GetUsuario", new { id = usuario.Id }, usuarioDTO);
        }

        // DELETE: api/Usuarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}/readNotifications")]
        public async Task<IActionResult> ReadNotifications(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            var notificaciones = _context.Notificaciones.Where(x => x.UsuarioId == id && !x.Leida);

            foreach(var n in notificaciones)
            {
                n.Leida = true;
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

        private bool UsuarioExists(int id)
        {
            return _context.Usuarios.Any(e => e.Id == id);
        }
    }
}

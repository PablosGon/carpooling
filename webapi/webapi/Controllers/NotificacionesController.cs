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
    public class NotificacionesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NotificacionesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Notificaciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotificacionDTO>>> GetNotificacion([FromQuery] int? usuarioId)
        {
            var res = await _context.Notificaciones.ToListAsync();
            List<NotificacionDTO> list = new List<NotificacionDTO>();

            if (usuarioId.HasValue)
            {
                res = res.Where(x => x.UsuarioId == usuarioId.Value).ToList();
            }

            foreach (Notificacion n in res)
            {
                list.Add(n.ToDTO());
            }

            return list;
        }

        // GET: api/Notificaciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NotificacionDTO>> GetNotificacion(int id)
        {
            var notificacion = await _context.Notificaciones.FindAsync(id);

            if (notificacion == null)
            {
                return NotFound();
            }

            return notificacion.ToDTO();
        }

        // PUT: api/Notificaciones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNotificacion(int id, NotificacionDTO notificacionDTO)
        {
            var notificacion = new Notificacion
            {
                Id = id,
                Mensaje = notificacionDTO.Mensaje,
                Leida = notificacionDTO.Leida,
                UsuarioId = notificacionDTO.UsuarioId,
                ViajeId = notificacionDTO.ViajeId
            };

            _context.Entry(notificacion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotificacionExists(id))
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

        // POST: api/Notificaciones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<NotificacionDTO>> PostNotificacion(NotificacionDTO notificacionDTO)
        {
            var notificacion = new Notificacion
            {
                Mensaje = notificacionDTO.Mensaje,
                Leida = notificacionDTO.Leida,
                UsuarioId = notificacionDTO.UsuarioId,
                ViajeId = notificacionDTO.ViajeId
            };

            _context.Notificaciones.Add(notificacion);
            await _context.SaveChangesAsync();

            notificacionDTO.Id = notificacion.Id;

            return CreatedAtAction("GetNotificacion", new { id = notificacion.Id }, notificacionDTO);
        }

        // DELETE: api/Notificaciones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotificacion(int id)
        {
            var notificacion = await _context.Notificaciones.FindAsync(id);
            if (notificacion == null)
            {
                return NotFound();
            }

            _context.Notificaciones.Remove(notificacion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NotificacionExists(int id)
        {
            return _context.Notificaciones.Any(e => e.Id == id);
        }
    }
}

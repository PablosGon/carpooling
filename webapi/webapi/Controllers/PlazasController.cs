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
    public class PlazasController : ControllerBase
    {
        private readonly AppDbContext _context;

        private const string NOTIFICATION_ACCEPTED = "Se ha aceptado tu solicitud de plaza.";

        public PlazasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Plazas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlazaDTO>>> GetPlazas([FromQuery] int? viajeId)
        {
            List<Plaza> res;

            List<PlazaDTO> list = new List<PlazaDTO>();

            if(viajeId != null)
            {
                res = await _context.Plazas.Where(x => x.ViajeId == viajeId).ToListAsync();
            } 
            else
            {
                res = await _context.Plazas.ToListAsync();
            }

            foreach(Plaza p in res)
            {
                p.Usuario = _context.Usuarios.FindAsync(p.UsuarioId).Result!;
                list.Add(p.ToDTO());
            }

            return Ok(list);
        }

        // GET: api/Plazas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlazaDTO>> GetPlaza(int id)
        {
            var plaza = await _context.Plazas.FindAsync(id);

            if (plaza == null)
            {
                return NotFound();
            }

            plaza.Usuario = _context.Usuarios.FindAsync(plaza.UsuarioId).Result!;

            return plaza.ToDTO();
        }

        // PUT: api/Plazas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlaza(int id, PlazaDTO plazaDTO)
        {
            var plaza = new Plaza
            {
                Id = id,
                Nombre = plazaDTO.Nombre,
                Correo = plazaDTO.Correo,
                Telefono = plazaDTO.Telefono,
                LatitudeRecogida = plazaDTO.LatitudRecogida,
                LongitudeRecogida = plazaDTO.LongitudRecogida,
                ComentariosConductor = plazaDTO.ComentariosConductor,
                ComentariosPasajero = plazaDTO.ComentariosPasajero,
                UsuarioId = plazaDTO.UsuarioId,
                ViajeId = plazaDTO.ViajeId,
                Aceptada = plazaDTO.Aceptada,
            };

            _context.Entry(plaza).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlazaExists(id))
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

        // POST: api/Plazas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PlazaDTO>> PostPlaza(PlazaDTO plazaDTO)
        {
            var plaza = new Plaza
            {
                Nombre = plazaDTO.Nombre,
                Correo = plazaDTO.Correo,
                Telefono = plazaDTO.Telefono,
                LatitudeRecogida = plazaDTO.LatitudRecogida,
                LongitudeRecogida = plazaDTO.LongitudRecogida,
                ComentariosConductor = plazaDTO.ComentariosConductor,
                ComentariosPasajero = plazaDTO.ComentariosPasajero,
                UsuarioId = plazaDTO.UsuarioId,
                ViajeId = plazaDTO.ViajeId,
                Aceptada = plazaDTO.Aceptada,
            };

            if(plaza.UsuarioId != null)
            {
                var viaje = _context.Viajes.FindAsync(plaza.ViajeId).Result!;
                sendNotification("Alguien ha solicitado plaza para tu viaje", viaje.ConductorId, plaza.ViajeId);
            }

            _context.Plazas.Add(plaza);
            await _context.SaveChangesAsync();

            plazaDTO.Id = plaza.Id;

            return CreatedAtAction("GetPlaza", new { id = plaza.Id }, plazaDTO);
        }

        // DELETE: api/Plazas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlaza(int id)
        {
            var plaza = await _context.Plazas.FindAsync(id);
            if (plaza == null)
            {
                return NotFound();
            }

            if (plaza.Aceptada && plaza.UsuarioId != null)
            {
                sendNotification("Tu plaza para un viaje ha sido ELIMINADA", plaza.UsuarioId!.Value, plaza.ViajeId);
            }

            _context.Plazas.Remove(plaza);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}/aceptar")]
        public async Task<IActionResult> AcceptRequest(int id)
        {
            var solicitud = _context.Plazas.Find(id);
            
            if(solicitud == null)
            {
                return NotFound();
            }

            if (solicitud.Aceptada)
            {
                return BadRequest("Esta solicitud ya se aceptó");
            }

            solicitud.Aceptada = true;

            if(solicitud.UsuarioId.HasValue)
            {
                sendNotification(NOTIFICATION_ACCEPTED, solicitud.UsuarioId!.Value, solicitud.ViajeId);
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool PlazaExists(int id)
        {
            return _context.Plazas.Any(e => e.Id == id);
        }

        private void sendNotification(string text, int userId, int? viajeId)
        {
            var notificacion = new Notificacion
            {
                Mensaje = text,
                UsuarioId = userId
            };
            if (viajeId.HasValue) notificacion.ViajeId = viajeId;
            _context.Notificaciones.Add(notificacion);
                
            

        }

    }
}

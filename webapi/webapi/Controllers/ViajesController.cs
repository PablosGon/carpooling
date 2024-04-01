using Microsoft.AspNetCore.Mvc;
using System.Web.Http.Cors;
using webapi.Models;
using webapi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class ViajesController : ControllerBase
    {
        private readonly IViajeService _viajeService;

        public ViajesController(IViajeService viajeService)
        {
            this._viajeService = viajeService;
        }
        // GET: api/<ViajesController>
        [HttpGet]
        public ActionResult<List<Viaje>> Get()
        {
            return _viajeService.Get();
        }

        // GET api/<ViajesController>/5
        [HttpGet("{id}")]
        public ActionResult<Viaje> Get(string id)
        {
            var viaje = _viajeService.Get(id);

            if(viaje == null)
            {
                return NotFound($"Viaje with Id = {id} not found");
            }

            return viaje;
        }

        // POST api/<ViajesController>
        [HttpPost]
        public ActionResult<Viaje> Post([FromBody] Viaje viaje)
        {
            _viajeService.Create(viaje);
            return CreatedAtAction(nameof(Get), new {id = viaje.Id}, viaje);
        }

        // PUT api/<ViajesController>/5
        [HttpPut("{id}")]
        public ActionResult<Viaje> Put(string id, [FromBody] Viaje viaje)
        {
            var existingViaje = _viajeService.Get(id);

            if (existingViaje == null)
            {
                return NotFound($"Viaje with Id = {id} not found");
            }

            _viajeService.Update(id, viaje);

            return NoContent();
        }

        // DELETE api/<ViajesController>/5
        [HttpDelete("{id}")]
        public ActionResult<Viaje> Delete(string id)
        {
            var viaje = _viajeService.Get(id);

            if(viaje == null)
            {
                return NotFound($"Viaje with Id = {id} not found");
            }

            _viajeService.Delete(viaje.Id);

            return Ok($"Viaje with Id = {id} deleted");
        }
    }
}

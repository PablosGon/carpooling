using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CentrosController : ControllerBase
    {

        private readonly ICentroService _centroService;
        private readonly IUniversidadService _universidadService;

        public CentrosController(ICentroService centroService, IUniversidadService universidadService)
        {
            _centroService = centroService;
            _universidadService = universidadService;
        }

        // GET: api/<CentrosController>
        [HttpGet]
        public ActionResult<List<Centro>> Get()
        {
            return _centroService.Get();
        }

        // GET api/<CentrosController>/5
        [HttpGet("{id}")]
        public ActionResult<Centro> Get(string id)
        {
            var res = _centroService.Get(id);

            if(res == null)
            {
                return NotFound($"Centro con id = {id} no encontrado");
            }

            return res;
        }

        // POST api/<CentrosController>
        [HttpPost]
        public ActionResult<Centro> Post([FromBody] Centro centro)
        {
            var universidad = _universidadService.Get(centro.UniversidadId);
            if(universidad == null)
            {
                return NotFound($"Universidad con id = {centro.UniversidadId} no encontrada");
            }
            _centroService.Create(centro);
            return CreatedAtAction(nameof(Get), new { id = centro.Id }, centro);
        }

        // PUT api/<CentrosController>/5
        [HttpPut("{id}")]
        public ActionResult<Centro> Put(string id, [FromBody] Centro centro)
        {
            var res = _centroService.Get(id);

            if (res == null)
            {
                return NotFound($"Centro con id = {id} no encontrado");
            }

            var universidades = _universidadService.Get(centro.UniversidadId);

            if (universidades == null)
            {
                return NotFound($"Universidad con id = {centro.UniversidadId} no encontrada");
            }

            _centroService.Update(id, centro);

            return Ok();
        }

        // DELETE api/<CentrosController>/5
        [HttpDelete("{id}")]
        public ActionResult<Centro> Delete(string id)
        {
            var res = _centroService.Get(id);

            if (res == null)
            {
                return NotFound($"Centro con id = {id} no encontrado");
            }

            _centroService.Delete(id);

            return Ok();
        }
    }
}

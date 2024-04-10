using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MunicipiosController : ControllerBase
    {

        private readonly IMunicipioService _municipioService;

        public MunicipiosController(IMunicipioService municipioService)
        {
            this._municipioService = municipioService;
        }

        // GET: api/<MunicipiosController>
        [HttpGet]
        public ActionResult<List<Municipio>> Get()
        {
            return _municipioService.Get();
        }

        // GET api/<MunicipiosController>/5
        [HttpGet("{id}")]
        public ActionResult<Municipio> Get(string id)
        {
            var res = _municipioService.Get(id);

            if(res == null)
            {
                return NotFound($"Municipio con id = {id} no encontrado");
            }

            return res;
        }

        // POST api/<MunicipiosController>
        [HttpPost]
        public ActionResult<Municipio> Post([FromBody] Municipio municipio)
        {
            _municipioService.Create(municipio);
            return CreatedAtAction(nameof(Get), new {id = municipio.Id}, municipio);
        }

        // PUT api/<MunicipiosController>/5
        [HttpPut("{id}")]
        public ActionResult<Municipio> Put(string id, [FromBody] Municipio municipio)
        {
            var res = _municipioService.Get(id);

            if(res == null)
            {
                return NotFound($"Municipio con id = {id} no encontrado");
            }

            _municipioService.Update(id, municipio);
            return Ok();
        }

        // DELETE api/<MunicipiosController>/5
        [HttpDelete("{id}")]
        public ActionResult<Municipio> Delete(string id)
        {
            var res = _municipioService.Get(id);

            if (res == null)
            {
                return NotFound($"Municipio con id = {id} no encontrado");
            }

            _municipioService.Delete(id);
            return Ok();
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NucleosControllers : ControllerBase
    {

        private readonly INucleoService _nucleoService;

        public NucleosControllers(INucleoService nucleoService)
        {
            _nucleoService = nucleoService;
        }

        // GET: api/<NucleosControllers>
        [HttpGet]
        public ActionResult<List<Nucleo>> Get()
        {
            return _nucleoService.Get();
        }

        // GET api/<NucleosControllers>/5
        [HttpGet("{id}")]
        public ActionResult<Nucleo> Get(string id)
        {
            var res = _nucleoService.Get(id);

            if (res == null)
            {
                return NotFound($"Núcleo con id = {id} no encontrado");
            }

            return res;
        }

        // POST api/<NucleosControllers>
        [HttpPost]
        public ActionResult<Nucleo> Post([FromBody] Nucleo nucleo)
        {
            _nucleoService.Create(nucleo);
            return CreatedAtAction(nameof(Get), new {id = nucleo.Id}, nucleo);
        }

        // PUT api/<NucleosControllers>/5
        [HttpPut("{id}")]
        public ActionResult<Nucleo> Put(string id, [FromBody] Nucleo nucleo)
        {
            var res = _nucleoService.Get(id);

            if (res == null)
            {
                return NotFound($"Núcleo con id = {id} no encontrado");
            }

            _nucleoService.Update(id, nucleo);
            return Ok();
        }

        // DELETE api/<NucleosControllers>/5
        [HttpDelete("{id}")]
        public ActionResult<Nucleo> Delete(string id)
        {
            var res = _nucleoService.Get(id);

            if (res == null)
            {
                return NotFound($"Núcleo con id = {id} no encontrado");
            }

            _nucleoService.Delete(id);
            return Ok();
        }
    }
}

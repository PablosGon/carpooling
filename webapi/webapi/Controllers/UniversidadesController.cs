using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UniversidadesController : ControllerBase
    {

        private readonly IUniversidadService _universidadService;

        public UniversidadesController(IUniversidadService universidadService)
        {
            _universidadService = universidadService;
        }

        // GET: api/<UniversidadesController>
        [HttpGet]
        public ActionResult<List<Universidad>> Get()
        {
            return _universidadService.Get();
        }

        // GET api/<UniversidadesController>/5
        [HttpGet("{id}")]
        public ActionResult<Universidad> Get(string id)
        {
            var res = _universidadService.Get(id);

            if (res == null)
            {
                return NotFound();
            }

            return res;
        }

        // POST api/<UniversidadesController>
        [HttpPost]
        public ActionResult<Universidad> Post([FromBody] Universidad universidad)
        {
            _universidadService.Create(universidad);
            return CreatedAtAction(nameof(Get), new { id = universidad.Id }, universidad);
        }

        // PUT api/<UniversidadesController>/5
        [HttpPut("{id}")]
        public ActionResult<Universidad> Put(string id, [FromBody] Universidad universidad)
        {
            var res = _universidadService.Get(id);

            if(res == null)
            {
                return NotFound();
            }

            _universidadService.Update(id, universidad);
            return Ok();
        }

        // DELETE api/<UniversidadesController>/5
        [HttpDelete("{id}")]
        public ActionResult<Universidad> Delete(string id)
        {
            var res = _universidadService.Get(id);

            if (res == null)
            {
                return NotFound();
            }

            _universidadService.Delete(id);
            return Ok();
        }
    }
}

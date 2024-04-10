using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuariosController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        // GET: api/<UsuariosController>
        [HttpGet]
        public ActionResult<List<Usuario>> Get()
        {
            return _usuarioService.Get();
        }

        // GET api/<UsuariosController>/5
        [HttpGet("{id}")]
        public ActionResult<Usuario> Get(string id)
        {
            var res = _usuarioService.Get(id);

            if(res == null)
            {
                return NotFound($"Usuario con id = {id} no encontrado");
            }

            return res;
        }

        // POST api/<UsuariosController>
        [HttpPost]
        public ActionResult<Usuario> Post([FromBody] Usuario usuario)
        {
            _usuarioService.Create(usuario);
            return CreatedAtAction(nameof(Get), new { id = usuario.Id }, usuario);
        }

        // PUT api/<UsuariosController>/5
        [HttpPut("{id}")]
        public ActionResult<Usuario> Put(string id, [FromBody] Usuario usuario)
        {
            var res = _usuarioService.Get(id);

            if( res == null)
            {
                return NotFound($"Usuario con id = {id} no encontrado");
            }

            _usuarioService.Update(id, usuario);
            return Ok();
        }

        // DELETE api/<UsuariosController>/5
        [HttpDelete("{id}")]
        public ActionResult<Usuario> Delete(string id)
        {
            var res = _usuarioService.Get(id);

            if (res == null)
            {
                return NotFound($"Usuario con id = {id} no encontrado");
            }

            _usuarioService.Delete(id);
            return Ok();
        }
    }
}

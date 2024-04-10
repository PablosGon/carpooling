using webapi.Models;

namespace webapi.Services
{
    public interface IUsuarioService
    {
        List<Usuario> Get();
        Usuario Get(string id);
        Usuario Create (Usuario usuario);
        void Update(string id, Usuario usuario);
        void Delete(string id);
    }
}

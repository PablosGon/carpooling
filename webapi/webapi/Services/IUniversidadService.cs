using webapi.Models;

namespace webapi.Services
{
    public interface IUniversidadService
    {
        List<Universidad> Get();
        Universidad Get(string id);
        Universidad Create(Universidad universidad);
        void Update(string id, Universidad universidad);
        void Delete(string id);
    }
}

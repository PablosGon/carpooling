using webapi.Models;

namespace webapi.Services
{
    public interface IMunicipioService
    {
        List<Municipio> Get();
        Municipio Get(string id);
        Municipio Create(Municipio municipio);
        void Update(string id, Municipio municipio);
        void Delete(string id);
    }
}

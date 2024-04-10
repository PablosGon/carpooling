using MongoDB.Driver;
using webapi.Models;

namespace webapi.Services
{
    public interface INucleoService
    {
        List<Nucleo> Get();
        Nucleo Get(string id);
        Nucleo Create(Nucleo nucleo);
        void Update(string id, Nucleo nucleo);
        void Delete(string id);
    }
}

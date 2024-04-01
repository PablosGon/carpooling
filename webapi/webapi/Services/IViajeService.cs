using webapi.Models;

namespace webapi.Services
{
    public interface IViajeService
    {
        List<Viaje> Get();
        Viaje Get(string id);
        Viaje Create(Viaje viaje);
        void Update(string id, Viaje viaje);
        void Delete(string id);
    }
}

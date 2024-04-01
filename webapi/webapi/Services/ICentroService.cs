using webapi.Models;

namespace webapi.Services
{
    public interface ICentroService
    {
        List<Centro> Get();
        Centro Get(string id);
        Centro Create(Centro centro);
        void Update(string id, Centro centro);
        void Delete(string id);
    }
}

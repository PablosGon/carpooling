using MongoDB.Driver;
using webapi.Models;

namespace webapi.Services
{
    public class CentroService : ICentroService
    {
        private readonly IMongoCollection<Centro> _centros;

        public CentroService(ICarpoolingDatabaseSettings settings, IMongoClient client)
        {
            var database = client.GetDatabase(settings.DatabaseName);
            _centros = database.GetCollection<Centro>("centros");
        }

        public Centro Get(string id)
        {
            return _centros.Find(x => x.Id == id).FirstOrDefault();
        }

        public Centro Create(Centro centro)
        {
            _centros.InsertOne(centro);
            return centro;
        }

        public void Delete(string id)
        {
            _centros.DeleteOne(x => x.Id == id);
        }

        public List<Centro> Get()
        {
            return _centros.Find(centro => true).ToList();
        }

        public void Update(string id, Centro centro)
        {
            Console.WriteLine("ID:" + centro.Id + " ID1: " + id);
            _centros.ReplaceOne(x => x.Id == id, centro);
        }
    }
}

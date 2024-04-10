using MongoDB.Driver;
using webapi.Models;

namespace webapi.Services
{
    public class NucleoService : INucleoService
    {
        private readonly IMongoCollection<Nucleo> _nucleos;

        public NucleoService(ICarpoolingDatabaseSettings settings, IMongoClient client)
        {
            var database = client.GetDatabase(settings.DatabaseName);
            _nucleos = database.GetCollection<Nucleo>("nucleos");
        }
        public Nucleo Create(Nucleo nucleo)
        {
            _nucleos.InsertOne(nucleo);
            return nucleo;
        }

        public void Delete(string id)
        {
            _nucleos.DeleteOne(x => x.Id == id);
        }

        public List<Nucleo> Get()
        {
            return _nucleos.Find(x => true).ToList();
        }

        public Nucleo Get(string id)
        {
            return _nucleos.Find(x => x.Id == id).FirstOrDefault();
        }

        public void Update(string id, Nucleo nucleo)
        {
            _nucleos.ReplaceOne(id, nucleo);
        }
    }
}

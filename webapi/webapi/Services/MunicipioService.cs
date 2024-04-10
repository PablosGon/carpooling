using MongoDB.Driver;
using webapi.Models;

namespace webapi.Services
{
    public class MunicipioService : IMunicipioService
    {

        private readonly IMongoCollection<Municipio> _municipios;

        public MunicipioService(ICarpoolingDatabaseSettings settings, IMongoClient client) {
            var database = client.GetDatabase(settings.DatabaseName);
            _municipios = database.GetCollection<Municipio>("municipios");
        }

        public Municipio Create(Municipio municipio)
        {
            _municipios.InsertOne(municipio);
            return municipio;
        }

        public void Delete(string id)
        {
            _municipios.DeleteOne(x => x.Id == id);
        }

        public List<Municipio> Get()
        {
            return _municipios.Find(x => true).ToList();
        }

        public Municipio Get(string id)
        {
            return _municipios.Find(x => x.Id == id).FirstOrDefault();
        }

        public void Update(string id, Municipio municipio)
        {
            _municipios.ReplaceOne(id, municipio);
        }
    }
}

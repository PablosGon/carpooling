using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using webapi.Models;

namespace webapi.Services
{
    public class UniversidadService : IUniversidadService
    {

        private readonly IMongoCollection<Universidad> _universidades;

        public UniversidadService(ICarpoolingDatabaseSettings settings, IMongoClient client)
        {
            var database = client.GetDatabase(settings.DatabaseName);
            _universidades = database.GetCollection<Universidad>("universidades");
        }

        public Universidad Create(Universidad universidad)
        {
            _universidades.InsertOne(universidad);
            return universidad;
        }

        public void Delete(string id)
        {
            _universidades.DeleteOne(id);
        }

        public List<Universidad> Get()
        {
            return _universidades.Find(x => true).ToList();
        }

        public Universidad Get(string id)
        {
            return _universidades.Find(x => x.Id == id).FirstOrDefault();
        }

        public void Update(string id, Universidad universidad)
        {
            _universidades.ReplaceOne(id, universidad);
        }
    }
}

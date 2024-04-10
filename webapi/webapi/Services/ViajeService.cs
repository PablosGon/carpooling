using webapi.Models;
using MongoDB.Driver;

namespace webapi.Services
{
    public class ViajeService : IViajeService
    {
        private readonly IMongoCollection<Viaje> _viajes;

        public ViajeService(ICarpoolingDatabaseSettings settings, IMongoClient mongoClient)
        {
            Console.WriteLine("settings: ", settings);
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _viajes = database.GetCollection<Viaje>(settings.ViajeCollectionName);
        }
        public Viaje Create(Viaje viaje)
        {
            _viajes.InsertOne(viaje);
            return viaje;
        }

        public void Delete(string id)
        {
            _viajes.DeleteOne(viaje => viaje.Id == id);
        }

        public List<Viaje> Get()
        {
            return _viajes.Find(viaje => true).ToList();
        }

        public Viaje Get(string id)
        {
            return _viajes.Find(viaje => viaje.Id == id).FirstOrDefault();
        }

        public void Update(string id, Viaje viaje)
        {
            _viajes.ReplaceOne(viaje => viaje.Id == id, viaje);
        }
    }
}

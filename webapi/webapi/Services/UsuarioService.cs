using MongoDB.Driver;
using webapi.Models;

namespace webapi.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IMongoCollection<Usuario> _usuarios;

        public UsuarioService(ICarpoolingDatabaseSettings settings, IMongoClient client)
        {
            var database = client.GetDatabase(settings.DatabaseName);
            _usuarios = database.GetCollection<Usuario>("usuarios");
        }

        public Usuario Create(Usuario usuario)
        {
            _usuarios.InsertOne(usuario);
            return usuario;
        }

        public void Delete(string id)
        {
            _usuarios.DeleteOne(x => x.Id == id);
        }

        public List<Usuario> Get()
        {
            return _usuarios.Find(x => true).ToList();
        }

        public Usuario Get(string id)
        {
            return _usuarios.Find(x => x.Id == id).FirstOrDefault();
        }

        public void Update(string id, Usuario usuario)
        {
            _usuarios.ReplaceOne(x => x.Id == id, usuario);
        }
    }
}

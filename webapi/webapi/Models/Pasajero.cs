using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace webapi.Models
{
    [BsonIgnoreExtraElements]
    public class Pasajero
    {

        [BsonElement("nombre")]
        public string Nombre { get; set; }

        [BsonElement("correo")]
        public string Correo { get; set; }

        [BsonElement("telefono")]
        public string Telefono { get; set; }

        [BsonElement("ubicacionRecogida")]
        public Ubicacion UbicacionRecogida { get; set; }

        [BsonElement("comentarios")]
        public string Comentarios { get; set; }

    }
}

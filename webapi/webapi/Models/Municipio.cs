using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace webapi.Models
{
    [BsonIgnoreExtraElements]
    public class Municipio
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("nombre")]
        public string Nombre { get; set; }

        [BsonElement("ubicación")]
        public Ubicacion Ubicacion { get; set; }

        [BsonElement("imagen")]
        public string ImagenURL { get; set; }
    }
}

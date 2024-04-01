using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace webapi.Models
{
    [BsonIgnoreExtraElements]
    public class Centro
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("nombre")]
        public string Nombre { get; set; }

        [BsonElement("ubicación")]
        public Ubicacion Ubicacion { get; set; }

        [BsonElement("universidad")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UniversidadId { get; set; }
    }
}

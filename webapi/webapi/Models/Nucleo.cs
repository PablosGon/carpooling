using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace webapi.Models
{
    [BsonIgnoreExtraElements]
    public class Nucleo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("nombre")]
        public string Nombre { get; set; }

        [BsonElement("ubicacion")]
        public Ubicacion Ubicacion { get; set; }

        [BsonElement("municipioId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string MunicipioId { get; set; }

        [BsonElement("imagen")]
        public string ImagenURL { get; set; }
    }
}

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace webapi.Models
{
    [BsonIgnoreExtraElements]
    public class Nucleo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("nombre")]
        public string Nombre { get; set; }

        [BsonElement("ubicacion")]
        public Ubicacion Ubicacion { get; set; }

        [BsonElement("municipioId")]
        public string MunicipioId { get; set; }
    }
}

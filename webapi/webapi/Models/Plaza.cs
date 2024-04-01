using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace webapi.Models
{
    [BsonIgnoreExtraElements]
    public class Plaza
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("nombre")]
        public string Nombre { get; set; }

        [BsonElement("correo")]
        public string Correo { get; set; }

        [BsonElement("telefono")]
        public string Telefono { get; set; }

        [BsonElement("viajeId")]
        public string ViajeId { get; set; }

        [BsonElement("ubicacionRecogida")]
        public Ubicacion UbicacionRecogida { get; set; }

    }
}

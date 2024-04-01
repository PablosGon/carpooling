using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace webapi.Models
{
    [BsonIgnoreExtraElements]
    public class Viaje
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("hora")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime Hora { get; set; }

        [BsonElement("maxPlazas")]
        public int MaxPlazas { get; set; }

        [BsonElement("isvuelta")]
        public bool IsVuelta { get; set; }

        [BsonElement("comentarios")]
        public string Comentarios { get; set; }

        [BsonElement("nucleo")]
        public string Nucleo { get; set; }

        [BsonElement("centro")]
        public string Centro { get; set; }

    }
}

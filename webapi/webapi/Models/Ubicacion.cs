using MongoDB.Bson.Serialization.Attributes;

namespace webapi.Models
{
    public class Ubicacion
    {
        [BsonElement("latitude")]
        public double Latitude { get; set; }
        [BsonElement("longitude")]
        public double Longitude { get; set; }
    }
}

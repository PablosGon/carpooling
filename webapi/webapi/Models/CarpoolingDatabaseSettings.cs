namespace webapi.Models
{
    public class CarpoolingDatabaseSettings : ICarpoolingDatabaseSettings
    {
        public string ConnectionString { get; set; } = String.Empty;
        public string DatabaseName { get; set; } = String.Empty;
        public string ViajeCollectionName { get; set; } = String.Empty;
    }
}

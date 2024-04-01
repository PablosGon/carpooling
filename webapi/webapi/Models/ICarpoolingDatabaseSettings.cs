namespace webapi.Models
{
    public interface ICarpoolingDatabaseSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        string ViajeCollectionName { get; set; }
    }
}

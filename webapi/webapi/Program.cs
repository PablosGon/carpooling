using Microsoft.Extensions.Options;
using MongoDB.Driver;
using webapi.Models;
using webapi.Services;

var MyAllowSpecificOrigins = "AngularApp";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:4200");
    });
});

// Add services to the container.

builder.Services.Configure<CarpoolingDatabaseSettings>(builder.Configuration.GetSection(nameof(CarpoolingDatabaseSettings))); // Map JSON settings to class

builder.Services.AddSingleton<ICarpoolingDatabaseSettings>(sp => sp.GetRequiredService<IOptions<CarpoolingDatabaseSettings>>().Value); // Instantiate class whenever interface is needed

builder.Services.AddSingleton<IMongoClient>(s => new MongoClient(builder.Configuration.GetValue<string>("CarpoolingDatabaseSettings:ConnectionString") + "?connect=replicaSet")); // Instantiate class whenever interface is needed

builder.Services.AddScoped<IViajeService, ViajeService>();
builder.Services.AddScoped<ICentroService, CentroService>();
builder.Services.AddScoped<IUniversidadService, UniversidadService>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IMunicipioService, MunicipioService>();
builder.Services.AddScoped<INucleoService, NucleoService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();

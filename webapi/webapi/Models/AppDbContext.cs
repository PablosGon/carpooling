using Microsoft.EntityFrameworkCore;

namespace webapi.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Centro> Centros { get; set; }
        public DbSet<Municipio> Municipios { get; set; }
        public DbSet<Nucleo> Nucleos { get; set; }
        public DbSet<Plaza> Plazas { get; set; }
        public DbSet<Universidad> Universidades { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Valoracion> Valoraciones { get; set; }
        public DbSet<Viaje> Viajes { get; set; }
        public DbSet<Notificacion> Notificaciones { get; set; } = default!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Centro>(entity =>
            {
                entity.HasKey(c => c.Id);
                entity.HasOne(c => c.Universidad).WithMany(u => u.Centros).HasForeignKey(c => c.UniversidadId);
            });

            modelBuilder.Entity<Municipio>(entity =>
            {
                entity.HasKey(m => m.Id);
            });

            modelBuilder.Entity<Notificacion>(entity =>
            {
                entity.HasKey(n => n.Id);
                entity.HasOne(n => n.Usuario).WithMany(u => u.Notificaciones).HasForeignKey(n => n.UsuarioId);
                entity.HasOne(n => n.Viaje).WithMany(v => v.Notificaciones).HasForeignKey(n => n.ViajeId).OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Nucleo>(entity =>
            {
                entity.HasKey(n => n.Id);
                entity.HasOne(n => n.Municipio).WithMany(m => m.Nucleos).HasForeignKey(n => n.MunicipioId);
            });

            modelBuilder.Entity<Plaza>(entity =>
            {
                entity.HasKey(p => p.Id);
                entity.HasOne(p => p.Usuario).WithMany(u => u.Plazas).HasForeignKey(p => p.UsuarioId).OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(p => p.Viaje).WithMany(v => v.Plazas).HasForeignKey(p => p.ViajeId).OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Universidad>(entity =>
            {
                entity.HasKey(u => u.Id);
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.HasOne(u => u.Universidad).WithMany(u => u.Usuarios).HasForeignKey(u => u.UniversidadId).OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(u => u.Municipio).WithMany(m => m.Usuarios).HasForeignKey(u => u.MunicipioId).OnDelete(DeleteBehavior.NoAction);
            });
            
            modelBuilder.Entity<Valoracion>(entity =>
            {
                entity.HasKey(v => v.Id);
                entity.HasOne(v => v.Conductor).WithMany(u => u.ValoracionesRecibidas).HasForeignKey(v => v.ConductorId).OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(v => v.Pasajero).WithMany(u => u.ValoracionesEnviadas).HasForeignKey(v => v.PasajeroId).OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Viaje>(entity =>
            {
                entity.HasKey(v => v.Id);
                entity.HasOne(v => v.Centro).WithMany(c => c.Viajes).HasForeignKey(v => v.CentroId).OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(v => v.Conductor).WithMany(u => u.ViajesCreados).HasForeignKey(v => v.ConductorId).OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(v => v.Nucleo).WithMany(n => n.Viajes).HasForeignKey(v => v.NucleoId).OnDelete(DeleteBehavior.NoAction);
            });
        }
    }
}

﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using webapi.Models;

#nullable disable

namespace webapi.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240423094838_added-notificaciones")]
    partial class addednotificaciones
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("webapi.Models.Centro", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Imagen")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Latitude")
                        .HasColumnType("float");

                    b.Property<double>("Longitude")
                        .HasColumnType("float");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UniversidadId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UniversidadId");

                    b.ToTable("Centros");
                });

            modelBuilder.Entity("webapi.Models.Municipio", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Imagen")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Latitude")
                        .HasColumnType("float");

                    b.Property<double>("Longitude")
                        .HasColumnType("float");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Municipios");
                });

            modelBuilder.Entity("webapi.Models.Notificacion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Leida")
                        .HasColumnType("bit");

                    b.Property<string>("Mensaje")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Notificacion");
                });

            modelBuilder.Entity("webapi.Models.Nucleo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Imagen")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Latitude")
                        .HasColumnType("float");

                    b.Property<double>("Longitude")
                        .HasColumnType("float");

                    b.Property<int>("MunicipioId")
                        .HasColumnType("int");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("MunicipioId");

                    b.ToTable("Nucleos");
                });

            modelBuilder.Entity("webapi.Models.Plaza", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Aceptada")
                        .HasColumnType("bit");

                    b.Property<string>("ComentariosConductor")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ComentariosPasajero")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Correo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("LatitudeRecogida")
                        .HasColumnType("float");

                    b.Property<double>("LongitudeRecogida")
                        .HasColumnType("float");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telefono")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.Property<int>("ViajeId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UsuarioId");

                    b.HasIndex("ViajeId");

                    b.ToTable("Plazas");
                });

            modelBuilder.Entity("webapi.Models.Universidad", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Imagen")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Latitude")
                        .HasColumnType("float");

                    b.Property<double>("Longitude")
                        .HasColumnType("float");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Universidades");
                });

            modelBuilder.Entity("webapi.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Correo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Grado")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Imagen")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MunicipioId")
                        .HasColumnType("int");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telefono")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UniversidadId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MunicipioId");

                    b.HasIndex("UniversidadId");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("webapi.Models.Valoracion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ConductorId")
                        .HasColumnType("int");

                    b.Property<int>("Estrellas")
                        .HasColumnType("int");

                    b.Property<int>("PasajeroId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ConductorId");

                    b.HasIndex("PasajeroId");

                    b.ToTable("Valoraciones");
                });

            modelBuilder.Entity("webapi.Models.Viaje", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CentroId")
                        .HasColumnType("int");

                    b.Property<string>("Comentarios")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ConductorId")
                        .HasColumnType("int");

                    b.Property<string>("DescripcionCoche")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("FechaYHora")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsVuelta")
                        .HasColumnType("bit");

                    b.Property<int>("MaxPlazas")
                        .HasColumnType("int");

                    b.Property<int>("NucleoId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CentroId");

                    b.HasIndex("ConductorId");

                    b.HasIndex("NucleoId");

                    b.ToTable("Viajes");
                });

            modelBuilder.Entity("webapi.Models.Centro", b =>
                {
                    b.HasOne("webapi.Models.Universidad", "Universidad")
                        .WithMany("Centros")
                        .HasForeignKey("UniversidadId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Universidad");
                });

            modelBuilder.Entity("webapi.Models.Notificacion", b =>
                {
                    b.HasOne("webapi.Models.Usuario", "Usuario")
                        .WithMany("Notificaciones")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("webapi.Models.Nucleo", b =>
                {
                    b.HasOne("webapi.Models.Municipio", "Municipio")
                        .WithMany("Nucleos")
                        .HasForeignKey("MunicipioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Municipio");
                });

            modelBuilder.Entity("webapi.Models.Plaza", b =>
                {
                    b.HasOne("webapi.Models.Usuario", "Usuario")
                        .WithMany("Plazas")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("webapi.Models.Viaje", "Viaje")
                        .WithMany("Plazas")
                        .HasForeignKey("ViajeId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Usuario");

                    b.Navigation("Viaje");
                });

            modelBuilder.Entity("webapi.Models.Usuario", b =>
                {
                    b.HasOne("webapi.Models.Municipio", "Municipio")
                        .WithMany("Usuarios")
                        .HasForeignKey("MunicipioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("webapi.Models.Universidad", "Universidad")
                        .WithMany("Usuarios")
                        .HasForeignKey("UniversidadId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Municipio");

                    b.Navigation("Universidad");
                });

            modelBuilder.Entity("webapi.Models.Valoracion", b =>
                {
                    b.HasOne("webapi.Models.Usuario", "Conductor")
                        .WithMany("ValoracionesRecibidas")
                        .HasForeignKey("ConductorId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("webapi.Models.Usuario", "Pasajero")
                        .WithMany("ValoracionesEnviadas")
                        .HasForeignKey("PasajeroId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Conductor");

                    b.Navigation("Pasajero");
                });

            modelBuilder.Entity("webapi.Models.Viaje", b =>
                {
                    b.HasOne("webapi.Models.Centro", "Centro")
                        .WithMany("Viajes")
                        .HasForeignKey("CentroId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("webapi.Models.Usuario", "Conductor")
                        .WithMany("ViajesCreados")
                        .HasForeignKey("ConductorId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("webapi.Models.Nucleo", "Nucleo")
                        .WithMany("Viajes")
                        .HasForeignKey("NucleoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Centro");

                    b.Navigation("Conductor");

                    b.Navigation("Nucleo");
                });

            modelBuilder.Entity("webapi.Models.Centro", b =>
                {
                    b.Navigation("Viajes");
                });

            modelBuilder.Entity("webapi.Models.Municipio", b =>
                {
                    b.Navigation("Nucleos");

                    b.Navigation("Usuarios");
                });

            modelBuilder.Entity("webapi.Models.Nucleo", b =>
                {
                    b.Navigation("Viajes");
                });

            modelBuilder.Entity("webapi.Models.Universidad", b =>
                {
                    b.Navigation("Centros");

                    b.Navigation("Usuarios");
                });

            modelBuilder.Entity("webapi.Models.Usuario", b =>
                {
                    b.Navigation("Notificaciones");

                    b.Navigation("Plazas");

                    b.Navigation("ValoracionesEnviadas");

                    b.Navigation("ValoracionesRecibidas");

                    b.Navigation("ViajesCreados");
                });

            modelBuilder.Entity("webapi.Models.Viaje", b =>
                {
                    b.Navigation("Plazas");
                });
#pragma warning restore 612, 618
        }
    }
}

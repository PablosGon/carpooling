﻿using System.Diagnostics.CodeAnalysis;
using webapi.DTOs;

namespace webapi.Models
{
    public class Universidad
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public string? Imagen { get; set; }
        public ICollection<Centro>? Centros { get; set; }
        public ICollection<Usuario>? Usuarios { get; set; }

        public UniversidadDTO ToDTO()
        {
            return new UniversidadDTO
            {
                Id = Id,
                Nombre = Nombre,
                Imagen = Imagen
            };
        }
    }
}

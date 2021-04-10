using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace CRUD.Models
{
    public class PruebaCarvajalContext : DbContext
    {
        public IConfiguration Configuration { get; }
        public PruebaCarvajalContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public virtual DbSet<TipoIdentificacion> TipoIdentificacion { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer( Configuration.GetConnectionString("db") );                
            }
        }

        
    }
}

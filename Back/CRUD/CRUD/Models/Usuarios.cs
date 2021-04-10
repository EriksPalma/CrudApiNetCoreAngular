using System;

namespace CRUD.Models
{
    public class Usuarios
    {
        public Guid Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public Guid? IdTipoIdentificacion { get; set; }
        public string Contrasena { get; set; }
        public string NumeroIdentificaion { get; set; }
        public string Correo { get; set; }

    }
}

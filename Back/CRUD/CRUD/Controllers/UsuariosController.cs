using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CRUD.Models;
using CRUD.Models.DTO;

namespace CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly PruebaCarvajalContext _context;

        public UsuariosController(PruebaCarvajalContext context)
        {
            _context = context;
        }

        // GET: api/Usuarios
        [HttpGet]
        public ActionResult<IEnumerable<Usuarios>> GetUsuarios()
        {
            try
            {
                return _context.Usuarios.Select(u => new Usuarios { Nombre = u.Nombre, Apellido = u.Apellido, NumeroIdentificaion = u.NumeroIdentificaion, Correo = u.Correo, Id = u.Id, IdTipoIdentificacion = u.IdTipoIdentificacion }).ToList();
            }
            catch (Exception e) {
                return  new ObjectResult( e ) { StatusCode = 500 };
            }
        }

        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuarios>> GetUsuarios(Guid id)
        {
            var usuarios = await _context.Usuarios.FindAsync(id);

            if (usuarios == null)
            {
                return NotFound();
            }

            return usuarios;
        }

        // PUT: api/Usuarios/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuarios(Guid id, Usuarios usuarios)
        {
            if (id != usuarios.Id)
            {
                return BadRequest();
            }

            _context.Entry(usuarios).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuariosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        
        // POST: api/Usuarios        
        [HttpPost]
        public ActionResult< Usuarios > PostUsuarios ([FromBody] Usuarios usuarios)
        {            
            try {
                _context.Usuarios.Add(usuarios);
                _context.SaveChanges();
            } catch ( Exception e ) {
                return BadRequest(e.Message +" "+  e.InnerException.Message);
            }           

            return CreatedAtAction("GetUsuarios", new { id = usuarios.Id }, usuarios);
        }

        // POST: api/Usuarios        
        [HttpPost]
        [Route("PostUsuariosLogin")]
        public ActionResult<Usuarios> PostUsuariosLogin([FromBody] Login login)
        {
            try
            {
                Usuarios user = _context.Usuarios.Where( u => u.Contrasena.Equals(login.Contrasena) && u.NumeroIdentificaion.Equals(login.NumeroIdentificaion) ).FirstOrDefault();

                if (user is null ) { 
                    return NotFound();
                }

                return CreatedAtAction("PostUsuariosLogin", new { id = user.Id, NumeroIdentificaion = user.NumeroIdentificaion, Nombre = user.Nombre, Apellido = user.Apellido });

            }
            catch (Exception e)
            {
                string msg = e.InnerException is null ? e.Message : e.Message + " " +  e.InnerException.Message;
                return BadRequest( msg );
            }

            
        }


        // DELETE: api/Usuarios/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Usuarios>> DeleteUsuarios(Guid id)
        {
            var usuarios = await _context.Usuarios.FindAsync(id);
            if (usuarios == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuarios);
            await _context.SaveChangesAsync();

            return usuarios;
        }

        private bool UsuariosExists(Guid id)
        {
            return _context.Usuarios.Any(e => e.Id == id);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CRUD.Models;

namespace CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoIdentificacionsController : ControllerBase
    {
        private readonly PruebaCarvajalContext _context;

        public TipoIdentificacionsController(PruebaCarvajalContext context)
        {
            _context = context;
        }

        // GET: api/TipoIdentificacions
        [HttpGet]
        public ActionResult<IEnumerable<TipoIdentificacion>> GetTipoIdentificacion()
        {
            try
            {
                return _context.TipoIdentificacion.ToList();
            }
            catch (Exception e) {
                return new ObjectResult(e) { StatusCode = 500 };
            }
        }

        // GET: api/TipoIdentificacions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoIdentificacion>> GetTipoIdentificacion(Guid id)
        {
            var tipoIdentificacion = await _context.TipoIdentificacion.FindAsync(id);

            if (tipoIdentificacion == null)
            {
                return NotFound();
            }

            return tipoIdentificacion;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipoIdentificacion(Guid id, TipoIdentificacion tipoIdentificacion)
        {
            if (id != tipoIdentificacion.Id)
            {
                return BadRequest();
            }

            _context.Entry(tipoIdentificacion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoIdentificacionExists(id))
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

        [HttpPost]
        public async Task<ActionResult<TipoIdentificacion>> PostTipoIdentificacion(TipoIdentificacion tipoIdentificacion)
        {
            _context.TipoIdentificacion.Add(tipoIdentificacion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTipoIdentificacion", new { id = tipoIdentificacion.Id }, tipoIdentificacion);
        }

        // DELETE: api/TipoIdentificacions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TipoIdentificacion>> DeleteTipoIdentificacion(Guid id)
        {
            var tipoIdentificacion = await _context.TipoIdentificacion.FindAsync(id);
            if (tipoIdentificacion == null)
            {
                return NotFound();
            }

            _context.TipoIdentificacion.Remove(tipoIdentificacion);
            await _context.SaveChangesAsync();

            return tipoIdentificacion;
        }

        private bool TipoIdentificacionExists(Guid id)
        {
            return _context.TipoIdentificacion.Any(e => e.Id == id);
        }
    }
}

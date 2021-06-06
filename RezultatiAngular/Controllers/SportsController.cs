using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RezultatiAngular.Models;

namespace RezultatiAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SportsController : ControllerBase
    {
        private readonly ScoreManagerDbContext _context;

        public SportsController(ScoreManagerDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// GET: api/Sports.
        /// Retrieves all sports.
        /// </summary>
        /// <returns>Sports.</returns>
        [HttpGet]
        public IEnumerable<Sport> GetSports()
        {
            return _context.Sports;
        }

        /// <summary>
        /// GET: api/Sports/5.
        /// Retrieves the specific sport.
        /// </summary>
        /// <param name="id">Sport ID.</param>
        /// <returns>OkObjectResult object (sport).</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSport([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sport = await _context.Sports.FindAsync(id);

            if (sport == null)
            {
                return NotFound();
            }

            return Ok(sport);
        }

        /// <summary>
        /// GET: api/Sports/byMatchID/5.
        /// Retrieves sport ID of specific match.
        /// </summary>
        /// <param name="id">Sport ID.</param>
        /// <returns>OkObjectResult object (sport ID).</returns>
        [HttpGet("byMatchID/{matchID}")]
        public async Task<IActionResult> GetSportIDByMatchID([FromRoute] int matchID)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sportID = await _context.Matches.Where(x => x.ID == matchID).Select(x => x.SportID).FirstOrDefaultAsync();

            if (sportID <= 0)
            {
                return NotFound();
            }

            return Ok(sportID);
        }

        /// <summary>
        /// PUT: api/Sports/5.
        /// Updates a specific sport.
        /// </summary>
        /// <param name="id">Sport ID.</param>
        /// <param name="sport">Sport object.</param>
        /// <returns>Status code.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSport([FromRoute] int id, [FromBody] Sport sport)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sport.ID)
            {
                return BadRequest();
            }

            _context.Entry(sport).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SportExists(id))
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

        /// <summary>
        /// POST: api/Sports.
        /// Stores a sport to the database.
        /// </summary>
        /// <param name="sport">Sport object.</param>
        /// <returns>CreatedAtActionResult object.</returns>
        [HttpPost]
        public async Task<IActionResult> PostSport([FromBody] Sport sport)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Sports.Add(sport);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSport", new { id = sport.ID }, sport);
        }

        /// <summary>
        /// DELETE: api/Sports/5.
        /// Deletes a sport from the database.
        /// </summary>
        /// <param name="id">Sport ID.</param>
        /// <returns>OkObjectResult object (sport).</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSport([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sport = await _context.Sports.FindAsync(id);
            if (sport == null)
            {
                return NotFound();
            }

            _context.Sports.Remove(sport);
            await _context.SaveChangesAsync();

            return Ok(sport);
        }

        /// <summary>
        /// Checks if particular sport exists.
        /// </summary>
        /// <param name="id">Sport ID.</param>
        /// <returns>Boolean.</returns>
        private bool SportExists(int id)
        {
            return _context.Sports.Any(e => e.ID == id);
        }
    }
}
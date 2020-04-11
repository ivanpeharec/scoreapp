using System;
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
    public class MatchesController : ControllerBase
    {
        private readonly ScoreManagerDbContext _context;

        public MatchesController(ScoreManagerDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// GET: api/Matches.
        /// Retrieves all matches.
        /// </summary>
        /// <returns>Matches.</returns>
        [HttpGet]
        public IEnumerable<Match> GetMatches()
        {
            return _context.Matches;
        }

        /// <summary>
        /// GET: api/Matches/5.
        /// Retrieves the specific match.
        /// </summary>
        /// <param name="id">Match ID.</param>
        /// <returns>OkObjectResult object (match).</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMatch([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var match = await _context.Matches.FindAsync(id);

            if (match == null)
            {
                return NotFound();
            }

            return Ok(match);
        }

        /// <summary>
        /// GET: api/Matches/today.
        /// Retrieves today's matches.
        /// </summary>
        /// <returns>Today's matches.</returns>
        [HttpGet("today")]
        public IEnumerable<Match> GetTodaysMatches()
        {
            return _context.Matches
                .Where(m => m.Date.ToLocalTime().Date == DateTime.UtcNow.Date);
        }

        /// <summary>
        /// GET: api/Matches/bySport.
        /// Retrieves all matches for a particular sport.
        /// </summary>
        /// <param name="sportId">Sport ID.</param>
        /// <returns>Matches for a particular sport.</returns>
        [HttpGet("bySport/{sportId:int}")]
        public IEnumerable<Match> GetMatchesBySport([FromRoute] int sportId)
        {
            var matches = this._context.Matches
                .Where(c => c.SportID == sportId);

            return matches;
        }

        /// <summary>
        /// GET: api/Matches/byDateDifference/2.
        /// Retrieves all matches on specific date.
        /// The date is calculated based on date difference compared to today.
        /// </summary>
        /// <param name="dateDifferenceNumber">Day difference from today.</param>
        /// <returns>Matches on specific date.</returns>
        [HttpGet("byDateDifference/{dateDifferenceNumber:int}")]
        public IEnumerable<Match> GetMatchesByDateDifference([FromRoute] int dateDifferenceNumber)
        {
            var matches = _context.Matches
                .Where(m => m.Date.ToLocalTime().Date == DateTime.UtcNow.Date.AddDays(dateDifferenceNumber).Date);

            return matches;
        }

        /// <summary>
        /// GET: api/Matches/bySportDateDifference/2.
        /// Retrieves all matches on specific date for a particular sport.
        /// The date is calculated based on date difference compared to today.
        /// </summary>
        /// <param name="sportID">Sport ID.</param>
        /// <param name="dateDifferenceNumber">Day difference from today.</param>
        /// <returns>Matches on specific date for a particular sport.</returns>
        [HttpGet("bySportByDateDifference/{sportID:int}/{dateDifferenceNumber:int}")]
        public IEnumerable<Match> GetMatchesBySporByDateDifference([FromRoute] int sportID, [FromRoute] int dateDifferenceNumber)
        {
            var matches = _context.Matches
                .Where(m => m.Date.ToLocalTime().Date == DateTime.UtcNow.Date.AddDays(dateDifferenceNumber).Date
                            && m.SportID == sportID);

            return matches;
        }

        /// <summary>
        /// PUT: api/Matches/5.
        /// Updates a specific match.
        /// </summary>
        /// <param name="id">Match ID.</param>
        /// <param name="match">Match object.</param>
        /// <returns>Status code.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMatch([FromRoute] int id, [FromBody] Match match)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != match.ID)
            {
                return BadRequest();
            }

            _context.Entry(match).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatchExists(id))
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
        /// POST: api/Matches.
        /// Stores a match to the database.
        /// </summary>
        /// <param name="match">Match object.</param>
        /// <returns>CreatedAtActionResult object.</returns>
        [HttpPost]
        public async Task<IActionResult> PostMatch([FromBody] Match match)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Matches.Add(match);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMatch", new { id = match.ID }, match);
        }

        /// <summary>
        /// DELETE: api/Matches/5.
        /// Deletes a match. 
        /// </summary>
        /// <param name="id">Match ID.</param>
        /// <returns>OkObjectResult object (match).</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMatch([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var match = await _context.Matches.FindAsync(id);
            if (match == null)
            {
                return NotFound();
            }

            _context.Matches.Remove(match);
            await _context.SaveChangesAsync();

            return Ok(match);
        }

        /// <summary>
        /// Checks if particular match exists.
        /// </summary>
        /// <param name="id">Match ID.</param>
        /// <returns>Boolean.</returns>
        private bool MatchExists(int id)
        {
            return _context.Matches.Any(e => e.ID == id);
        }
    }
}
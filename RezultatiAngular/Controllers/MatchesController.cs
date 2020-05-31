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

            var match = await _context.Matches
                .Include(m => m.HomeTeam)
                .Include(m => m.AwayTeam)
                .Include(m => m.FootballMatchComponents)
                .Include(m => m.BasketballMatchComponents)
                .Include(m => m.IceHockeyMatchComponents)
                .Where(m => m.ID == id).FirstAsync();

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
        /// GET: api/Matches/byDateDifference/2.
        /// Retrieves all matches on specific date.
        /// The date is calculated based on date difference compared to today.
        /// </summary>
        /// <param name="dateDifferenceNumber">Day difference from today.</param>
        /// <returns>Matches.</returns>
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
        /// <returns>Matches.</returns>
        [HttpGet("bySportByDateDifference/{sportID:int}/{dateDifferenceNumber:int}")]
        public IEnumerable<Match> GetMatchesBySporByDateDifference([FromRoute] int sportID, [FromRoute] int dateDifferenceNumber)
        {
            IQueryable<Match> matches = Enumerable.Empty<Match>().AsQueryable();

            switch (sportID)
            {
                case 1:
                    matches = _context.Matches
                        .Include(m => m.HomeTeam)
                        .Include(m => m.AwayTeam)
                        .Include(m => m.FootballMatchComponents)
                        .Where(m => m.Date.ToLocalTime().Date == DateTime.UtcNow.Date.AddDays(dateDifferenceNumber).Date
                               && m.SportID == sportID);
                    break;

                case 2:
                    matches = _context.Matches
                        .Include(m => m.HomeTeam)
                        .Include(m => m.AwayTeam)
                        .Include(m => m.BasketballMatchComponents)
                        .Where(m => m.Date.ToLocalTime().Date == DateTime.UtcNow.Date.AddDays(dateDifferenceNumber).Date
                               && m.SportID == sportID);
                    break;

                case 5:
                    matches = _context.Matches
                        .Include(m => m.HomeTeam)
                        .Include(m => m.AwayTeam)
                        .Include(m => m.IceHockeyMatchComponents)
                        .Where(m => m.Date.ToLocalTime().Date == DateTime.UtcNow.Date.AddDays(dateDifferenceNumber).Date
                               && m.SportID == sportID);
                    break;
            }

            return matches;
        }

        /// <summary>
        /// GET: api/Matches/footballMatchDetails/2.
        /// Retrieves football match details for particular match.
        /// </summary>
        /// <param name="matchID">Match ID.</param>
        /// <returns>FootballMatchComponents.</returns>
        [HttpGet("footballMatchDetails/{matchID:int}")]
        public async Task<IActionResult> GetFootballMatchComponents([FromRoute] int matchID)
        {
            if (_context.FootballMatchComponents.Any(x => x.MatchID == matchID)) {
                var matchComponents = await _context.FootballMatchComponents.Where(x => x.MatchID == matchID).FirstAsync();

                return Ok(matchComponents);
            }

            return NotFound();
        }

        /// <summary>
        /// GET: api/Matches/basketballMatchDetails/2.
        /// Retrieves basketball match details for particular match.
        /// </summary>
        /// <param name="matchID">Match ID.</param>
        /// <returns>BasketballMatchComponents.</returns>
        [HttpGet("basketballMatchDetails/{matchID:int}")]
        public async Task<IActionResult> GetBasketballMatchComponents([FromRoute] int matchID)
        {
            if (_context.BasketballMatchComponents.Any(x => x.MatchID == matchID))
            {
                var matchComponents = await _context.BasketballMatchComponents.Where(x => x.MatchID == matchID).FirstAsync();

                return Ok(matchComponents);
            }

            return NotFound();
        }

        /// <summary>
        /// GET: api/Matches/iceHockeyMatchDetails/2.
        /// Retrieves ice hockey match details for particular match.
        /// </summary>
        /// <param name="matchID">Match ID.</param>
        /// <returns>IceHockeyMatchComponents.</returns>
        [HttpGet("iceHockeyMatchDetails/{matchID:int}")]
        public async Task<IActionResult> GetIceHockeyMatchComponents([FromRoute] int matchID)
        {
            if (_context.IceHockeyMatchComponents.Any(x => x.MatchID == matchID))
            {
                var matchComponents = await _context.IceHockeyMatchComponents.Where(x => x.MatchID == matchID).FirstAsync();

                return Ok(matchComponents);
            }

            return NotFound();
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
        /// PUT: api/Matches/footballMatchDetails/1.
        /// Updates components of a specific football match.
        /// </summary>
        /// <param name="id">Match ID.</param>
        /// <param name="matchComponents">FootballMatchComponents object.</param>
        /// <returns>Status code.</returns>
        [HttpPut("footballMatchDetails/{id:int}")]
        public async Task<IActionResult> PutFootballMatchComponents([FromRoute] int id, [FromBody] FootballMatchComponents matchComponents)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != matchComponents.MatchID)
            {
                return BadRequest();
            }

            _context.Entry(matchComponents).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatchComponentsExist(id))
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
        /// PUT: api/Matches/basketballMatchDetails/1.
        /// Updates components of a specific basketball match.
        /// </summary>
        /// <param name="id">Match ID.</param>
        /// <param name="matchComponents">BasketballMatchComponents object.</param>
        /// <returns>Status code.</returns>
        [HttpPut("basketballMatchDetails/{id:int}")]
        public async Task<IActionResult> PutBasketballMatchComponents([FromRoute] int id, [FromBody] BasketballMatchComponents matchComponents)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != matchComponents.MatchID)
            {
                return BadRequest();
            }

            _context.Entry(matchComponents).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatchComponentsExist(id))
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
        /// PUT: api/Matches/iceHockeyMatchDetails/1.
        /// Updates components of a specific ice hockey match.
        /// </summary>
        /// <param name="id">Match ID.</param>
        /// <param name="matchComponents">IceHockeyMatchComponents object.</param>
        /// <returns>Status code.</returns>
        [HttpPut("iceHockeyMatchDetails/{id:int}")]
        public async Task<IActionResult> PutIceHockeyMatchComponents([FromRoute] int id, [FromBody] IceHockeyMatchComponents matchComponents)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != matchComponents.MatchID)
            {
                return BadRequest();
            }

            _context.Entry(matchComponents).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatchComponentsExist(id))
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
        /// POST: api/Matches/footballMatchDetails.
        /// Stores football match components to the database.
        /// </summary>
        /// <param name="matchComponents">FootballMatchComponents object.</param>
        /// <returns>CreatedAtActionResult object.</returns>
        [HttpPost("footballMatchDetails")]
        public async Task<IActionResult> PostFootballMatchComponents([FromBody] FootballMatchComponents matchComponents)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.FootballMatchComponents.Add(matchComponents);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFootballMatchComponents", new { matchID = matchComponents.MatchID }, matchComponents);
        }

        /// <summary>
        /// POST: api/Matches/basketballMatchDetails.
        /// Stores basketball match components to the database.
        /// </summary>
        /// <param name="matchComponents">BasketballMatchComponents object.</param>
        /// <returns>CreatedAtActionResult object.</returns>
        [HttpPost("basketballMatchDetails")]
        public async Task<IActionResult> PostBasketballMatchComponents([FromBody] BasketballMatchComponents matchComponents)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.BasketballMatchComponents.Add(matchComponents);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBasketballMatchComponents", new { matchID = matchComponents.MatchID }, matchComponents);
        }

        /// <summary>
        /// POST: api/Matches/iceHockeylMatchDetails.
        /// Stores ice hockey match components to the database.
        /// </summary>
        /// <param name="matchComponents">IceHockeyMatchComponents object.</param>
        /// <returns>CreatedAtActionResult object.</returns>
        [HttpPost("iceHockeyMatchDetails")]
        public async Task<IActionResult> PostIceHockeyMatchComponents([FromBody] IceHockeyMatchComponents matchComponents)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.IceHockeyMatchComponents.Add(matchComponents);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIceHockeyMatchComponents", new { matchID = matchComponents.MatchID }, matchComponents);
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

        /// <summary>
        /// Checks if particular match exists.
        /// </summary>
        /// <param name="id">Match ID.</param>
        /// <returns>Boolean.</returns>
        private bool MatchComponentsExist(int id)
        {
            if (_context.FootballMatchComponents.Any(x => x.MatchID == id)
                || _context.BasketballMatchComponents.Any(x => x.MatchID == id)
                || _context.IceHockeyMatchComponents.Any(x => x.MatchID == id))
            {
                return true;
            }

            return false;
        }
    }
}
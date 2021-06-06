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
    public class CompetitionsController : ControllerBase
    {
        private readonly ScoreManagerDbContext _context;

        public CompetitionsController(ScoreManagerDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// GET: api/Competitions.
        /// Retrieves all competitions from the database.
        /// </summary>
        /// <returns>All competitions.</returns>
        [HttpGet]
        public IEnumerable<Competition> GetCompetitions()
        {
            return _context.Competitions;
        }

        /// <summary>
        /// GET: api/Competitions/5.
        /// Retrieves the specific competition.
        /// </summary>
        /// <param name="id">Competition ID.</param>
        /// <returns>OkObjectResult object (competition).</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompetition([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var competition = await _context.Competitions.FindAsync(id);

            if (competition == null)
            {
                return NotFound();
            }

            return Ok(competition);
        }

        /// <summary>
        /// GET: api/Competitions/competitionsBySport/1.
        /// Retrieves all competitions for a particular sport.
        /// </summary>
        /// <param name="sportId">Sport ID.</param>
        /// <returns>Competitions.</returns>
        [HttpGet("competitionsBySport/{sportId:int}")]
        public IEnumerable<Competition> GetCompetitionsBySport([FromRoute] int sportId)
        {
            var competitions = this._context.Competitions
                .Where(c => c.SportID == sportId);

            return competitions;
        }

        /// <summary>
        /// GET: api/Competitions/possibleCompetitionsForTeam/1.
        /// Retrieves possible competitions for a particular team.
        /// </summary>
        /// <param name="teamID">Team ID.</param>
        /// <returns>Competitions.</returns>
        [HttpGet("possibleCompetitionsForTeam/{teamID:int}")]
        public IEnumerable<Competition> GetPossibleCompetitionsForTeam([FromRoute] int teamID)
        {
            var sportID = _context.Teams
                .Where(t => t.ID == teamID)
                .Select(t => t.SportID)
                .SingleOrDefault();

            var competitions = _context.Competitions
                .Where(t => !t.CompetitionTeams.Any(c => c.TeamID == teamID) && t.SportID == sportID);

            return competitions;
        }

        /// <summary>
        /// PUT: api/Competitions/5.
        /// Updates a specific competition.
        /// </summary>
        /// <param name="id">Competition ID.</param>
        /// <param name="competition">Competition object.</param>
        /// <returns>Status code.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompetition([FromRoute] int id, [FromBody] Competition competition)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != competition.ID)
            {
                return BadRequest();
            }

            _context.Entry(competition).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompetitionExists(id))
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
        /// POST: api/Competitions.
        /// Stores a competition to the database.
        /// </summary>
        /// <param name="competition">Competition object.</param>
        /// <returns>CreatedAtActionResult object.</returns>
        [HttpPost]
        public async Task<IActionResult> PostCompetition([FromBody] Competition competition)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Competitions.Add(competition);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompetition", new { id = competition.ID }, competition);
        }

        /// <summary>
        /// DELETE: api/Competitions/5.
        /// Deletes a competition from the database.
        /// </summary>
        /// <param name="id">Competition ID.</param>
        /// <returns>OkObjectResult object (competition).</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompetition([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var competition = await _context.Competitions.FindAsync(id);
            if (competition == null)
            {
                return NotFound();
            }

            _context.Competitions.Remove(competition);
            await _context.SaveChangesAsync();

            return Ok(competition);
        }

        /// <summary>
        /// Checks if particular competition exists.
        /// </summary>
        /// <param name="id">Sport ID.</param>
        /// <returns>Boolean.</returns>
        private bool CompetitionExists(int id)
        {
            return _context.Competitions.Any(e => e.ID == id);
        }
    }
}
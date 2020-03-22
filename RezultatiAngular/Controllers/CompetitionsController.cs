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
    public class CompetitionsController : ControllerBase
    {
        private readonly ScoreManagerDbContext _context;

        public CompetitionsController(ScoreManagerDbContext context)
        {
            _context = context;
        }

        // GET: api/Competitions
        [HttpGet]
        public IEnumerable<Competition> GetCompetitions()
        {
            return _context.Competitions;
        }

        // GET: api/Competitions/5
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

        // GET: api/Competitions/competitionsBySport/1
        [HttpGet("competitionsBySport/{sportId:int}")]
        public ActionResult<List<Competition>> GetCompetitionsBySport([FromRoute] int sportId)
        {
            var competitions = this._context.Competitions
                .Where(c => c.SportID == sportId)
                .ToList();

            return competitions;
        }

        // GET: api/Competitions/possibleCompetitionsForTeam/1
        [HttpGet("possibleCompetitionsForTeam/{teamID:int}")]
        public ActionResult<List<Competition>> GetPossibleCompetitionsForTeam([FromRoute] int teamID)
        {
            var sportID = _context.Teams
                .Where(t => t.ID == teamID)
                .Select(t => t.SportID)
                .SingleOrDefault();

            var competitions = _context.Competitions
                .Where(t => !t.CompetitionTeams.Any(c => c.TeamID == teamID) && t.SportID == sportID)
                .ToList();

            return competitions;
        }

        // PUT: api/Competitions/5
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

        // POST: api/Competitions
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

        // DELETE: api/Competitions/5
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

        private bool CompetitionExists(int id)
        {
            return _context.Competitions.Any(e => e.ID == id);
        }
    }
}
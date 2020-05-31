using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RezultatiAngular.Models;

namespace RezultatiAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly ScoreManagerDbContext _context;
        private IHostingEnvironment _hostingEnviroment;

        public TeamsController(ScoreManagerDbContext context, IHostingEnvironment environment)
        {
            _context = context;
            _hostingEnviroment = environment;
        }

        /// <summary>
        /// GET: api/Teams.
        /// Retrieves all teams.
        /// </summary>
        /// <returns>Teams.</returns>
        [HttpGet]
        public IEnumerable<Team> GetTeams()
        {
            var teams = _context.Teams;
            return teams;
        }

        /// <summary>
        /// GET: api/Teams/5.
        /// Retrieves the specific team.
        /// </summary>
        /// <param name="id">Team ID.</param>
        /// <returns>OkObjectResult object (team).</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTeam([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var team = await _context.Teams.FindAsync(id);

            if (team == null)
            {
                return NotFound();
            }

            return Ok(team);
        }

        /// <summary>
        /// GET: api/Teams/teamsByCompetition/1.
        /// Retrieves all teams for a particular competition.
        /// </summary>
        /// <param name="competitionID">Competition ID.</param>
        /// <returns>Teams.</returns>
        [HttpGet("teamsByCompetition/{competitionID:int}")]
        public IEnumerable<Team> GetTeamsByCompetition([FromRoute] int competitionID)
        {
            var teams = _context.Teams.Where(t => t.CompetitionTeams.Any(c => c.CompetitionID == competitionID));

            return teams;
        }

        /// <summary>
        /// GET: api/Teams/teamsBySport/1.
        /// Retrieves all teams for a particular sport.
        /// </summary>
        /// <param name="sportID">Sport ID.</param>
        /// <returns>Teams.</returns>
        [HttpGet("teamsBySport/{sportID:int}")]
        public IEnumerable<Team> GetTeamsBySport([FromRoute] int sportID)
        {
            var teams = _context.Teams.Where(t => t.SportID == sportID);

            return teams;
        }

        /// <summary>
        /// PUT: api/Teams/5.
        /// Updates a specific team.
        /// </summary>
        /// <param name="id">Team ID.</param>
        /// <param name="team">Team object.</param>
        /// <returns>Status code.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeam([FromRoute] int id, [FromBody] Team team)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != team.ID)
            {
                return BadRequest();
            }

            _context.Entry(team).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamExists(id))
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
        /// POST: api/Teams.
        /// Stores a team to the database.
        /// </summary>
        /// <param name="team">Team object.</param>
        /// <returns>CreatedAtActionResult object.</returns>
        [HttpPost]
        public async Task<IActionResult> PostTeam([FromBody] Team team)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Teams.Add(team);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeam", new { id = team.ID }, team);
        }

        /// <summary>
        /// DELETE: api/Teams/5.
        /// Deletes a team from the database.
        /// </summary>
        /// <param name="id">Team ID.</param>
        /// <returns>OkObjectResult object (team).</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var team = await _context.Teams.FindAsync(id);
            if (team == null)
            {
                return NotFound();
            }

            _context.Teams.Remove(team);
            await _context.SaveChangesAsync();

            return Ok(team);
        }

        /// <summary>
        /// POST: api/Teams/addTeamToCompetition.
        /// Creates a team-competition connection (new database record).
        /// </summary>
        /// <param name="competitionTeam">CompetitionTeam object.</param>
        /// <returns>Status code.</returns>
        [HttpPost("addTeamToCompetition")]
        public async Task<IActionResult> PostTeamToCompetition([FromBody] CompetitionTeam competitionTeam)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.CompetitionTeams.Add(competitionTeam);
            await _context.SaveChangesAsync();

            return Ok();
        }

        /// <summary>
        /// POST: api/Teams/upload/4.
        /// Stores logo URL for specific team to the database.
        /// </summary>
        /// <param name="teamId">Team ID.</param>
        /// <returns>Status code.</returns>
        [HttpPost("upload/{teamId}"), DisableRequestSizeLimit]
        public async Task<IActionResult> UploadAttachment([FromRoute] int teamId)
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    _context.Attachments.Add(new Attachment()
                    {
                        TeamID = teamId,
                        Image = dbPath
                    });

                    await _context.SaveChangesAsync();

                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        /// <summary>
        /// PUT: api/Teams/updateLogo/4.
        /// Updates a specific team's logo.
        /// </summary>
        /// <param name="teamId">Team ID.</param>
        /// <returns>Status code.</returns>
        [HttpPut("updateLogo/{teamId}"), DisableRequestSizeLimit]
        public async Task<IActionResult> UpdateAttachment([FromRoute] int teamId)
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    var logo = await _context.Attachments
                        .Where(x => x.TeamID == teamId)
                        .FirstOrDefaultAsync();

                    logo.Image = dbPath;

                    _context.Entry(logo).State = EntityState.Modified;

                    try
                    {
                        await _context.SaveChangesAsync();
                    }

                    catch (DbUpdateConcurrencyException)
                    {
                        if (!TeamExists(teamId))
                        {
                            return NotFound();
                        }
                        else
                        {
                            throw;
                        }
                    }

                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        /// <summary>
        /// GET: api/Teams/uploads/1.
        /// Retrieves logo of specific team.
        /// </summary>
        /// <param name="id">Team ID.</param>
        /// <returns>Status code.</returns>
        [HttpGet("uploads/{id}")]
        public async Task<IActionResult> GetAttachment([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var image = await _context.Attachments
                .Where(x => x.TeamID == id)
                .LastOrDefaultAsync();

            if (image == null)
            {
                return NoContent();
            }

            var imageLink = image.Image;

            return Ok(new { imageLink });
        }

        /// <summary>
        /// Checks if particular team exists.
        /// </summary>
        /// <param name="id">Team ID.</param>
        /// <returns>Boolean.</returns>
        private bool TeamExists(int id)
        {
            return _context.Teams.Any(e => e.ID == id);
        }
    }
}
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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

        // GET: api/Teams
        [HttpGet]
        public IEnumerable<Team> GetTeams()
        {
            var teams = _context.Teams;
            return teams;
        }

        // GET: api/Teams/5
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

        [HttpGet("teamsByCompetition/{competitionID:int}")]
        public IEnumerable<Team> GetTeamsByCompetition([FromRoute] int competitionID)
        {
            var teams = _context.Teams.Where(t => t.CompetitionTeams.Any(c => c.CompetitionID == competitionID)).ToList();

            return teams;
        }

        [HttpGet("teamsBySport/{sportID:int}")]
        public IEnumerable<Team> GetTeamsBySport([FromRoute] int sportID)
        {
            var teams = _context.Teams.Where(t => t.SportID == sportID).ToList();

            return teams;
        }

        // PUT: api/Teams/5
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

        // POST: api/Teams
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

        // DELETE: api/Teams/5
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

        // POST: api/Teams/addTeamToCompetition
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

        [HttpPost("updateLogo/{teamId}"), DisableRequestSizeLimit]
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

                    var logo = await _context.Attachments.Where(x => x.TeamID == teamId).FirstOrDefaultAsync();

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

        [HttpGet("uploads/{id}")]
        public async Task<IActionResult> GetAttachment([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var image = await _context.Attachments.Where(x => x.TeamID == id).LastOrDefaultAsync();

            if (image == null)
            {
                return NoContent();
            }

            var imageLink = image.Image;

            return Ok(new { imageLink });
        }

        private bool TeamExists(int id)
        {
            return _context.Teams.Any(e => e.ID == id);
        }
    }
}
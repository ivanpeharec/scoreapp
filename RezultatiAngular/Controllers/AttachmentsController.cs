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
    public class AttachmentsController : ControllerBase
    {
        private readonly ScoreManagerDbContext _context;

        public AttachmentsController(ScoreManagerDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// GET: api/Attachments.
        /// Retrieves all attachments.
        /// </summary>
        /// <returns>Attachments.</returns>
        [HttpGet]
        public IEnumerable<Attachment> GetAttachments()
        {
            return _context.Attachments;
        }

        /// <summary>
        /// GET: api/Attachments/5.
        /// Retrieves the specific attachment.
        /// </summary>
        /// <param name="id">Attachment ID.</param>
        /// <returns>OkObjectResult object (attachment).</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAttachment([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var attachment = await _context.Attachments.FindAsync(id);

            if (attachment == null)
            {
                return NotFound();
            }

            return Ok(attachment);
        }

        /// <summary>
        /// PUT: api/Attachments/5.
        /// Updates a specific attachment.
        /// </summary>
        /// <param name="id">Attachment ID.</param>
        /// <param name="attachment">Attachment object.</param>
        /// <returns>Status code.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAttachment([FromRoute] int id, [FromBody] Attachment attachment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != attachment.ID)
            {
                return BadRequest();
            }

            _context.Entry(attachment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AttachmentExists(id))
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
        /// POST: api/Attachments.
        /// Stores an attachment to the database.
        /// </summary>
        /// <param name="attachment">Attachment object.</param>
        /// <returns>CreatedAtActionResult object.</returns>
        [HttpPost]
        public async Task<IActionResult> PostAttachment([FromBody] Attachment attachment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Attachments.Add(attachment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAttachment", new { id = attachment.ID }, attachment);
        }

        /// <summary>
        /// DELETE: api/Attachments/5.
        /// Deletes an attachment. 
        /// </summary>
        /// <param name="id">Attachment ID.</param>
        /// <returns>OkObjectResult object (attachment).</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAttachment([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var attachment = await _context.Attachments.FindAsync(id);
            if (attachment == null)
            {
                return NotFound();
            }

            _context.Attachments.Remove(attachment);
            await _context.SaveChangesAsync();

            return Ok(attachment);
        }

        /// <summary>
        /// Checks if particular attachment exists.
        /// </summary>
        /// <param name="id">Attachment ID.</param>
        /// <returns>Boolean.</returns>
        private bool AttachmentExists(int id)
        {
            return _context.Attachments.Any(e => e.ID == id);
        }
    }
}
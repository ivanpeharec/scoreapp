using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RezultatiAngular.Models
{
    public class Team
    {
        /// <summary>
        /// ID of the team.
        /// </summary>
        [Key]
        public int ID { get; set; }

        /// <summary>
        /// Name of the team.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Sport ID this team belongs to.
        /// </summary>
        [ForeignKey("Sport")]
        public int SportID { get; set; }

        /// <summary>
        /// Sport object this team belongs to.
        /// </summary>
        public Sport Sport { get; set; }

        /// <summary>
        /// Match list of this team.
        /// </summary>
        public virtual ICollection<Match> Matches { get; set; }

        /// <summary>
        /// Competition - Team mapping list of this team.
        /// </summary>
        public virtual ICollection<CompetitionTeam> CompetitionTeams { get; set; }

        /// <summary>
        /// Attachment list of this team.
        /// </summary>
        public virtual ICollection<Attachment> Attachments { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RezultatiAngular.Models
{
    public class Team
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }

        [ForeignKey("Sport")]
        public int SportID { get; set; }
        public Sport Sport { get; set; }

        public virtual ICollection<Match> Matches { get; set; }
        public virtual ICollection<CompetitionTeam> CompetitionTeams { get; set; }
        public virtual ICollection<Attachment> Attachments { get; set; }
    }
}

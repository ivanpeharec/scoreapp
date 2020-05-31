using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RezultatiAngular.Models
{
    public class Competition
    {
        /// <summary>
        /// Competition ID.
        /// </summary>
        [Key]
        public int ID { get; set; }

        /// <summary>
        /// Competition name.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Sport ID for particular competition.
        /// </summary>
        [ForeignKey("Sport")]
        public int SportID { get; set; }

        /// <summary>
        /// Sport the competition belongs to.
        /// </summary>
        public virtual Sport Sport { get; set; }

        /// <summary>
        /// Match list for the particular competition.
        /// </summary>
        public virtual ICollection<Match> Matches { get; set; }

        /// <summary>
        /// Competition - Team connection collection.
        /// </summary>
        public virtual ICollection<CompetitionTeam> CompetitionTeams { get; set; }
    }
}

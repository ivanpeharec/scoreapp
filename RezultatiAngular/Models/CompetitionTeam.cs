using System;
using System.Collections.Generic;
using System.Text;

namespace RezultatiAngular.Models
{
    public class CompetitionTeam
    {
        /// <summary>
        /// Competition ID.
        /// </summary>
        public int CompetitionID { get; set; }

        /// <summary>
        /// Team ID.
        /// </summary>
        public int TeamID { get; set; }

        /// <summary>
        /// Determines if the team is currently active in the competition.
        /// </summary>
        public bool Active { get; set; }

        /// <summary>
        /// Competition.
        /// </summary>
        public Competition Competition { get; set; }

        /// <summary>
        /// Team.
        /// </summary>
        public Team Team { get; set; }
    }
}

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
        public virtual Competition Competition { get; set; }

        /// <summary>
        /// Team.
        /// </summary>
        public virtual Team Team { get; set; }
    }
}

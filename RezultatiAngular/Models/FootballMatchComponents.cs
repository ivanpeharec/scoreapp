using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RezultatiAngular.Models
{
    public class FootballMatchComponents
    {
        /// <summary>
        /// ID of the match these components belong to.
        /// </summary>
        [Key]
        [ForeignKey("Match")]
        public int MatchID { get; set; }

        /// <summary>
        /// Score of the home team at half time.
        /// </summary>
        public int? HalfTimeHomeTeamScore { get; set; }

        /// <summary>
        /// Score of the away team at half time.
        /// </summary>
        public int? HalfTimeAwayTeamScore { get; set; }

        /// <summary>
        /// Score of the home team at full time.
        /// </summary>
        public int? HomeTeamScore { get; set; }

        /// <summary>
        /// Score of the away team at full time.
        /// </summary>
        public int? AwayTeamScore { get; set; }

        /// <summary>
        /// Match these components belong to.
        /// </summary>
        public virtual Match Match { get; set; }
    }
}

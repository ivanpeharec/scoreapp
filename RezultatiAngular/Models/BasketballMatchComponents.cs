using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RezultatiAngular.Models
{
    public class BasketballMatchComponents
    {
        /// <summary>
        /// ID of the match these components belong to.
        /// </summary>
        [Key]
        [ForeignKey("Match")]
        public int MatchID { get; set; }

        /// <summary>
        /// Score of the home team after first quarter.
        /// </summary>
        public int? FirstQuarterHomeTeamScore { get; set; }

        /// <summary>
        /// Score of the away team after first quarter.
        /// </summary>
        public int? FirstQuarterAwayTeamScore { get; set; }

        /// <summary>
        /// Score of the home team after second quarter.
        /// </summary>
        public int? SecondQuarterHomeTeamScore { get; set; }

        /// <summary>
        /// Score of the away team after second quarter.
        /// </summary>
        public int? SecondQuarterAwayTeamScore { get; set; }

        /// <summary>
        /// Score of the home team after third quarter.
        /// </summary>
        public int? ThirdQuarterHomeTeamScore { get; set; }

        /// <summary>
        /// Score of the away team after third quarter.
        /// </summary>
        public int? ThirdQuarterAwayTeamScore { get; set; }

        /// <summary>
        /// Score of the home team after fourth quarter.
        /// </summary>
        public int? FourthQuarterHomeTeamScore { get; set; }

        /// <summary>
        /// Score of the away team after fourth quarter.
        /// </summary>
        public int? FourthQuarterAwayTeamScore { get; set; }

        /// <summary>
        /// Match these components belong to.
        /// </summary>
        public virtual Match Match { get; set; }
    }
}

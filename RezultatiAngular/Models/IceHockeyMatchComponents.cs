using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RezultatiAngular.Models
{
    public class IceHockeyMatchComponents
    {
        /// <summary>
        /// ID of the match these components belong to.
        /// </summary>
        [Key]
        [ForeignKey("Match")]
        public int MatchID { get; set; }

        /// <summary>
        /// Score of the home team after first period.
        /// </summary>
        public int? FirstPeriodHomeTeamScore { get; set; }

        /// <summary>
        /// Score of the away team after first period.
        /// </summary>
        public int? FirstPeriodAwayTeamScore { get; set; }

        /// <summary>
        /// Score of the home team after second period.
        /// </summary>
        public int? SecondPeriodHomeTeamScore { get; set; }

        /// <summary>
        /// Score of the away team after second period.
        /// </summary>
        public int? SecondPeriodAwayTeamScore { get; set; }

        /// <summary>
        /// Score of the home team after third period.
        /// </summary>
        public int? ThirdPeriodHomeTeamScore { get; set; }

        /// <summary>
        /// Score of the away team after third period.
        /// </summary>
        public int? ThirdPeriodAwayTeamScore { get; set; }

        /// <summary>
        /// Match these components belong to.
        /// </summary>
        public virtual Match Match { get; set; }
    }
}

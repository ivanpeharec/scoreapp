using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RezultatiAngular.Models
{
    public class Match
    {
        /// <summary>
        /// Match date.
        /// </summary>
        [Key]
        public int ID { get; set; }
        [Required(ErrorMessage = "Date has to be selected!")]
        public DateTime Date { get; set; }

        /// <summary>
        /// Sport ID for the particular match.
        /// </summary>
        [ForeignKey("Sport")]
        [Required(ErrorMessage = "Sport has to be selected!")]
        public int SportID { get; set; }

        /// <summary>
        /// Sport the match belongs to.
        /// </summary>
        public Sport Sport { get; set; }

        /// <summary>
        /// Competition ID for the particular match.
        /// </summary>
        [ForeignKey("Competition")]
        [Required(ErrorMessage = "Competition has to be selected!")]
        [Range(1, Int32.MaxValue, ErrorMessage = "Competition has to be selected!")]
        public int CompetitionID { get; set; }

        /// <summary>
        /// Competition the match belongs to.
        /// </summary>
        public Competition Competition { get; set; }

        /// <summary>
        /// ID of the home team.
        /// </summary>
        [ForeignKey("HomeTeam")]
        [Required(ErrorMessage = "Home team has to be selected!")]
        [Range(1, Int32.MaxValue, ErrorMessage = "Home team has to be selected!")]
        public int HomeTeamID { get; set; }

        /// <summary>
        /// Home team of the match.
        /// </summary>
        public Team HomeTeam { get; set; }

        /// <summary>
        /// ID of the away team.
        /// </summary>
        [ForeignKey("AwayTeam")]
        [Required(ErrorMessage = "Away team has to be selected!")]
        [Range(1, Int32.MaxValue, ErrorMessage = "Away team has to be selected!")]
        public int AwayTeamID { get; set; }

        /// <summary>
        /// Away team of the match.
        /// </summary>
        public Team AwayTeam { get; set; }

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
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RezultatiAngular.Models
{
    public class Match
    {
        [Key]
        public int ID { get; set; }
        [Required(ErrorMessage = "Date has to be selected!")]
        public DateTime Date { get; set; }

        [ForeignKey("Sport")]
        [Required(ErrorMessage = "Sport has to be selected!")]
        public int SportID { get; set; }
        public Sport Sport { get; set; }

        [ForeignKey("Competition")]
        [Required(ErrorMessage = "Competition has to be selected!")]
        [Range(1, Int32.MaxValue, ErrorMessage = "Competition has to be selected!")]
        public int CompetitionID { get; set; }
        public Competition Competition { get; set; }

        [ForeignKey("HomeTeam")]
        [Required(ErrorMessage = "Home team has to be selected!")]
        [Range(1, Int32.MaxValue, ErrorMessage = "Home team has to be selected!")]
        public int HomeTeamID { get; set; }

        public Team HomeTeam { get; set; }

        [ForeignKey("AwayTeam")]
        [Required(ErrorMessage = "Away team has to be selected!")]
        [Range(1, Int32.MaxValue, ErrorMessage = "Away team has to be selected!")]
        public int AwayTeamID { get; set; }
        public Team AwayTeam { get; set; }

        public int? HalfTimeHomeTeamScore { get; set; }

        public int? HalfTimeAwayTeamScore { get; set; }

        public int? HomeTeamScore { get; set; }
        
        public int? AwayTeamScore { get; set; }
    }
}

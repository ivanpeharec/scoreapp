using System;
using System.Collections.Generic;
using System.Text;

namespace RezultatiAngular.Models
{
    public class CompetitionTeam
    {
        public int CompetitionID { get; set; }
        public int TeamID { get; set; }

        public bool Active { get; set; }

        public Competition Competition { get; set; }
        public Team Team { get; set; }
    }
}

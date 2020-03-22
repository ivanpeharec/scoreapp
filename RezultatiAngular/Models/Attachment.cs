using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RezultatiAngular.Models
{
    public class Attachment
    {
        public int ID { get; set; }

        [ForeignKey(nameof(Team))]
        public int TeamID { get; set; }

        public Team Team { get; set; }

        public string Image { get; set; }
    }
}

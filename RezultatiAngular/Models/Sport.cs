using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RezultatiAngular.Models
{
    public class Sport
    {
        [Key]
        public int ID { get; set; }

        [Required(ErrorMessage = "Sport name has to be populated!")]
        public string Name { get; set; }

        public virtual ICollection<Match> Matches { get; set; }
        public virtual ICollection<Competition> Competitions { get; set; }
    }
}

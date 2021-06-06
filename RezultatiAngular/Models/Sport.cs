using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RezultatiAngular.Models
{
    public class Sport
    {
        /// <summary>
        /// Sport ID.
        /// </summary>
        [Key]
        public int ID { get; set; }

        /// <summary>
        /// Name of the sport.
        /// </summary>
        [Required(ErrorMessage = "Sport name has to be populated!")]
        public string Name { get; set; }

        /// <summary>
        /// Match list for this sport.
        /// </summary>
        public virtual ICollection<Match> Matches { get; set; }

        /// <summary>
        /// Competition list for this sport.
        /// </summary>
        public virtual ICollection<Competition> Competitions { get; set; }
    }
}

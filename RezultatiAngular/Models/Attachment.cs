using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RezultatiAngular.Models
{
    public class Attachment
    {
        /// <summary>
        /// Attachment ID.
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// ID of the team the attachment belongs to.
        /// </summary>
        [ForeignKey(nameof(Team))]
        public int TeamID { get; set; }

        /// <summary>
        /// Team object.
        /// </summary>
        public Team Team { get; set; }

        /// <summary>
        /// Relative attachment path.
        /// </summary>
        public string Image { get; set; }
    }
}

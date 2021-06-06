using System.ComponentModel.DataAnnotations.Schema;

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
        /// Relative attachment path.
        /// </summary>
        public string Image { get; set; }

        /// <summary>
        /// Team object.
        /// </summary>
        public virtual Team Team { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RezultatiAngular.Models
{
    public class ApplicationUserModel
    {
        /// <summary>
        /// Username.
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// Email.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Password.
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// User's role.
        /// </summary>
        public string Role { get; set; }
    }
}

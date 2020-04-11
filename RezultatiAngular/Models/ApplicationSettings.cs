using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RezultatiAngular.Models
{
    public class ApplicationSettings
    {
        /// <summary>
        /// JSON Web Token secret key.
        /// </summary>
        public string JWT_Secret { get; set; }
    }
}

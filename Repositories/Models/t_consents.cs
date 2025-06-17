using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repositories.Models
{
    public class t_consents
    {
        public int c_consent_id { get; set; }
        public int c_user_id { get; set; }
        public int c_partner_id { get; set; }
        public string c_purpose { get; set; }
        public DateTime c_start_time { get; set; }
        public DateTime c_end_time { get; set; }
        public string c_status { get; set; } // "Active", "Revoked", "Expired"
        public DateTime c_created_at { get; set; }
    }

}
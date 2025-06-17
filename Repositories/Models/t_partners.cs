using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repositories.Models
{
    public class t_partners
    {
        public int c_partner_id { get; set; }
        public string c_partner_name { get; set; }
        public bool c_is_verified { get; set; }
        public DateTime c_created_at { get; set; }
    }

}
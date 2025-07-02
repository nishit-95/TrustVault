using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repositories.Models
{
    public class t_partner_access
    {
        public int c_access_id { get; set; }
        public string c_document_name { get; set; }
        public DateTime c_access_time { get; set; }
        public int c_partner_id { get; set; }
        public string c_location { get; set; }
        public string c_notes { get; set; }

    }
}
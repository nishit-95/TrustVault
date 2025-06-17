using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repositories.Models
{
    public class t_access_logs
    {
        public int c_log_id { get; set; }
        public int c_consent_id { get; set; }
        public DateTime c_access_time { get; set; }
        public string? c_accessed_by { get; set; }
        public string? c_ip_address { get; set; }
        public string? c_location { get; set; }
        public string? c_notes { get; set; }
    }

}
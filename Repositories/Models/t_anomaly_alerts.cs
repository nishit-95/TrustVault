using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repositories.Models
{
    public class t_anomaly_alerts
    {
        public int c_alert_id { get; set; }
        public int c_user_id { get; set; }
        public DateTime c_trigger_time { get; set; }
        public string c_description { get; set; }
        public bool c_resolved { get; set; }
    }

}
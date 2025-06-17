using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repositories.Models
{
    public class t_data_types
    {
        public int c_data_id { get; set; }
        public string c_data_name { get; set; }
        public string c_sensitivity_level { get; set; } // "Low", "Medium", "High"
    }

}
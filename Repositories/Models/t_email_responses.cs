using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repositories.Models
{
    public class t_email_responses
    {
        public int c_response_id { get; set; }         // Sr. No. (Primary Key)

        public string c_email_id { get; set; }         // Email ID

        public DateTime c_date { get; set; }           // Date only

        public TimeSpan c_time { get; set; }   
    }
}
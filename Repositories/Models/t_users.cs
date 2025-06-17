using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repositories.Models
{
    public class t_users
    {
        public int c_user_id { get; set; }
        public string c_full_name { get; set; }
        public string c_email { get; set; }
        public string c_password_hash { get; set; }
        public string? c_phone { get; set; }
        public string? c_country { get; set; }
        public DateTime c_created_at { get; set; }
    }

}
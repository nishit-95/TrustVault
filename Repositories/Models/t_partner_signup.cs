using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repositories.Models
{
    public class t_partner_signup
    {
        public string c_partner_id { get; set; }
        public string c_company_name { get; set; }

        public string c_email { get; set; }

        public string c_phone { get; set; }

        public string c_country { get; set; }

        public string c_password { get; set; }

        public string c_confirm_password { get; set; }


    }
}
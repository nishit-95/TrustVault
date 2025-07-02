using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repositories.Models;

namespace Repositories.Interfaces
{
    public interface ICompanyService
    {
        //  Register New Partner
        Task<t_partners> RegisterPartnerAsync(t_partners partner);

        //  Partner Login (if needed)
        Task<t_partners?> LoginAsync(string email, string password); // Optional authentication for demo

        //  Partner Info
        Task<t_partners?> GetPartnerByIdAsync(int partnerId);
        
        Task<bool> UpdatePartnerAsync(t_partners partner);
        Task<bool> DeletePartnerAsync(int partnerId);

        //  Consent Access
        Task<IEnumerable<t_req_data>> GetPartnerConsentsAsync(int partnerId);

        //  Access Logs
        Task<IEnumerable<t_partner_access>> GetAccessLogsAsync(int partnerId);

        //  Verification
        Task<bool> VerifyPartnerAsync(int partnerId);
    }

}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repositories.Interfaces;
using Repositories.Models;

namespace Repositories.Implementations
{
    public class CompanyService : ICompanyService
    {
        public Task<bool> DeletePartnerAsync(int partnerId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<t_access_logs>> GetAccessLogsAsync(int partnerId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<t_partners>> GetAllPartnersAsync()
        {
            throw new NotImplementedException();
        }

        public Task<t_partners?> GetPartnerByIdAsync(int partnerId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<t_consents>> GetPartnerConsentsAsync(int partnerId)
        {
            throw new NotImplementedException();
        }

        public Task<t_partners?> LoginAsync(string email, string partnerKey)
        {
            throw new NotImplementedException();
        }

        public Task<t_partners> RegisterPartnerAsync(t_partners partner)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdatePartnerAsync(t_partners partner)
        {
            throw new NotImplementedException();
        }

        public Task<bool> VerifyPartnerAsync(int partnerId)
        {
            throw new NotImplementedException();
        }
    }
}
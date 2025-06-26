using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Repositories.Interfaces;
using Repositories.Models;

namespace Repositories.Implementations
{
    public class CompanyService : ICompanyService
    {
         private readonly SqlConnection _conn;
        public CompanyService(SqlConnection conn)
        {
            _conn = conn;
        }

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
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                using (var cmd = new SqlCommand("SELECT * FROM t_partners WHERE c_is_verified = 1", _conn))
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        var partners = new List<t_partners>();
                        while (reader.Read())
                        {
                            var partner = new t_partners
                            {
                                c_partner_id = reader.GetInt32(0),
                                c_partner_name = reader.GetString(1),
                                c_is_verified = reader.GetBoolean(2),
                                c_created_at = reader.GetDateTime(3)
                            };
                            partners.Add(partner);
                        }
                        return Task.FromResult<IEnumerable<t_partners>>(partners);
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions as needed
                throw;
            }
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
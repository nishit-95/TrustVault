using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Repositories.Interfaces;
using Repositories.Models;

namespace Repositories.Implementations
{
    public class AdminService : IAdminService
    {
        private readonly SqlConnection _conn;
        public AdminService(SqlConnection conn)
        {
            _conn = conn;
        }



        public async Task<IEnumerable<t_partners>> GetAllPartnersAsync()
        {
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                var partners = new List<t_partners>();
                using (var cmd = new SqlCommand("SELECT * FROM t_partners", _conn))
                {
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            partners.Add(new t_partners
                            {
                                c_partner_id = reader.GetInt32(0),
                                c_partner_name = reader.GetString(1),
                                c_email = reader.GetString(2),
                                c_phone = reader.IsDBNull(3) ? null : reader.GetString(3),
                                c_country = reader.IsDBNull(4) ? null : reader.GetString(4),
                                c_password_hash = reader.GetString(5),
                                c_is_verified = reader.GetBoolean(6),
                                c_created_at = reader.GetDateTime(7)
                            });
                        }
                    }
                }
                return partners;
            }
            finally
            {
                _conn.Close();
            }
        }

        public Task<IEnumerable<t_users>> GetAllUsersAsync()
        {
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                var users = new List<t_users>();
                using (var cmd = new SqlCommand("SELECT * FROM t_users", _conn))
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            users.Add(new t_users
                            {
                                c_user_id = reader.GetInt32(0),
                                c_full_name = reader.GetString(1),
                                c_email = reader.GetString(2),
                                c_password = reader.IsDBNull(3) ? null : reader.GetString(3),
                                c_phone = reader.IsDBNull(4) ? null : reader.GetString(4),
                                c_country = reader.GetString(5),
                                c_created_at = reader.GetDateTime(6)
                            });
                        }
                    }
                }
                return Task.FromResult<IEnumerable<t_users>>(users);
            }
            finally
            {
                _conn.Close();
            }
        }

        public Task<IEnumerable<t_email_responses>> GetAllEmailResponsesAsync()
        {
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                var emailResponses = new List<t_email_responses>();
                using (var cmd = new SqlCommand("SELECT * FROM t_email_responses", _conn))
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            emailResponses.Add(new t_email_responses
                            {
                                c_response_id = reader.GetInt32(0),
                                c_email_id = reader.GetString(1),
                                c_date = reader.GetDateTime(2),
                                c_time = reader.GetTimeSpan(3)
                            });
                        }
                    }
                }
                return Task.FromResult<IEnumerable<t_email_responses>>(emailResponses);
            }
            finally
            {
                _conn.Close();
            }
        }
    }
}
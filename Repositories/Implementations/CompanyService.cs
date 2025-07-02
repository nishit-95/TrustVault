using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
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

        public Task<t_partners> RegisterPartnerAsync(t_partners partner)
        {
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                using (var cmd = new SqlCommand("INSERT INTO t_partners (c_partner_name, c_email, c_phone, c_country, c_password_hash, c_is_verified, c_created_at) OUTPUT INSERTED.c_partner_id VALUES (@Name, @Email, @Phone, @Country, @PasswordHash, @IsVerified, @CreatedAt)", _conn))
                {
                    cmd.Parameters.AddWithValue("@Name", partner.c_partner_name);
                    cmd.Parameters.AddWithValue("@Email", partner.c_email);
                    cmd.Parameters.AddWithValue("@Phone", partner.c_phone);
                    cmd.Parameters.AddWithValue("@Country", partner.c_country);
                    cmd.Parameters.AddWithValue("@PasswordHash", HashPass(partner.c_password_hash));
                    cmd.Parameters.AddWithValue("@IsVerified", partner.c_is_verified);
                    cmd.Parameters.AddWithValue("@CreatedAt", DateTime.UtcNow);

                    var insertedId = (int)cmd.ExecuteScalar();
                    partner.c_partner_id = insertedId;
                    return Task.FromResult(partner);
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions as needed
                throw;
            }
            finally
            {
                if (_conn.State == System.Data.ConnectionState.Open)
                {
                    _conn.Close();
                }
            }
        }


        public async Task<t_partners?> LoginAsync(string email, string partnerKey)
        {
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                using (var cmd = new SqlCommand("SELECT * FROM t_partners WHERE c_email = @Email AND c_password_hash = @PasswordHash", _conn))
                {
                    cmd.Parameters.AddWithValue("@Email", email);
                    cmd.Parameters.AddWithValue("@PasswordHash", HashPass(partnerKey));

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            return new t_partners
                            {
                                c_partner_id = reader.GetInt32(0),
                                c_partner_name = reader.GetString(1),
                                c_email = reader.GetString(2),
                                c_phone = reader.GetString(3),
                                c_country = reader.GetString(4),
                                c_password_hash = reader.GetString(5),
                                c_is_verified = reader.GetBoolean(6),
                                c_created_at = reader.GetDateTime(7)
                            };
                        }
                        return null;
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions as needed
                throw;
            }
            finally
            {
                if (_conn.State == System.Data.ConnectionState.Open)
                {
                    _conn.Close();
                }
            }
        }

        public async Task<t_partners?> GetPartnerByIdAsync(int partnerId)
        {
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                using (var cmd = new SqlCommand("SELECT * FROM t_partners WHERE c_partner_id = @PartnerId", _conn))
                {
                    cmd.Parameters.AddWithValue("@PartnerId", partnerId);

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            return new t_partners
                            {
                                c_partner_id = reader.GetInt32(0),
                                c_partner_name = reader.GetString(1),
                                c_email = reader.GetString(2),
                                c_phone = reader.GetString(3),
                                c_country = reader.GetString(4),
                                c_password_hash = reader.GetString(5),
                                c_is_verified = reader.GetBoolean(6),
                                c_created_at = reader.GetDateTime(7)
                            };
                        }
                        return null;
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions as needed
                throw;
            }
            finally
            {
                if (_conn.State == System.Data.ConnectionState.Open)
                {
                    _conn.Close();
                }
            }
        }

        public async Task<bool> UpdatePartnerAsync(t_partners partner)
        {
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                using (var cmd = new SqlCommand("UPDATE t_partners SET c_partner_name = @Name, c_email = @Email, c_phone = @Phone, c_country = @Country, c_password_hash = @PasswordHash WHERE c_partner_id = @PartnerId", _conn))
                {
                    cmd.Parameters.AddWithValue("@Name", partner.c_partner_name);
                    cmd.Parameters.AddWithValue("@Email", partner.c_email);
                    cmd.Parameters.AddWithValue("@Phone", partner.c_phone);
                    cmd.Parameters.AddWithValue("@Country", partner.c_country);
                    cmd.Parameters.AddWithValue("@PasswordHash", HashPass(partner.c_password_hash));
                    cmd.Parameters.AddWithValue("@PartnerId", partner.c_partner_id);

                    int rowsAffected = await cmd.ExecuteNonQueryAsync();
                    return rowsAffected > 0;
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions as needed
                throw;
            }
            finally
            {
                if (_conn.State == System.Data.ConnectionState.Open)
                {
                    _conn.Close();
                }
            }
        }


        public async Task<bool> DeletePartnerAsync(int partnerId)
        {
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                using (var cmd = new SqlCommand("DELETE FROM t_partners WHERE c_partner_id = @PartnerId", _conn))
                {
                    cmd.Parameters.AddWithValue("@PartnerId", partnerId);
                    int rowsAffected = await cmd.ExecuteNonQueryAsync();
                    return rowsAffected > 0;
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions as needed
                throw;
            }
            finally
            {
                if (_conn.State == System.Data.ConnectionState.Open)
                {
                    _conn.Close();
                }
            }
        }







        public Task<IEnumerable<t_req_data>> GetPartnerConsentsAsync(int partnerId)
        {
         if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                using (var cmd = new SqlCommand("SELECT * FROM t_req_data WHERE c_partner_id = @PartnerId", _conn))
                {
                    cmd.Parameters.AddWithValue("@PartnerId", partnerId);
                    using (var reader = cmd.ExecuteReader())
                    {
                        var consents = new List<t_req_data>();
                        while (reader.Read())
                        {
                            consents.Add(new t_req_data
                            {
                                c_req_id = reader.GetInt32(0),
                                c_document_name = reader.GetString(1),
                                c_userid = reader.GetString(2),
                                c_purpose = reader.GetString(3)
                            });
                        }
                        return Task.FromResult<IEnumerable<t_req_data>>(consents);
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions as needed
                throw;
            }
            finally
            {
                if (_conn.State == System.Data.ConnectionState.Open)
                {
                    _conn.Close();
                }
            }   
        }


        public Task<IEnumerable<t_partner_access>> GetAccessLogsAsync(int partnerId)
        {
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                using (var cmd = new SqlCommand("SELECT * FROM t_partner_access WHERE c_partner_id = @PartnerId", _conn))
                {
                    cmd.Parameters.AddWithValue("@PartnerId", partnerId);
                    using (var reader = cmd.ExecuteReader())
                    {
                        var accessLogs = new List<t_partner_access>();
                        while (reader.Read())
                        {
                            accessLogs.Add(new t_partner_access
                            {
                                c_access_id = reader.GetInt32(0),
                                c_document_name = reader.GetString(1),
                                c_access_time = reader.GetDateTime(2),
                                c_partner_id = reader.GetInt32(3),
                                c_location = reader.GetString(4),
                                c_notes = reader.GetString(5)
                            });
                        }
                        return Task.FromResult<IEnumerable<t_partner_access>>(accessLogs);
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions as needed
                throw;
            }
            finally
            {
                if (_conn.State == System.Data.ConnectionState.Open)
                {
                    _conn.Close();
                }
            }
        }


        public Task<bool> VerifyPartnerAsync(int partnerId)
        {
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                using (var cmd = new SqlCommand("UPDATE t_partners SET c_is_verified = 1 WHERE c_partner_id = @PartnerId", _conn))
                {
                    cmd.Parameters.AddWithValue("@PartnerId", partnerId);
                    int rowsAffected = cmd.ExecuteNonQuery();
                    return Task.FromResult(rowsAffected > 0);
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions as needed
                throw;
            }
            finally
            {
                if (_conn.State == System.Data.ConnectionState.Open)
                {
                    _conn.Close();
                }
            }
        }



        //Helper Class

        private string HashPass(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = Encoding.UTF8.GetBytes(password);
                byte[] hash = sha256.ComputeHash(bytes);
                return BitConverter.ToString(hash).Replace("-", "").ToLowerInvariant();
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Repositories.Interfaces;
using Repositories.Models;
using System.Security.Cryptography;
using System.Text;

namespace Repositories.Implementations
{
    public class UserService : IUserService
    {
        private readonly SqlConnection _conn;
        public UserService(SqlConnection conn)
        {
            _conn = conn;
        }

        public Task<bool> DeleteDocumentAsync(int documentId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteUserAsync(int userId)
        {
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                using (var cmd = _conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM t_users WHERE c_user_id = @UserId";
                    cmd.Parameters.AddWithValue("@UserId", userId);
                    return Task.FromResult(cmd.ExecuteNonQuery() > 0);
                }
            }
            catch (System.Exception)
            {
                Console.WriteLine("An error occurred while deleting the user.");
                return Task.FromResult(false);
            }
            finally
            {
                if (_conn.State == System.Data.ConnectionState.Open)
                {
                    _conn.Close();
                }
            }
        }

        public Task<IEnumerable<t_users>> GetAllUsersAsync()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<t_anomaly_alerts>> GetUserAlertsAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<t_users?> GetUserByIdAsync(int userId)
        {
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                using (var cmd = _conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT * FROM t_users WHERE c_user_id = @UserId";
                    cmd.Parameters.AddWithValue("@UserId", userId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return Task.FromResult(new t_users
                            {
                                c_user_id = reader.GetInt32(reader.GetOrdinal("c_user_id")),
                                c_full_name = reader.GetString(reader.GetOrdinal("c_full_name")),
                                c_email = reader.GetString(reader.GetOrdinal("c_email")),
                                c_password = reader.GetString(reader.GetOrdinal("c_password_hash")),
                                c_phone = reader.IsDBNull(reader.GetOrdinal("c_phone")) ? null : reader.GetString(reader.GetOrdinal("c_phone")),
                                c_country = reader.IsDBNull(reader.GetOrdinal("c_country")) ? null : reader.GetString(reader.GetOrdinal("c_country")),
                                c_created_at = reader.GetDateTime(reader.GetOrdinal("c_created_at"))
                            });
                        }
                    }
                }
                return Task.FromResult<t_users?>(null);
            }
            catch (System.Exception)
            {
                Console.WriteLine("An error occurred while retrieving the user.");
                return Task.FromResult<t_users?>(null);
            }
            finally
            {
                if (_conn.State == System.Data.ConnectionState.Open)
                {
                    _conn.Close();
                }
            }
        }

        public Task<IEnumerable<t_consents>> GetUserConsentsAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<t_documents>> GetUserDocumentsAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public async Task<t_consents> GrantConsentAsync(t_consents consent)
        {
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }

            using (var cmd = _conn.CreateCommand())
            {
                cmd.CommandText = @"
            INSERT INTO t_consents
                (c_user_id, c_partner_id, c_purpose, c_start_time, c_end_time, c_status, c_created_at)
            OUTPUT INSERTED.c_consent_id
            VALUES
                (@c_user_id, @c_partner_id, @c_purpose, @c_start_time, @c_end_time, @c_status, @c_created_at);
        ";

                cmd.Parameters.AddWithValue("@c_user_id", consent.c_user_id);
                cmd.Parameters.AddWithValue("@c_partner_id", consent.c_partner_id);
                cmd.Parameters.AddWithValue("@c_purpose", consent.c_purpose ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@c_start_time", consent.c_start_time);
                cmd.Parameters.AddWithValue("@c_end_time", consent.c_end_time);
                cmd.Parameters.AddWithValue("@c_status", consent.c_status ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@c_created_at", consent.c_created_at);

                var insertedId = (int)await cmd.ExecuteScalarAsync();
                consent.c_consent_id = insertedId;
                return consent;
            }
        }

        public Task<t_users?> LoginAsync(string email, string password)
        {
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                using (var cmd = _conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT * FROM t_users WHERE c_email = @Email AND c_password_hash = @PasswordHash";
                    cmd.Parameters.AddWithValue("@Email", email);
                    cmd.Parameters.AddWithValue("@PasswordHash", HashPass(password)); // In a real application, use a secure hash

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return Task.FromResult(new t_users
                            {
                                c_user_id = reader.GetInt32(reader.GetOrdinal("c_user_id")),
                                c_full_name = reader.GetString(reader.GetOrdinal("c_full_name")),
                                c_email = reader.GetString(reader.GetOrdinal("c_email")),
                                c_password = reader.GetString(reader.GetOrdinal("c_password_hash")),
                                c_phone = reader.IsDBNull(reader.GetOrdinal("c_phone")) ? null : reader.GetString(reader.GetOrdinal("c_phone")),
                                c_country = reader.IsDBNull(reader.GetOrdinal("c_country")) ? null : reader.GetString(reader.GetOrdinal("c_country")),
                                c_created_at = reader.GetDateTime(reader.GetOrdinal("c_created_at"))
                            });
                        }
                    }
                }
                return Task.FromResult<t_users?>(null);

            }
            catch (System.Exception)
            {

                Console.WriteLine("An error occurred while logging in the user.");
            }
            finally
            {
                if (_conn.State == System.Data.ConnectionState.Open)
                {
                    _conn.Close();
                }
            }
            return Task.FromResult<t_users?>(null);
        }

        public Task<bool> MarkAlertResolvedAsync(int alertId)
        {
            throw new NotImplementedException();
        }

        public async Task<t_users> RegisterUserAsync(t_users user)
        {
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                await _conn.OpenAsync();
            }
            try
            {
                using (var cmd = _conn.CreateCommand())
                {
                    cmd.CommandText = "INSERT INTO t_users (c_full_name, c_email, c_password_hash, c_phone, c_country, c_created_at) " +
                                      "VALUES (@FullName, @Email, @PasswordHash, @Phone, @Country, @CreatedAt); " +
                                      "SELECT CAST(scope_identity() AS int);";
                    cmd.Parameters.AddWithValue("@FullName", user.c_full_name);
                    cmd.Parameters.AddWithValue("@Email", user.c_email);
                    cmd.Parameters.AddWithValue("@PasswordHash", HashPass(user.c_password));
                    cmd.Parameters.AddWithValue("@Phone", (object)user.c_phone ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("@Country", (object)user.c_country ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("@CreatedAt", DateTime.UtcNow);

                    user.c_user_id = (int)await cmd.ExecuteScalarAsync();
                }
                return user;

            }
            catch (System.Exception)
            {
                Console.WriteLine("An error occurred while registering the user.");

            }
            finally
            {
                if (_conn.State == System.Data.ConnectionState.Open)
                {
                    await _conn.CloseAsync();
                }
            }
            return null; // or throw an exception based on your error handling strategy

        }

        private string HashPass(string password)
        {

            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = Encoding.UTF8.GetBytes(password);
                byte[] hash = sha256.ComputeHash(bytes);
                return BitConverter.ToString(hash).Replace("-", "").ToLowerInvariant();
            }
        }


        public Task<bool> RevokeConsentAsync(int consentId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateUserAsync(t_users user)
        {
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                using (var cmd = _conn.CreateCommand())
                {
                    cmd.CommandText = "UPDATE t_users SET c_full_name = @FullName, c_email = @Email, c_phone = @Phone, c_country = @Country WHERE c_user_id = @UserId";
                    cmd.Parameters.AddWithValue("@FullName", user.c_full_name ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@Email", user.c_email ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@Phone", user.c_phone ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@Country", user.c_country ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@UserId", user.c_user_id);

                    return Task.FromResult(cmd.ExecuteNonQuery() > 0);
                }
            }
            catch (System.Exception)
            {
                Console.WriteLine("An error occurred while updating the user.");
                return Task.FromResult(false);
            }
            finally
            {
                if (_conn.State == System.Data.ConnectionState.Open)
                {
                    _conn.Close();
                }
            }
        }

        public Task<t_documents> UploadDocumentAsync(t_documents document)
        {
            throw new NotImplementedException();
        }
    }
}
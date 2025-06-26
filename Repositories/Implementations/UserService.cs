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


        public Task<bool> DeleteDocumentAsync(int documentId)
        {
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                using (var cmd = _conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM t_documents WHERE c_document_id = @DocumentId";
                    cmd.Parameters.AddWithValue("@DocumentId", documentId);
                    return Task.FromResult(cmd.ExecuteNonQuery() > 0);
                }
            }
            catch (System.Exception)
            {
                Console.WriteLine("An error occurred while deleting the document.");
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
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                using (var cmd = _conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT * FROM t_documents WHERE c_user_id = @UserId";
                    cmd.Parameters.AddWithValue("@UserId", userId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        var documents = new List<t_documents>();
                        while (reader.Read())
                        {
                            documents.Add(new t_documents
                            {
                                c_document_id = reader.GetInt32(reader.GetOrdinal("c_document_id")),
                                c_user_id = reader.GetInt32(reader.GetOrdinal("c_user_id")),
                                c_data_id = reader.IsDBNull(reader.GetOrdinal("c_data_id")) ? null : reader.GetInt32(reader.GetOrdinal("c_data_id")),
                                c_document_name = reader.GetString(reader.GetOrdinal("c_document_name")),
                                c_file_url = reader.IsDBNull(reader.GetOrdinal("c_file_url")) ? null : reader.GetString(reader.GetOrdinal("c_file_url")),
                                c_mime_type = reader.IsDBNull(reader.GetOrdinal("c_mime_type")) ? null : reader.GetString(reader.GetOrdinal("c_mime_type")),
                                c_is_active = reader.GetBoolean(reader.GetOrdinal("c_is_active")),
                                c_uploaded_at = reader.GetDateTime(reader.GetOrdinal("c_uploaded_at"))
                            });
                        }
                        return Task.FromResult<IEnumerable<t_documents>>(documents);
                    }
                }
            }
            catch (System.Exception)
            {
                Console.WriteLine("An error occurred while retrieving user documents.");
                return Task.FromResult<IEnumerable<t_documents>>(null);
            }
            finally
            {
                if (_conn.State == System.Data.ConnectionState.Open)
                {
                    _conn.Close();
                }
            }
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



        public Task<bool> MarkAlertResolvedAsync(int alertId)
        {
            throw new NotImplementedException();
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
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                using (var cmd = _conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO t_documents 
                (c_user_id, c_data_id, c_document_name, c_file_url, c_mime_type, c_is_active, c_uploaded_at) 
                VALUES 
                (@UserId, @DataId, @DocumentName, @FileUrl, @MimeType, @IsActive, @UploadedAt); 
                SELECT CAST(scope_identity() AS int);";
                    cmd.Parameters.AddWithValue("@UserId", document.c_user_id);
                    cmd.Parameters.AddWithValue("@DataId", (object?)document.c_data_id ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("@DocumentName", document.c_document_name ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@FileUrl", document.c_file_url ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@MimeType", document.c_mime_type ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@IsActive", "false"); // Assuming default is false, adjust as needed
                    cmd.Parameters.AddWithValue("@UploadedAt", document.c_uploaded_at == default ? DateTime.UtcNow : document.c_uploaded_at);

                    document.c_document_id = (int)cmd.ExecuteScalar();
                }
                return Task.FromResult(document);
            }
            catch (System.Exception)
            {
                Console.WriteLine("An error occurred while uploading the document.");
                return Task.FromResult<t_documents>(null);
            }
            finally
            {
                if (_conn.State == System.Data.ConnectionState.Open)
                {
                    _conn.Close();
                }
            }
        }

        public Task<IEnumerable<t_data_types>> GetDataTypesAsync()
        {
            if (_conn.State != System.Data.ConnectionState.Open)
            {
                _conn.Open();
            }
            try
            {
                using (var cmd = _conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT * FROM t_data_types";
                    using (var reader = cmd.ExecuteReader())
                    {
                        var dataTypes = new List<t_data_types>();
                        while (reader.Read())
                        {
                            dataTypes.Add(new t_data_types
                            {
                                c_data_id = reader.GetInt32(reader.GetOrdinal("c_data_id")),
                                c_data_name = reader.GetString(reader.GetOrdinal("c_data_name")),
                                c_sensitivity_level = reader.GetString(reader.GetOrdinal("c_sensitivity_level"))
                            });
                        }
                        return Task.FromResult<IEnumerable<t_data_types>>(dataTypes);
                    }
                }
            }
            catch (System.Exception)
            {
                Console.WriteLine("An error occurred while retrieving data types.");
                return Task.FromResult<IEnumerable<t_data_types>>(null);
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
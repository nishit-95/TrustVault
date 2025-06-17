using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repositories.Interfaces;
using Repositories.Models;

namespace Repositories.Implementations
{
    public class UserService : IUserService
    {
        public Task<bool> DeleteDocumentAsync(int documentId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteUserAsync(int userId)
        {
            throw new NotImplementedException();
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
            throw new NotImplementedException();
        }

        public Task<IEnumerable<t_consents>> GetUserConsentsAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<t_documents>> GetUserDocumentsAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<t_consents> GrantConsentAsync(t_consents consent)
        {
            throw new NotImplementedException();
        }

        public Task<t_users?> LoginAsync(string email, string password)
        {
            throw new NotImplementedException();
        }

        public Task<bool> MarkAlertResolvedAsync(int alertId)
        {
            throw new NotImplementedException();
        }

        public Task<t_users> RegisterUserAsync(t_users user)
        {
            throw new NotImplementedException();
        }

        public Task<bool> RevokeConsentAsync(int consentId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateUserAsync(t_users user)
        {
            throw new NotImplementedException();
        }

        public Task<t_documents> UploadDocumentAsync(t_documents document)
        {
            throw new NotImplementedException();
        }
    }
}
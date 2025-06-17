using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repositories.Models;

namespace Repositories.Interfaces
{
    public interface IUserService
    {
        //  Signup (Registration)
        Task<t_users> RegisterUserAsync(t_users user);

        //  Login (Authentication)
        Task<t_users?> LoginAsync(string email, string password);

        //  Get Profile
        Task<t_users?> GetUserByIdAsync(int userId);
        Task<IEnumerable<t_users>> GetAllUsersAsync();

        //  Update / Delete
        Task<bool> UpdateUserAsync(t_users user);
        Task<bool> DeleteUserAsync(int userId);

        //  Documents
        Task<IEnumerable<t_documents>> GetUserDocumentsAsync(int userId);
        Task<t_documents> UploadDocumentAsync(t_documents document);
        Task<bool> DeleteDocumentAsync(int documentId);

        //  Consent
        Task<IEnumerable<t_consents>> GetUserConsentsAsync(int userId);
        Task<t_consents> GrantConsentAsync(t_consents consent);
        Task<bool> RevokeConsentAsync(int consentId);

        //  Anomaly Alerts
        Task<IEnumerable<t_anomaly_alerts>> GetUserAlertsAsync(int userId);
        Task<bool> MarkAlertResolvedAsync(int alertId);
    }

}
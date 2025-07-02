using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repositories.Models;

namespace Repositories.Interfaces
{
    public interface IAdminService
    {
        Task<IEnumerable<t_users>> GetAllUsersAsync();
        Task<IEnumerable<t_partners>> GetAllPartnersAsync();

        Task<IEnumerable<t_email_responses>> GetAllEmailResponsesAsync();
    }
}
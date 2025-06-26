using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Interfaces;

namespace API.ApiControllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PartnerApiController : ControllerBase
    {
        private readonly ICompanyService _companyService;
        private readonly IConfiguration _configuration;


        public PartnerApiController(ICompanyService companyService, IConfiguration configuration)
        {
            _companyService = companyService;
            _configuration = configuration;

        }

        private int GetUserIdFromToken()
        {
            var userIdClaim = HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier);
            return userIdClaim != null ? int.Parse(userIdClaim.Value) : 0;
        }


        // [Authorize]
        [HttpGet("GetAllPartners")]
        public async Task<IActionResult> GetAllPartners()
        {
            try
            {
                var partners = await _companyService.GetAllPartnersAsync();
                return Ok(partners);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        
    }
}
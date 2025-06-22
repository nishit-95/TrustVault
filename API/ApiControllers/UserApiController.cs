using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Helper;
using Microsoft.AspNetCore.Mvc;
using Repositories.Interfaces;
using Repositories.Models;

namespace API.ApiControllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserApiController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;


        public UserApiController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;

        }

         private int GetUserIdFromToken()
        {
            var userIdClaim = HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier);
            return userIdClaim != null ? int.Parse(userIdClaim.Value) : 0;
        }


        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUserAsync([FromBody] t_users user)
        {
            if (user == null)
            {
                return BadRequest("User data is required.");
            }

            try
            {
                var result = await _userService.RegisterUserAsync(user);
                if (result != null)
                {
                    return Ok(result);
                }
                return BadRequest("User registration failed.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        [HttpPost("Login")]
        public async Task<IActionResult> LoginUserAsync([FromBody] t_users user)
        {
            if (user == null)
            {
                return BadRequest("User data is required.");
            }

            try
            {
                var result = await _userService.LoginAsync(user.c_email, user.c_password);
                if (result != null)
                {
                    string token = JwtHelper.GenerateJwtToken(user, _configuration);
                    return Ok(result);
                }
                return Unauthorized("Invalid username or password.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



    }
}
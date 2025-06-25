using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Helper;
using Microsoft.AspNetCore.Authorization;
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
                // Attempt login using your service
                var result = await _userService.LoginAsync(user.c_email, user.c_password);

                if (result != null)
                {
                    // ✅ Generate JWT token
                    string token = JwtHelper.GenerateJwtToken(result, _configuration);

                    // ✅ Return both user info and token
                    return Ok(new
                    {
                        message = "Login successful",
                        token = token,
                        user = new
                        {
                            result.c_user_id,
                            result.c_full_name,
                            result.c_email,
                            result.c_phone,
                            result.c_country
                        }
                    });
                }

                return Unauthorized("Invalid email or password.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [Authorize]
        [HttpPost("GrantConsent")]
        public async Task<IActionResult> GrantConsentAsync([FromBody] t_consents consent)
        {
            if (consent == null)
            {
                return BadRequest("Consent data is required.");
            }

            try
            {
                int userId = GetUserIdFromToken();
                consent.c_user_id = userId;

                var result = await _userService.GrantConsentAsync(consent);
                if (result != null)
                {
                    return Ok(result);
                }
                return BadRequest("Failed to grant consent.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [Authorize]
        [HttpGet("GetUserById")]
        public async Task<IActionResult> GetUserByIdAsync()
        {
            try
            {
                int userId = GetUserIdFromToken();
                var user = await _userService.GetUserByIdAsync(userId);
                if (user != null)
                {
                    return Ok(user);
                }
                return NotFound("User not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [Authorize]
        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUserAsync([FromBody] t_users user)
        {
            if (user == null)
            {
                return BadRequest("User data is required.");
            }

            try
            {
                int userId = GetUserIdFromToken();
                user.c_user_id = userId;

                var result = await _userService.UpdateUserAsync(user);
                if (result)
                {
                    return Ok("User updated successfully.");
                }
                return BadRequest("Failed to update user.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [Authorize]
        [HttpDelete("DeleteUser")]
        public async Task<IActionResult> DeleteUserAsync()
        {
            try
            {
                int userId = GetUserIdFromToken();
                var result = await _userService.DeleteUserAsync(userId);
                if (result)
                {
                    return Ok("User deleted successfully.");
                }
                return BadRequest("Failed to delete user.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
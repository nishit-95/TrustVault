using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public UserApiController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet("Register")]
        public IActionResult GetRegistrationPage()
        {
            return Ok(new { message = "User registration page." });
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

        [HttpGet("Login")]
        public IActionResult GetLoginPage()
        {
            return Ok(new { message = "User login page." });
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
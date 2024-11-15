using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using server.Dto;
using server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly SignInManager<User> _signInManager;

        public AuthController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _signInManager = signInManager;
        }

        #region Register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var existingUser = await _userManager.FindByEmailAsync(registerDto.Email);
            if (existingUser != null)
            {
                return BadRequest("User already exists");
            }

            var newUser = new User
            {
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            var result = await _userManager.CreateAsync(newUser, registerDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await _userManager.AddToRoleAsync(newUser, "User");
            return Ok("User registered successfully");
        }
        #endregion

        private string GenerateOtp()
        {
            Random random = new Random();
            string otp = random.Next(100000, 999999).ToString();
            return otp;
        }

        #region Login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthDto authDto)
        {
            var user = await _userManager.FindByEmailAsync(authDto.Email);
            if (user == null)
            {
                return Unauthorized("Invalid credentials.");
            }

            var result = await _signInManager.PasswordSignInAsync(user, authDto.Password, false, false);
            if (!result.Succeeded)
            {
                return Unauthorized("Invalid credentials.");
            }

            var token = GenerateJwtToken(user);

            return Ok(new { Token = token });
        }
        #endregion

        #region Generate JWT Token
        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        #endregion
    }


}
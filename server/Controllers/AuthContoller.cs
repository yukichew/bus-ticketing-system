using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using server.Dto;
using server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MimeKit;
using server.Helper;

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
        private readonly EmailService _emailHelper;

        public AuthController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, SignInManager<User> signInManager, EmailService emailHelper)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _signInManager = signInManager;
            _emailHelper = emailHelper;
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
                UserName = registerDto.Email,
                EmailConfirmed = false
            };

            var result = await _userManager.CreateAsync(newUser, registerDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            var otp = GenerateOtp();
            newUser.EmailOTP = otp;
            newUser.OTPExpiry = DateTime.UtcNow.AddMinutes(10);
            newUser.LastOTPSent = DateTime.UtcNow;
            await _userManager.AddToRoleAsync(newUser, "User");

            await SendOtpEmail(newUser.UserName, newUser.Email, otp);

            return Ok("OTP email sent to user succesfully.");
        }
        #endregion

        #region Generate OTP
        private string GenerateOtp()
        {
            Random random = new Random();
            string otp = random.Next(100000, 999999).ToString();
            return otp;
        }
        #endregion

        #region Login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthDto authDto)
        {
            var user = await _userManager.FindByEmailAsync(authDto.Email);
            if (user == null)
            {
                return Unauthorized("Invalid credentials.");
            }

            if (!user.EmailConfirmed)
            {
                return Unauthorized("Email is not verified.");
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

        #region Send OTP Email
        private async Task SendOtpEmail(string name, string email, string otp)
        {
            var subject = "Your Email Verification OTP";
            var message = $"Your OTP for email verification is: {otp}";
            await _emailHelper.SendEmailAsync(name, email, subject, message);
        }
        #endregion

        #region Verify Email
        [HttpPost("verify-email")]
        public async Task<IActionResult> VerifyEmail([FromBody] VerifyEmailDto verifyEmailDto)
        {
            var user = await _userManager.FindByEmailAsync(verifyEmailDto.Email);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            if (user.EmailOTP != verifyEmailDto.OTP || user.OTPExpiry < DateTime.UtcNow)
            {
                return BadRequest("Invalid or expired OTP.");
            }

            user.EmailConfirmed = true;
            user.EmailOTP = null;
            user.OTPExpiry = null;
            await _userManager.UpdateAsync(user);

            return Ok("Email verified successfully.");
        }
        #endregion

        #region Resend OTP
        [HttpPost("resend-otp")]
        public async Task<IActionResult> ResendOtp([FromBody] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            if (user.EmailConfirmed)
            {
                return BadRequest("Email is already verified.");
            }

            if (user.LastOTPSent != null && DateTime.UtcNow < user.LastOTPSent.Value.AddMinutes(1))
            {
                return BadRequest("Please wait for 60 seconds before requesting a new OTP.");
            }

            var newOtp = GenerateOtp();
            user.EmailOTP = newOtp;
            user.OTPExpiry = DateTime.UtcNow.AddMinutes(10);
            user.LastOTPSent = DateTime.UtcNow;
            await _userManager.UpdateAsync(user);

            await SendOtpEmail(user.UserName, user.Email, newOtp);

            return Ok("A new OTP has been sent to your email.");
        }
        #endregion


    }
}
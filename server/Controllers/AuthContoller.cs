using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using server.Helper;
using server.Dto.Auth;

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
        private readonly EmailService _emailService;
        private readonly OTPService _otpService;

        public AuthController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, SignInManager<User> signInManager, EmailService emailService, OTPService otpService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _signInManager = signInManager;
            _emailService = emailService;
            _otpService = otpService;
        }

        #region Register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var user = await _userManager.FindByEmailAsync(registerDto.Email);
            if (!user.EmailConfirmed)
            {
                return BadRequest("Email verification is required before registration.");
            }

            user.UserName = registerDto.Fullname;
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            result = await _userManager.AddPasswordAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("Registration successful.");
        }
        #endregion

        #region Register as Bus Operator
        [HttpPost("register/busoperator")]
        public async Task<IActionResult> RegisterBusOperator([FromBody] BusOperatorRegisterDto registerDto)
        {
            var user = await _userManager.FindByEmailAsync(registerDto.Email);
            if (!user.EmailConfirmed)
            {
                return BadRequest("Email verification is required before registration.");
            }

            var busOperator = new BusOperator
            {
                UserName = registerDto.Name,
                Email = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber,
                CompanyName = registerDto.CompanyName,
                CompanyEmail = registerDto.CompanyEmail,
                CompanyContact = registerDto.CompanyContact,
                Address = registerDto.Address,
                BusImages = registerDto.BusImages,
                IsRefundable = registerDto.IsRefundable,
            };

            var result = await _userManager.CreateAsync(busOperator, registerDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            var roleResult = await _userManager.AddToRoleAsync(busOperator, "BusOperator");
            if (!roleResult.Succeeded)
            {
                return BadRequest(roleResult.Errors);
            }

            return Ok("Bus operator registration successful.");
        }
        #endregion

        #region Login API
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto authDto)
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

        #region Generate JWT Token Method
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

        #region Send OTP Email Method
        private async Task SendOtpEmail(string name, string email, string otp)
        {
            var subject = "Your Email Verification OTP";
            var message = $"Your OTP for email verification is: {otp}";
            await _emailService.SendEmailAsync(email, email, subject, message);
        }
        #endregion

        #region Verify Email API
        [HttpPost("verify-email")]
        public async Task<IActionResult> VerifyEmail([FromBody] VerifyEmailDto verifyEmailDto)
        {
            var user = await _userManager.FindByEmailAsync(verifyEmailDto.Email);
            if (user != null)
            {
                return BadRequest("User already exists.");
            }

            var otp = await _otpService.GenerateOtpAsync(verifyEmailDto.Email);
            await _otpService.SaveOTPAsync(verifyEmailDto.Email, otp);
            await SendOtpEmail(verifyEmailDto.Email, verifyEmailDto.Email, otp);
            return Ok($"OTP email sent to {verifyEmailDto.Email} successfully.");
        }
        #endregion

        #region Validate OTP API
        [HttpPost("validate-otp")]
        public async Task<IActionResult> ValidateOtp([FromBody] ValidateEmailDto validateEmailDto)
        {
            var isValid = await _otpService.ValidateOTPAsync(validateEmailDto.Email, validateEmailDto.OTP);
            if (!isValid)
            {
                return BadRequest("Invalid or expired OTP.");
            }

            var user = new User
            {
                Email = validateEmailDto.Email,
                UserName = validateEmailDto.Email,
                EmailConfirmed = true,
            };

            var result = await _userManager.CreateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await _userManager.AddToRoleAsync(user, "User");
            await _userManager.SetLockoutEnabledAsync(user, false);
            return Ok("OTP validated successfully.");
        }
        #endregion

    }
}
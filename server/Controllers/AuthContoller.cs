using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using server.Helper;
using server.Dto.Auth;
using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography;

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
            if (user == null)
            {
                return BadRequest(new { message = "User not found." });
            }

            if (!user.EmailConfirmed)
            {
                return BadRequest(new { message = "Email verification is required before registration." });
            }

            user.UserName = registerDto.Fullname;
            user.Status = "Active";
            user.PhoneNumber = registerDto.PhoneNumber;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(new { message = (result.Errors) });
            }

            result = await _userManager.AddPasswordAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");
            if (!roleResult.Succeeded)
            {
                return BadRequest(new { message = "Failed to assign Member role.", errors = roleResult.Errors });
            }

            await _userManager.SetLockoutEnabledAsync(user, false);
            return Ok(new { message = "Registration successful." });
        }
        #endregion

        #region Register as Bus Operator
        [HttpPost("register/busoperator")]
        public async Task<IActionResult> RegisterBusOperator([FromBody] BusOperatorRegisterDto registerDto)
        {
            var user = await _userManager.FindByEmailAsync(registerDto.Email);
            if (user != null)
            {
                return BadRequest(new { message = "User already exists." });
            }

            var busOperator = new BusOperator
            {
                Email = registerDto.Email,
                UserName = registerDto.Fullname,
                PhoneNumber = registerDto.PhoneNumber,
                Address = registerDto.Address,
                BusImages = registerDto.BusImages,
                IsRefundable = registerDto.IsRefundable,
                Status = "Pending",
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

            return Ok(new { message = "Bus operator registration successful." });
        }
        #endregion

        #region Login API
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto authDto)
        {
            var user = await _userManager.FindByEmailAsync(authDto.Email);
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid credentials." });
            }

            var roles = await _userManager.GetRolesAsync(user);
            if (roles.Contains("BusOperator"))
            {
                var busOperator = user as BusOperator;
                if (busOperator == null || busOperator.Status != "Active")
                {
                    return Unauthorized(new { message = "Your account is pending review or inactive." });
                }
            }

            var result = await _signInManager.PasswordSignInAsync(user, authDto.Password, false, false);
            if (!result.Succeeded)
            {
                return Unauthorized(new { message = "Invalid credentials." });
            }

            var accessToken = GenerateJwtToken(user);
            var refreshToken = GenerateRefreshJwtToken(user);

            return Ok(new { Token = accessToken, RefreshToken = refreshToken, role = roles.FirstOrDefault() });
        }
        #endregion

        #region Generate JWT Token Method
        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, _userManager.GetRolesAsync(user).Result.FirstOrDefault()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(5),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        #endregion

        private string GenerateRefreshJwtToken(IdentityUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, user.Id) }),
                Expires = DateTime.UtcNow.AddDays(5),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

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
        public async Task<IActionResult> ValidateOtp([FromBody] ValidateOTPDto validateOTPDto)
        {
            var isValid = await _otpService.ValidateOTPAsync(validateOTPDto.Email, validateOTPDto.OTP);
            if (!isValid)
            {
                return BadRequest(new { message = "Invalid or expired OTP." });
            }

            var user = new User
            {
                Email = validateOTPDto.Email,
                UserName = validateOTPDto.Email,
                EmailConfirmed = true,
            };

            var result = await _userManager.CreateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new { message = "OTP validated successfully." });
        }
        #endregion

        #region Get Profile API
        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }
            var roles = await _userManager.GetRolesAsync(user);

            return Ok(user);
        }
        #endregion

        #region Change Password API
        [Authorize]
        [Authorize(Roles = "Member,BusOperator")]
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }
            var result = await _userManager.ChangePasswordAsync(user, changePasswordDto.OldPassword, changePasswordDto.NewPassword);

            if (!result.Succeeded)
            {
                return BadRequest(new { message = result.Errors.Select(e => e.Description) });
            }

            return Ok(new { message = "Password changed successfully." });
        }
        #endregion

        #region Forgot Password API
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] VerifyEmailDto verifyEmailDto)
        {
            var user = await _userManager.FindByEmailAsync(verifyEmailDto.Email);
            if (user == null)
            {
                return BadRequest(new { message = "User not found." });
            }

            var otp = await _otpService.GenerateOtpAsync(verifyEmailDto.Email);
            await _otpService.SaveOTPAsync(verifyEmailDto.Email, otp);
            await SendOtpEmail(user.UserName, verifyEmailDto.Email, otp);
            return Ok(new { message = "OTP email sent successfully." });
        }
        #endregion

        #region Verify OTP Reset Password API
        [Authorize]
        [HttpPost("verify-otp-reset-password")]
        public async Task<IActionResult> VerifyOTPForResetPassword([FromBody] ValidateOTPDto validateOTPDto)
        {
            var user = await _userManager.FindByEmailAsync(validateOTPDto.Email);
            if (user == null)
            {
                return BadRequest(new { message = "User not found." });
            }

            var isValid = await _otpService.ValidateOTPAsync(validateOTPDto.Email, validateOTPDto.OTP);
            if (!isValid)
            {
                return BadRequest(new { message = "Invalid or expired OTP." });
            }

            return Ok(new { message = "OTP validated successfully." });
        }
        #endregion

        #region Reset Password API
        [Authorize]
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
            if (user == null)
            {
                return BadRequest(new { message = "User not found." });
            }
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var result = await _userManager.ResetPasswordAsync(user, token, resetPasswordDto.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new { message = "Password reset successfully." });
        }
        #endregion

        #region Edit User Profile API
        [Authorize(Policy = "MemberOnly")]
        [HttpPut("edit-profile")]
        public async Task<IActionResult> EditProfile([FromBody] EditProfileDto editProfileDto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }

            user.UserName = editProfileDto.Fullname;
            user.PhoneNumber = editProfileDto.PhoneNumber;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(new { message = "Failed to update profile.", errors = result.Errors });
            }

            return Ok(new { message = "Profile updated successfully." });
        }
        #endregion

        #region Refresh Token API
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequestDto refreshTokenRequestDto)
        {
            var refreshToken = refreshTokenRequestDto.RefreshToken;
            if (string.IsNullOrEmpty(refreshToken))
            {
                return BadRequest(new { message = "Refresh token is required." });
            }

            // Validate the refresh token
            var principal = GetPrincipalFromExpiredToken(refreshToken);
            if (principal == null)
            {
                return Unauthorized(new { message = "Invalid refresh token." });
            }

            var userId = principal.Identity.Name;
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Unauthorized(new { message = "User not found." });
            }

            // Generate a new JWT token
            var newJwtToken = GenerateJwtToken(user);
            var newRefreshToken = GenerateRefreshJwtToken(user);
            return Ok(new { Token = newJwtToken, RefreshToken = newRefreshToken });
        }
        #endregion

        #region Get Principal From Expired Token Method
        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = false,
                    ValidIssuer = _configuration["JwtSettings:Issuer"],
                    ValidAudience = _configuration["JwtSettings:Audience"],
                    IssuerSigningKey = securityKey,
                };

                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var validatedToken);
                return principal;
            }
            catch
            {
                return null;
            }
        }
        #endregion

        #region Logout API
        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { message = "Logged out successfully." });
        }
        #endregion
    }
}
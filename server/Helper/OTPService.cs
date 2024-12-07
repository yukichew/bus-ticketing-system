using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace server.Helper
{
    public class OTPService
    {
        private readonly ConcurrentDictionary<string, (string Otp, DateTime Expiry)> _otpStore = new ConcurrentDictionary<string, (string, DateTime)>();
        private readonly TimeSpan _otpExpiryDuration = TimeSpan.FromMinutes(5);

        #region Generates a new OTP for the given email and stores it.
        public async Task<string> GenerateOtpAsync(string email)
        {
            if (string.IsNullOrEmpty(email)) throw new ArgumentException("Email cannot be null or empty.");

            var otp = new Random().Next(100000, 999999).ToString();
            var expiry = DateTime.UtcNow.Add(_otpExpiryDuration);

            _otpStore[email] = (otp, expiry);

            return await Task.FromResult(otp);
        }
        #endregion

        #region Saves a provided OTP for the email (overwrites any existing).
        public async Task SaveOTPAsync(string email, string otp)
        {
            if (string.IsNullOrEmpty(email)) throw new ArgumentException("Email cannot be null or empty.");
            if (string.IsNullOrEmpty(otp)) throw new ArgumentException("OTP cannot be null or empty.");

            var expiry = DateTime.UtcNow.Add(_otpExpiryDuration);
            _otpStore[email] = (otp, expiry);

            await Task.CompletedTask;
        }
        #endregion

        #region Validates OTP for the given email.
        public async Task<bool> ValidateOTPAsync(string email, string otp)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(otp)) return false;

            if (_otpStore.TryGetValue(email, out var storedOtp) && storedOtp.Otp == otp && storedOtp.Expiry > DateTime.UtcNow)
            {
                _otpStore.TryRemove(email, out _);
                return await Task.FromResult(true);
            }

            return await Task.FromResult(false);
        }
        #endregion
    }
}

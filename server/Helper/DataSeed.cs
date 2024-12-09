using Microsoft.AspNetCore.Identity;
using server.Models;

namespace server.Helper
{
    public class DataSeed
    {
        #region Roles
        public static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
        {
            string[] roleNames = { "Admin", "Member", "BusOperator" };
            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
        }
        #endregion

        #region Admin Data
        public static async Task SeedAdminDataSync(UserManager<User> userManager)
        {
            var adminEmail = "admin@admin.com";
            var admin = await userManager.FindByEmailAsync(adminEmail);

            if (admin == null)
            {
                admin = new User
                {
                    UserName = "admin",
                    Email = adminEmail,
                    EmailConfirmed = true,
                    Status = "Active"
                };

                var result = await userManager.CreateAsync(admin, "Admin@1234");

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "Admin");
                }
            }
        }
        #endregion
    }
}
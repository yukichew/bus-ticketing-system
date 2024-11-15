using Microsoft.AspNetCore.Identity;
using server.Models;

namespace server.Helper
{
    public class DataSeed
    {
        #region Roles
        public static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
        {
            string[] roleNames = { "Admin", "User", "BusOperator" };
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
            var adminUser = await userManager.FindByEmailAsync(adminEmail);

            if (adminUser == null)
            {
                adminUser = new User
                {
                    UserName = adminEmail,
                    Email = adminEmail
                };

                var result = await userManager.CreateAsync(adminUser, "Admin@1234");

                if (result.Succeeded)
                {
                    // Assign the 'Admin' role to the admin user
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                }
            }
        }
        #endregion
    }
}
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace mathwhiz.Data {
    internal static class UsersRepository
    {
        internal static async Task<List<User>> GetUsersAsync()
        {
            using (var db = new AppDBContext())
            {
                return await db.Users.ToListAsync();
            }
        }

        internal static async Task<User> GetUserByIdAsync(int userId)
        {
            using (var db = new AppDBContext())
            {
                return await db.Users.FirstOrDefaultAsync(user => user.userID == userId);
            }
        }

        internal static async Task<User> UserExistsAsync(string username, string password)
        {
            using (var db = new AppDBContext())
            {
                var user = await db.Users.FirstOrDefaultAsync(u => u.display_name == username && u.password == password);
                return user;
            }
        }

        internal static async Task<bool> CreateUserAsync(User userToCreate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    await db.Users.AddAsync(userToCreate);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }

        internal static async Task<bool> UpdateUserAsync(User userToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Users.Update(userToUpdate);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }

        internal static async Task<bool> DeleteUserAsync(int userId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    User userToDelete = await GetUserByIdAsync(userId);
                    if (userToDelete != null)
                    {
                        db.Users.Remove(userToDelete);
                        return await db.SaveChangesAsync() >= 1;
                    }
                    return false;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }
        internal static async Task<bool> UpdateUserProfilePictureAsync(int userId,string filePath)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    User userToUpdate = await GetUserByIdAsync(userId);
                    if (userToUpdate == null)
                    {
                        return false; // User does not exist
                    }
                    userToUpdate.profile_picture = filePath;
                    db.Users.Update(userToUpdate);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }
        
    }
}
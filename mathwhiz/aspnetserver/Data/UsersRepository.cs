using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using aspnetserver.Data;
using mathwhiz.Data;
using Microsoft.EntityFrameworkCore;

namespace mathwhiz.Data
{
    internal static class UsersRepository
    {
        internal static async Task<List<User>> GetUsersAsync()
        {
            using (var db = new AppDBContext())
            {
                return await db.Users.ToListAsync();
            }
        }

        internal static async Task<List<UpdateUserDTO>> GetUsersAsync(string query)
        {
            using (var db = new AppDBContext())
            {
                query = query.ToLower();

                return await db.Users
                    .Where(u => u.username.ToLower().Contains(query) ||
                                u.display_name.ToLower().Contains(query))
                    .Take(10)
                    .Select(u => new UpdateUserDTO
                    {
                        user_Id = u.userID,
                        username = u.username,
                        display_Name = u.display_name,
                        Bio = u.user_bio
                    })
                    .ToListAsync();
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
                var user = await db.Users.FirstOrDefaultAsync(u => u.username == username && u.password == password);
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

        internal static async Task<bool> CreateUserAsync(LoginDTO loginDTO)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    User userToCreate = new User
                    {
                        username = loginDTO.username,
                        password = loginDTO.password,
                        email = loginDTO.email,
                        profile_picture = "",
                        profile_background = "",
                        user_bio = "",
                        display_name = ""
                    };
                    await db.Users.AddAsync(userToCreate);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }

        internal static async Task<bool> UpdateUserAsync(UpdateUserDTO userToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    User user = await GetUserByIdAsync(userToUpdate.user_Id);
                    if (user == null)
                    {
                        return false;
                    }
                    user.display_name = userToUpdate.display_Name;
                    user.user_bio = userToUpdate.Bio;
                    db.Users.Update(user);
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
        internal static async Task<bool> UpdateUserProfilePictureAsync(int userId, string filePath)
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

        internal static async Task<bool> UpdateUserBackgroundPictureAsync(int userId, string filePath)
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
                    userToUpdate.profile_background = filePath;
                    db.Users.Update(userToUpdate);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception)
                {
                    return false;
                }
            }

        }
        internal static async Task<bool> UploadUserAsset(UserSavedAsset userSavedAsset)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    await db.SavedAssets.AddAsync(userSavedAsset);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }

        internal static async Task<bool> AddFavoriteAsync(int userId, int assetId)
        {
            using (var db = new AppDBContext())
            {
                bool exists = await db.UserFavorites
                    .AnyAsync(f => f.UserId == userId && f.AssetId == assetId);

                if (exists)
                    return false;

                var favorite = new UserFavorite
                {
                    UserId = userId,
                    AssetId = assetId,
                    CreatedAt = DateTime.UtcNow
                };

                db.UserFavorites.Add(favorite);
                await db.SaveChangesAsync();
                return true;
            }
        }

        internal static async Task<bool> RemoveFavoriteAsync(int userId, int assetId)
        {
            using (var db = new AppDBContext())
            {
                var favorite = await db.UserFavorites
                    .FirstOrDefaultAsync(f => f.UserId == userId && f.AssetId == assetId);

                if (favorite == null)
                    return false;

                db.UserFavorites.Remove(favorite);
                await db.SaveChangesAsync();
                return true;
            }
        }

        internal static async Task<List<UserSavedAsset>> GetUserAssetsAsync(int userId)
        {
            using (var db = new AppDBContext())
            {
                return await db.SavedAssets
                    .Where(asset => asset.OwnerUserID == userId)
                    .OrderByDescending(asset => asset.CreatedAt)
                    .ToListAsync();
            }
        }

        internal static async Task<List<UserFavorite>> GetUserFavoriteAssetsAsync(int userId)
        {
            using (var db = new AppDBContext())
            {
                return await db.UserFavorites
                    .Where(asset => asset.UserId == userId)
                    .OrderByDescending(asset => asset.CreatedAt)
                    .ToListAsync();
            }
        }

        internal static async Task<UserSavedAsset?> GetUserAssetByIdAsync(int assetId)
        {
            using (var db = new AppDBContext())
            {
                return await db.SavedAssets
                    .FirstOrDefaultAsync(asset => asset.AssetId == assetId);
            }
        }

        internal static async Task<bool> DeleteUserAssetAsync(int assetId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    UserSavedAsset userToDelete = await GetUserAssetByIdAsync(assetId);
                    if (userToDelete != null)
                    {
                        db.SavedAssets.Remove(userToDelete);
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
    }
}
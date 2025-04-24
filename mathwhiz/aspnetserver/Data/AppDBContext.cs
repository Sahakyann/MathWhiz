using Microsoft.EntityFrameworkCore;

namespace mathwhiz.Data
{

    internal sealed class AppDBContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<UserSavedAsset> SavedAssets { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlServer("Server=localhost;Database=master;Trusted_Connection=True;TrustServerCertificate=True");


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            User[] usersToSeed = new User[6];

            for (int i = 1; i <= usersToSeed.Length; i++)
            {
                usersToSeed[i - 1] = new User
                {
                    userID = i,
                    username = $"User{i}",
                    password = $"123",
                    display_name = $"Display Name{i}",
                    email = $"example_email@mathwhiz.com",
                    user_bio = $"My name is Giorgio, but everybody calls me User{i}"
                };
            }
        }
    }
}

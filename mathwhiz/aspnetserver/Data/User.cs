using System.ComponentModel.DataAnnotations;

namespace mathwhiz.Data
{
    public class User
    {
        [Key]
        public int userID { get; set; }

        [Required]
        [MaxLength(30)]
        public required string username { get; set; }

        [Required]
        [MaxLength(30)]
        public required string password { get; set; }
        [Required]
        [MaxLength(30)]
        [EmailAddress]
        [RegularExpression(@"^[^\s@]+@[^\s@]+\.[^\s@]+$", ErrorMessage = "Invalid email format")]
        public required string email { get; set; }

        [MaxLength(255)]
        public string profile_picture { get; set; }

        [MaxLength(255)]
        public string profile_background { get; set; }

        [MaxLength(30)]
        public string display_name { get; set; }

        [MaxLength(300)]
        public string user_bio { get; set; }

        [MaxLength(6)]
        public string? confirmation_code { get; set; }

        public bool is_verified { get; set; } = false;

        public User()
        { 
        }

        public User(int userID, string username, string password, string email, string profile_picture, string profile_background, string display_name, string user_bio)
        {
            this.userID = userID;
            this.username = username;
            this.password = password;
            this.email = email;
            this.profile_picture = profile_picture;
            this.profile_background = profile_background;
            this.display_name = display_name;
            this.user_bio = user_bio;
        }
         
        public User(LoginDTO loginDTO)
        {
            this.username = loginDTO.username;
            this.password = loginDTO.password;
            this.email = loginDTO.email;
        }
    }
}

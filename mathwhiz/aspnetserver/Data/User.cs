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

        [MaxLength(255)]
        public string profile_picture { get; set; }

        [MaxLength(255)]
        public string profile_background { get; set; }

        [MaxLength(30)]
        public string display_name { get; set; }

        [MaxLength(300)]
        public string user_bio { get; set; }



    }
}

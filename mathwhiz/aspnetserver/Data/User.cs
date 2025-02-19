using System.ComponentModel.DataAnnotations;

namespace mathwhiz.Data
{
    public class User
    {
        [Key]
        public int userID { get; set; }

        [Required]
        [MaxLength(30)]
        public required string display_name { get; set; }

        [Required]
        [MaxLength(30)]
        public required string password { get; set; }
    }
}

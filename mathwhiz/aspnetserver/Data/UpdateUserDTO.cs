using System.ComponentModel.DataAnnotations;

namespace mathwhiz.Data
{
    public class UpdateUserDTO
    {
        [Required]
        public int user_Id { get; set; }
        [MaxLength(30)]
        public string username { get; set; }
        [MaxLength(30)]
        public string display_Name { get; set; }
        [MaxLength(300)]
        public string Bio { get; set; }

        public UpdateUserDTO() { }

        public UpdateUserDTO(int user_Id,string display_Name,string bio) {
            this.user_Id = user_Id;
            this.display_Name = display_Name;
            this.Bio = bio;
        }

        public UpdateUserDTO(User user)
        {
            this.user_Id = user.userID;
            this.display_Name = user.display_name;
            this.Bio = user.user_bio;
        }
    }
}

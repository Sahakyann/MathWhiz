using mathwhiz.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace aspnetserver.Data
{
    public class UserFavorite
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int AssetId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("UserId")]
        [DeleteBehavior(DeleteBehavior.Restrict)]
        public virtual User User { get; set; }

        [ForeignKey("AssetId")]
        [DeleteBehavior(DeleteBehavior.Restrict)]
        public virtual UserSavedAsset UserAsset { get; set; }
    }
}

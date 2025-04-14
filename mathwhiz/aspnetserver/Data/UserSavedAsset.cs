using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace mathwhiz.Data
{
    public class UserSavedAsset
    {
        [Key]
        public int AssetId { get; set; }

        [Required]
        public int OwnerUserID { get; set; } 

        [ForeignKey(nameof(OwnerUserID))]
        public User Owner { get; set; }  

        public string FileName { get; set; }

        [Required]
        public string Saved_Asset { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

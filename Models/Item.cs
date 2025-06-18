using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AntiquesShowCase.Models;

public class Item
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public int YearMade { get; set; }
    [Required]
    public bool IsAntique { get; set; }
    [Required]
    public bool IsSeller { get; set; }

    public decimal Price { get; set; }
    [Required]
    public string ItemPhotoUrl { get; set; }
    [Required]
    public int UserId { get; set; }
    [Required]
    public int CategoryId { get; set; }
    [NotMapped]
    public List<UserProfile> UserProfile { get; set; }


}

using System.ComponentModel.DataAnnotations;

namespace AntiquesShowCase.Models.DTOs;

public class ItemDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int YearMade { get; set; }
    public bool IsAntique { get; set; }
    public bool IsSeller { get; set; }
    public decimal Price { get; set; }
    public string ItemPhotoUrl { get; set; }
    public int UserId { get; set; }
    public int CategoryId { get; set; }


}

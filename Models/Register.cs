using System.ComponentModel.DataAnnotations;

namespace AntiquesShowCase.Data;

public class Registration
{
   public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Email { get; set; }
 
    [Required]
    public string UserDescription { get; set; }
    
    public string UserPhotoUrl { get; set; }
    [Required]
    public string Password { get; set; }
    public string UserIdentityId { get; set; }

}
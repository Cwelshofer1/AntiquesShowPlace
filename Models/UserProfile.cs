using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AntiquesShowCase.Models;

public class UserProfile
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

    [NotMapped]
    public List<string> Roles { get; set; }

}

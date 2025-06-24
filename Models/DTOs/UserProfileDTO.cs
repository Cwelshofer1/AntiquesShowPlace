using System.ComponentModel.DataAnnotations;

namespace AntiquesShowCase.Models;

public class UserProfileDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string UserDescription { get; set; }
    public string UserPhotoUrl { get; set; }
    public string Password { get; set; }
    public string UserIdentityId { get; set; }

    

}

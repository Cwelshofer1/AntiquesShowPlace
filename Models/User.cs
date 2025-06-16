using System.ComponentModel.DataAnnotations;

namespace AntiquesShowCase.Models;

public class User
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public int UserId { get; set; }
    [Required]
    public string UserDescription { get; set; }
    [Required]
    public string UserPhotoUrl { get; set; }
    [Required]
    public string Password { get; set; }

    

}

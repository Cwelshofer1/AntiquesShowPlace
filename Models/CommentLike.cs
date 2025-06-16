using System.ComponentModel.DataAnnotations;

namespace AntiquesShowCase.Models;

public class CommentLike
{
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required]
    public int CommentId { get; set; }

}

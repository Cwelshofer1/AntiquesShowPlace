using System.ComponentModel.DataAnnotations;

namespace AntiquesShowCase.Models;

public class Comment
{
    public int Id { get; set; }

    [Required]
    public string Message { get; set; }
    [Required]
    public DateTime DatePosted { get; set; }
    [Required]
    public int UserId { get; set; }
     [Required]
    public int CommentId { get; set; }

}

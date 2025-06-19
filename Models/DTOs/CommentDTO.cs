namespace AntiquesShowCase.Models.DTOs;

public class CommentDTO
{
    public int Id { get; set; }
    public string Message { get; set; }
    public DateTime DatePosted { get; set; }
    public int UserId { get; set; }
    public int ItemId { get; set; }

}

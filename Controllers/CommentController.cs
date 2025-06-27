using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using AntiquesShowCase.Models;
using AntiquesShowCase.Data;
using AntiquesShowCase.Models.DTOs;

namespace AntiquesShowCase.Controllers;


[ApiController]
[Route("api/[controller]")]
public class CommentController : ControllerBase
{
    private AntiquesShowCaseDbContext _dbContext;
    private UserManager<IdentityUser> _userManager;

    public CommentController(AntiquesShowCaseDbContext context, UserManager<IdentityUser> userManager)
    {
        _dbContext = context;
        _userManager = userManager;
    }

    [HttpGet]
    // [Authorize]

    public IActionResult Get()
    {
        var comments = _dbContext.Comments;
        return Ok(comments);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CommentDTO dto)
    {
        var NewComment = new Comment
        {
            Id = dto.Id,
            Message = dto.Message,
            DatePosted = dto.DatePosted,
            UserId = dto.UserId,
            ItemId = dto.ItemId

        };

        _dbContext.Comments.Add(NewComment);
        await _dbContext.SaveChangesAsync();

        return Created($"/api/comment/{NewComment.Id}", dto);
    }


    [HttpDelete("{id}")]

    public IActionResult Delete(int id)
    {
        var comment = _dbContext.Comments.SingleOrDefault(c => c.Id == id);
        if (comment == null) return NotFound();

        _dbContext.Comments.Remove(comment);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPut("{id}")]

    public IActionResult UpdateComment(Comment comment, int id)
    {
        Comment CommentToUpdate = _dbContext.Comments.SingleOrDefault(c => c.Id == id);
        if (CommentToUpdate == null)
        {
            return NotFound();
        }
        else if (id != comment.Id)
        {
            return BadRequest();
        }

        CommentToUpdate.Message = comment.Message;

        _dbContext.SaveChanges();

        return NoContent();
    }
    
     [HttpGet("{id}")]

    public IActionResult GetById(int id)
    {
        var comment = _dbContext.Comments.SingleOrDefault(c => c.Id == id);

        if (comment == null)
        {
            return NotFound();
        }

        return Ok(comment);
    }
}

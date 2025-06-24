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
using System.Xml;

namespace AntiquesShowCase.Controllers;


[ApiController]
[Route("api/[controller]")]
public class CommentLikeController : ControllerBase
{
    private AntiquesShowCaseDbContext _dbContext;
    private UserManager<IdentityUser> _userManager;

    public CommentLikeController(AntiquesShowCaseDbContext context, UserManager<IdentityUser> userManager)
    {
        _dbContext = context;
        _userManager = userManager;
    }

    [HttpGet]
    // [Authorize]

    public IActionResult Get()
    {
        var commentLikes = _dbContext.CommentLikes;
        return Ok(commentLikes);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CommentLikeDTO dto)
    {
        var NewCommentLike = new CommentLike
        {
            Id = dto.Id,
            UserId = dto.UserId,
            CommentId = dto.CommentId

        };

        _dbContext.CommentLikes.Add(NewCommentLike);
        await _dbContext.SaveChangesAsync();

        return Created($"/api/commentlike/{NewCommentLike.Id}", dto);
    }

     [HttpDelete("{id}")]

    public IActionResult Delete(int id)
    {
        var commentLike = _dbContext.CommentLikes.SingleOrDefault(c => c.Id == id);
        if (commentLike == null) return NotFound();

        _dbContext.CommentLikes.Remove(commentLike);
        _dbContext.SaveChanges();
        return NoContent();
    }
}
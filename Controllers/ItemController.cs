using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using AntiquesShowCase.Models;
using AntiquesShowCase.Data;

namespace AntiquesShowCase.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ItemController : ControllerBase
{
    private AntiquesShowCaseDbContext _dbContext;
    private UserManager<IdentityUser> _userManager;

    public ItemController(AntiquesShowCaseDbContext context, UserManager<IdentityUser> userManager)
    {
        _dbContext = context;
        _userManager = userManager;
    }

    [HttpGet]
    // [Authorize]

    public IActionResult Get()
    {
        var Tags = _dbContext.Items;
        return Ok(Tags);
    }
    
        [HttpGet("{id}")]
    
    public IActionResult GetById(int id)
    {
        var item = _dbContext.Items.SingleOrDefault(t => t.Id == id);

        if (item == null)
        {
            return NotFound();
        }

        return Ok(item);
    }

}
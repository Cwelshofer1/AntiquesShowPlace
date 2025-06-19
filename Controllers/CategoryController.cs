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
public class CategoryController : ControllerBase
{
    private AntiquesShowCaseDbContext _dbContext;
    private UserManager<IdentityUser> _userManager;

    public CategoryController(AntiquesShowCaseDbContext context, UserManager<IdentityUser> userManager)
    {
        _dbContext = context;
        _userManager = userManager;
    }

    [HttpGet]
    // [Authorize]

    public IActionResult Get()
    {
        var categories = _dbContext.Categories;
        return Ok(categories);
    }

     [HttpPost]
    public async Task<IActionResult> Post([FromBody] CategoryDTO dto)
    {
        var NewCategory = new Category
        {
            Id = dto.Id,
            Name = dto.Name
        };

        _dbContext.Categories.Add(NewCategory);
        await _dbContext.SaveChangesAsync();

        return Created($"/api/order/{NewCategory.Id}", dto);
    }
}
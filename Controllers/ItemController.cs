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
        var item = _dbContext.Items.SingleOrDefault(i => i.Id == id);

        if (item == null)
        {
            return NotFound();
        }

        return Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ItemDTO dto)
    {
        var NewItem = new Item
        {
            Id = dto.Id,
            Name = dto.Name,
            Description = dto.Description,
            YearMade = dto.YearMade,
            IsAntique = dto.IsAntique,
            IsSeller = dto.IsSeller,
            Price = dto.Price,
            ItemPhotoUrl = dto.ItemPhotoUrl,
            UserId = dto.UserId,
            CategoryId = dto.CategoryId
        };

        _dbContext.Items.Add(NewItem);
        await _dbContext.SaveChangesAsync();

        return Created($"/api/order/{NewItem.Id}", dto);
    }

    [HttpDelete("{id}")]

    public IActionResult Delete(int id)
    {
        var Item = _dbContext.Items.SingleOrDefault(i => i.Id == id);
        if (Item == null) return NotFound();

        _dbContext.Items.Remove(Item);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPut("{id}")]

    public IActionResult UpdateItem(Item item, int id)
    {
        Item ItemToUpdate = _dbContext.Items.SingleOrDefault(t => t.Id == id);
        if (ItemToUpdate == null)
        {
            return NotFound();
        }
        else if (id != item.Id)
        {
            return BadRequest();
        }


        ItemToUpdate.Name = item.Name;
        ItemToUpdate.Description = item.Description;
        ItemToUpdate.YearMade = item.YearMade;
        ItemToUpdate.IsAntique = item.IsAntique;
        ItemToUpdate.IsSeller = item.IsSeller;
        ItemToUpdate.Price = item.Price;
        ItemToUpdate.ItemPhotoUrl = item.ItemPhotoUrl;
        ItemToUpdate.CategoryId = item.CategoryId;



        _dbContext.SaveChanges();

        return NoContent();
    }
}
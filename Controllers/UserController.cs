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
public class UserProfileController : ControllerBase
{
    private AntiquesShowCaseDbContext _dbContext;
    private UserManager<IdentityUser> _userManager;

    public UserProfileController(AntiquesShowCaseDbContext context, UserManager<IdentityUser> userManager)
    {
        _dbContext = context;
        _userManager = userManager;
    }

    [HttpGet]
    // [Authorize]

    public IActionResult Get()
    {
        var userprofile = _dbContext.UserProfiles;
        return Ok(userprofile);
    }


    [HttpGet("{id}")]

    public IActionResult GetById(int id)
    {
        var userprofile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == id);

        if (userprofile == null)
        {
            return NotFound();
        }

        return Ok(userprofile);
    }

    [HttpDelete("{id}")]

    public async Task<IActionResult> Delete(int id)
    {
        var userProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == id);
        if (userProfile == null) return NotFound();

        var userId = userProfile.UserIdentityId;

        var user = await _userManager.FindByIdAsync(userId);

        if (user != null)
        {

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
        }

        _dbContext.UserProfiles.Remove(userProfile);
        _dbContext.SaveChanges();
        return NoContent();
    }
    
      [HttpPut("{id}")]
    
        public async Task<IActionResult> UpdateUserProfile(UserProfile userprofile, int id)
        {
        UserProfile ProfileToUpdate = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == id);
        if (ProfileToUpdate == null)
        {
            return NotFound();
        }
        else if (id != userprofile.Id)
        {
            return BadRequest();
        }

       
        ProfileToUpdate.Name = userprofile.Name;
        
        
        if (ProfileToUpdate.Email != userprofile.Email)
            {
                var userIdentity = await _userManager.FindByIdAsync(ProfileToUpdate.UserIdentityId);
                if (userIdentity != null)
                {
                    userIdentity.Email = userprofile.Email;
                    userIdentity.UserName = userprofile.Email;
                    await _userManager.UpdateAsync(userIdentity);
                }
                ProfileToUpdate.Email = userprofile.Email;
            }
        ProfileToUpdate.UserDescription = userprofile.UserDescription;
        ProfileToUpdate.UserPhotoUrl = userprofile.UserPhotoUrl;




        _dbContext.SaveChanges();

        return NoContent();
    }
}
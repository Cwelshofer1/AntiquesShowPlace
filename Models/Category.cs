using System.ComponentModel.DataAnnotations;

namespace AntiquesShowCase.Models;

public class Category
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

}

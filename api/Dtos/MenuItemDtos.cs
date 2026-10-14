using System.ComponentModel.DataAnnotations;

namespace CampusEats.Api.Dtos;

public record MenuItemDto(int Id, string Name, decimal Price, string Category, bool Available);

public record CreateMenuItemDto(
    [Required, StringLength(100)] string Name,
    [Range(0.01, 10000)] decimal Price,
    [Required] string Category);
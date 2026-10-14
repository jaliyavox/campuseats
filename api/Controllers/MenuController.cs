using CampusEats.Api.Dtos;
using CampusEats.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CampusEats.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MenuController : ControllerBase
{
    private readonly IMenuService _menu;
    public MenuController(IMenuService menu) => _menu = menu;

    [HttpGet]
    public ActionResult<IEnumerable<MenuItemDto>> GetAll() =>
        Ok(_menu.GetAll());

    [HttpGet("{id}")]
    public ActionResult<MenuItemDto> GetById(int id)
    {
        var item = _menu.GetById(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public ActionResult<MenuItemDto> Create(CreateMenuItemDto dto)
    {
        var created = _menu.Create(dto);
        return StatusCode(201, created);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Update(int id, CreateMenuItemDto dto) =>
        _menu.Update(id, dto) ? NoContent() : NotFound();

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Delete(int id) =>
        _menu.Delete(id) ? NoContent() : NotFound();
}
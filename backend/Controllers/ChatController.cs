using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly IChatService _chatService;
    private readonly ILogger<ChatController> _logger;

    public ChatController(IChatService chatService, ILogger<ChatController> logger)
    {
        _chatService = chatService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult<ChatResponse>> Post([FromBody] ChatRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Message))
        {
            _logger.LogWarning("Request recibido con mensaje vacío");
            return BadRequest(new { error = "El mensaje no puede estar vacío." });
        }

        _logger.LogInformation("POST /api/chat — procesando mensaje");
        var reply = await _chatService.SendMessageAsync(request.Message);
        return Ok(new ChatResponse(reply));
    }
}

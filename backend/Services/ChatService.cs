using OpenAI;
using OpenAI.Chat;

namespace backend.Services;

public class ChatService : IChatService
{
    private readonly ChatClient _client;
    private readonly ILogger<ChatService> _logger;

    public ChatService(IConfiguration configuration, ILogger<ChatService> logger)
    {
        _logger = logger;

        var apiKey = configuration["OpenAI:ApiKey"]
            ?? throw new InvalidOperationException("OpenAI API key not configured.");

        var openAiClient = new OpenAIClient(
            new System.ClientModel.ApiKeyCredential(apiKey),
            new OpenAIClientOptions { Endpoint = new Uri("https://api.groq.com/openai/v1") }
        );
        _client = openAiClient.GetChatClient("llama-3.3-70b-versatile");
    }

    public async Task<string> SendMessageAsync(string message)
    {
        _logger.LogInformation("Enviando mensaje a Groq API. Longitud: {Length} caracteres", message.Length);

        try
        {
            var messages = new List<ChatMessage>
            {
                new SystemChatMessage("Eres un asistente útil y conciso. Responde siempre en el mismo idioma que el usuario."),
                new UserChatMessage(message)
            };

            var response = await _client.CompleteChatAsync(messages);
            var reply = response.Value.Content[0].Text;

            _logger.LogInformation("Respuesta recibida de Groq API. Longitud: {Length} caracteres", reply.Length);
            return reply;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al llamar a Groq API");
            throw;
        }
    }
}

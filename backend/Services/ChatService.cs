using OpenAI;
using OpenAI.Chat;

namespace backend.Services;

public class ChatService : IChatService
{
    private readonly ChatClient _client;

    public ChatService(IConfiguration configuration)
    {
        var apiKey = configuration["OpenAI:ApiKey"]
            ?? throw new InvalidOperationException("OpenAI API key not configured.");

        var openAiClient = new OpenAIClient(apiKey);
        _client = openAiClient.GetChatClient("gpt-4o-mini");
    }

    public async Task<string> SendMessageAsync(string message)
    {
        var messages = new List<ChatMessage>
        {
            new SystemChatMessage("Eres un asistente útil y conciso. Responde siempre en el mismo idioma que el usuario."),
            new UserChatMessage(message)
        };

        var response = await _client.CompleteChatAsync(messages);
        return response.Value.Content[0].Text;
    }
}

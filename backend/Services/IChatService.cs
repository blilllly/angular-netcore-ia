namespace backend.Services;

public interface IChatService
{
    Task<string> SendMessageAsync(string message);
}

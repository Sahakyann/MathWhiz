using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;

namespace aspnetserver.Data
{
    public class ChatGPTService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public ChatGPTService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _apiKey = config["OpenAI:ApiKey"];
            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", _apiKey);
            //Console.WriteLine("API Key: " + _apiKey);
        }

        public async Task<string> GenerateExplanationAsync(string rawJson)
        {
            var prompt = BuildPromptFromJson(rawJson);

            var payload = new
            {
                model = "gpt-4o",
                messages = new[]
                {
                new { role = "system", content = "You are an expert math tutor explaining visualizations step-by-step." },
                new { role = "user", content = prompt }
            },
                temperature = 0.7
            };

            var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);
            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                await Console.Out.WriteLineAsync(error);
                throw new Exception("OpenAI error: " + error);
            }

            var resultJson = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(resultJson);
            string AIresponse = doc.RootElement.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();
            await Console.Out.WriteLineAsync(AIresponse);
            return AIresponse;
        }

        private string BuildPromptFromJson(string rawJson)
        {
            using var doc = JsonDocument.Parse(rawJson);
            var root = doc.RootElement;

            var fields = root.EnumerateObject()
                .Select(p => $"{p.Name}: {p.Value}")
                .ToList();

            return $"Explain a mathematical visualization based on the following parameters:\n{string.Join("\n", fields)}";
        }
    }
}

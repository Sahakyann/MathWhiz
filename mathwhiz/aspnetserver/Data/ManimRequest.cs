using aspnetserver.Data.Structures;
using mathwhiz.Data;
using System.Text.Json;
using System.Text.Json.Serialization;


namespace aspnetserver.Data
{
    public abstract class ManimRequest
    {
        public const string RequestJsonFilePath = "G:\\Capstone\\manim_animations\\RequestJsonTempFiles";

        [JsonIgnore]
        public string RequestHash { get; private set; }
        public abstract string GenerateUniqueFileName(RequestType type);
        public bool screenshot_only { get; set; }

        public void AssignRequestHash()
        {
            RequestHash = HashStore.GetOrCreateRequestHash(ToString());
        }

        public async Task<IResult> GetCachedFileAsync(RequestType type, string Directory, string fileExtension, int userId)
        {
            string cachedFile = Path.Combine(Directory, $"{type}_{RequestHash}.{fileExtension}");
            await Console.Out.WriteLineAsync($"Trying to find the cached file in:\n{cachedFile}");
            if (File.Exists(cachedFile))
            {
                Console.WriteLine($"Returning cached {type} visualization for hash: {RequestHash}");

                // Store the retrieved file path in the run-time cache. Later, if the user decides to save the file to their profile, we can retrieve it
                VisualizationCache.Store(userId, cachedFile);

                var fileBytesCached = await File.ReadAllBytesAsync(cachedFile);
                return Results.File(fileBytesCached, "video/mp4", cachedFile);
            }
            else
            {
                await Console.Out.WriteLineAsync("No cached file found!");
                return null;
            }
        }
        public async Task SaveJsonRepresentationAsync(RequestType type, string Directory)
        {
            string jsonFilePath = Path.Combine(Directory, $"{type}_{RequestHash}.json");
            string jsonContent = JsonSerializer.Serialize(this, this.GetType(), new JsonSerializerOptions { WriteIndented = true });
            await File.WriteAllTextAsync(jsonFilePath, jsonContent);
            Console.WriteLine($"Request saved as JSON: {jsonFilePath}");
        }
        public enum RequestType
        {
            Limit = 0,
            Derivative = 1,
            Integral = 2,
            LinearTransformation = 3,
            TaylorSeries = 4,
            NewtonsMethod = 5,
            Eigenvectors = 6,
            MatrixMultiplication = 7,
        }
    }
}

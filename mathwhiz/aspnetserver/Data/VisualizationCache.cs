namespace aspnetserver.Data
{
    public static class VisualizationCache
    {
        private static readonly Dictionary<int, string> _userCache = new();

        public static void Store(int userId, string outputFilePath)
        {
            _userCache[userId] = outputFilePath;
            Console.WriteLine($"Stored {outputFilePath} cached path for userId: {userId}");
        }

        public static string? Get(int userId)
        {
            _userCache.TryGetValue(userId, out var path);
            return path;
        }

        public static bool Remove(int userId)
        {
            return _userCache.Remove(userId);
        }

        public static bool Contains(int userId)
        {
            return _userCache.ContainsKey(userId);
        }
    }
}

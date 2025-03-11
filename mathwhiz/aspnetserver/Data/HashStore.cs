using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.IO;
using Newtonsoft.Json;

namespace mathwhiz.Data
{
    internal static class HashStore
    {
        private static readonly string HashMappingFile = "RequestHashes.json";
        private static Dictionary<string, string> RequestHashes = new Dictionary<string, string>();

        static HashStore()
        {
            LoadRequestHashes();
        }

        public static string GetOrCreateRequestHash(string requestString)
        {
            if (RequestHashes.ContainsKey(requestString))
            {
                return RequestHashes[requestString];
            }
            else
            {
                string hash = GenerateHash(requestString);
                RequestHashes[requestString] = hash;
                Console.WriteLine($"Request Hash Generated:{requestString} - {hash}");
                SaveRequestHashes();
                return hash;
            }
        }

        public static string GetRequestByHash(string hash)
        {
            foreach (var pair in RequestHashes)
            {
                if (pair.Value == hash)
                    return pair.Key;
            }
            return null;
        }

        private static string GenerateHash(string input)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
                StringBuilder builder = new StringBuilder();
                foreach (byte b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString().Substring(0, 30);
            }
        }

        private static void SaveRequestHashes()
        {
            File.WriteAllText(HashMappingFile, JsonConvert.SerializeObject(RequestHashes, Formatting.Indented));
        }

        private static void LoadRequestHashes()
        {
            if (File.Exists(HashMappingFile))
            {
                RequestHashes = JsonConvert.DeserializeObject<Dictionary<string, string>>(File.ReadAllText(HashMappingFile));
            }
        }
    }
}

using aspnetserver.Data.Structures;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace aspnetserver.Data
{
    public class MatrixJsonConverter : JsonConverter<Matrix>
    {
        public override Matrix Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var list = JsonSerializer.Deserialize<List<List<double>>>(ref reader, options);
            return Matrix.FromList(list);
        }

        public override void Write(Utf8JsonWriter writer, Matrix value, JsonSerializerOptions options)
        {
            JsonSerializer.Serialize(writer, value.ToList(), options);
        }
    }
}

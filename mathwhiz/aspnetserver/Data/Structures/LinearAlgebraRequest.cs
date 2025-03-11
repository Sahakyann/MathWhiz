using Azure.Core;
using mathwhiz.Data;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace aspnetserver.Data.Structures
{
    public class LinearAlgebraRequest : ManimRequest
    {
        [JsonConverter(typeof(MatrixJsonConverter))]
        public Matrix Matrix { get; set; }
        [JsonConverter(typeof(MatrixJsonConverter))]
        public Matrix Vectors { get; set; }
        [JsonIgnore]
        public const string scriptPath = "G:\\Capstone\\manim_animations\\LinearAlgebra";

        public LinearAlgebraRequest(Matrix matrix, Matrix vectors)
        {
            Matrix = matrix;
            Vectors = vectors;
            AssignRequestHash();
        }

        public override string ToString()
        {
            string matrixString = string.Join("\n", Enumerable.Range(0, Matrix.GetLength(0))
                .Select(i => string.Join(", ", Enumerable.Range(0, Matrix.GetLength(1)).Select(j => Matrix[i, j]))));

            string vectorsString = string.Join("\n", Enumerable.Range(0, Vectors.GetLength(0))
                .Select(i => string.Join(", ", Enumerable.Range(0, Vectors.GetLength(1)).Select(j => Vectors[i, j]))));

            return $"Matrix:\n{matrixString}\nVectors:\n{vectorsString}";
        }

        public override string GenerateUniqueFileName(ManimRequest.RequestType type)
        {
            return $"{type}_{RequestHash}";
        }

       
        
    }
}

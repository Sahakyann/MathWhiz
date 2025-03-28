using System.Text.Json.Serialization;

namespace aspnetserver.Data.Structures
{
    public class NumericalRequest : FunctionRequest
    {
        public float? initialGuess { get; set; }
        public int maxIterations { get; set; }
        [JsonIgnore]
        public const string scriptPathNumerical = "G:\\Capstone\\manim_animations\\Numerical";

        public NumericalRequest(string latex_function,float? xMin, float? xMax, float? initialGuess) : base(latex_function, xMin, xMax)
        {
            this.initialGuess = initialGuess;
            this.maxIterations = maxIterations;
            AssignRequestHash();
        }

        public override string ToString() => $"{base.ToString()},{initialGuess},{maxIterations}";
    }
}

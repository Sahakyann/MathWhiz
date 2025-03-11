using mathwhiz.Data;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace aspnetserver.Data.Structures
{
    public class FunctionRequest : ManimRequest
    {

        public string latex_function { get; set; }

        [JsonIgnore]
        public MathFunction mathfunction { get; set; }
        public string sympyMathFunction { get; private set; }
        public float xMin { get; set; }
        public float xMax { get; set; }
        public float yMin { get; set; }
        public float yMax { get; set; }
        [JsonIgnore]
        public const string scriptPath = "G:\\Capstone\\manim_animations\\Calculus";

        public FunctionRequest(string latex_function, float xMin, float xMax, float yMin, float yMax)
        {
            this.latex_function = latex_function;
            this.xMin = xMin;
            this.xMax = xMax;
            this.yMin = yMin;
            this.yMax = yMax;
            mathfunction = new MathFunction(latex_function);
            sympyMathFunction = mathfunction.sympyMathFunction;
            AssignRequestHash();
        }

        public override string ToString() => $"{mathfunction.sympyMathFunction},{xMin},{xMax},{yMin},{yMax},{latex_function}";

        public override string GenerateUniqueFileName(ManimRequest.RequestType type)
        {
            return $"{type}_{RequestHash}";
        }

       

       
    }
}

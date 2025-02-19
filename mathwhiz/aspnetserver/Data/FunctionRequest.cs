using matwhiz.Data;
using System.Text.Json.Serialization;

namespace mathwhiz.Data
{
    public class FunctionRequest
    {
        public FunctionRequest(string latex_function, float xMin, float xMax, float yMin, float yMax)
        {
            this.latex_function = latex_function;
            this.xMin = xMin;
            this.xMax = xMax;
            this.yMin = yMin;
            this.yMax = yMax;
            this.mathfunction = new MathFunction(latex_function);
        }

        public string latex_function { get; set; }

        [JsonIgnore]
        public MathFunction mathfunction { get; set; }
        public float xMin { get; set; }
        public float xMax { get; set; }
        public float yMin { get; set; }
        public float yMax { get; set; }
        public override string ToString() => $"{mathfunction.sympyMathFunction},{xMin},{xMax},{yMin},{yMax}";

            
    }
}

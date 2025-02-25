using System.Text.Json.Serialization;

namespace mathwhiz.Data
{
    public class FunctionIntegralRequest : FunctionRequest
    {
        public float xStep;
        public float yStep;
        public float integral_dx;
        public float integral_from;
        public float integral_to;

        
        public FunctionIntegralRequest(string latex_function, float xMin, float xMax, float yMin, float yMax, float xStep,float yStep,float integral_dx,float integral_from,float integral_to) : base(latex_function, xMin, xMax, yMin, yMax)
        {
            this.xStep = xStep;
            this.yStep = yStep;
            this.integral_dx = integral_dx;
            this.integral_from = integral_from;
            this.integral_to = integral_to;
        }
        public override string ToString() => $"{mathfunction.sympyMathFunction},{xMin},{xMax},{yMin},{yMax},{xStep},{yStep},{integral_dx},{integral_from},{integral_to},{latex_function}";
    }
}

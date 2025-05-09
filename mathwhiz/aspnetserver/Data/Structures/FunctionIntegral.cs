using System.Text.Json.Serialization;

namespace aspnetserver.Data.Structures
{
    public class FunctionIntegralRequest : FunctionRequest
    {
        public float xStep { get; set; }
        public float yStep { get; set; }
        public float integral_dx { get; set; }
        public float integral_from { get; set; }
        public float integral_to { get; set; }



        public FunctionIntegralRequest(string latex_function, float? xMin, float? xMax, float? yMin, float? yMax, float xStep, float yStep, float integral_dx, float integral_from, float integral_to) : base(latex_function, xMin, xMax, yMin, yMax)
        {
            this.xStep = xStep;
            this.yStep = yStep;
            this.integral_dx = integral_dx;
            this.integral_from = integral_from;
            this.integral_to = integral_to;
            AssignRequestHash();
        }
        public override string ToString() => $"{mathfunction.sympyMathFunction},{xMin},{xMax},{yMin},{yMax},{xStep},{yStep},{integral_dx},{integral_from},{integral_to},{latex_function}";
    }
}

using mathwhiz.Data;
using System.Text.Json.Serialization;

namespace aspnetserver.Data.Structures
{
    public class TaylorSeriesRequest : FunctionRequest
    {
        public float expansionPoint { get; set; }
        public float degree { get; set; }


        public TaylorSeriesRequest(string latex_function, float expansionPoint, float degree,float? xMin, float? xMax)
            : base(latex_function, xMin, xMax)
        {
            this.expansionPoint = expansionPoint;
            this.degree = degree;
            AssignRequestHash();
        }

        public override string ToString() => $"{base.ToString()},{expansionPoint},{degree}";
    }
}

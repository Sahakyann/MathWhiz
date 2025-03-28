using System.Data;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using NCalc;

namespace aspnetserver.Data.Structures
{
    public class MathFunction
    {
        public string sympyMathFunction { get; private set; }

        // Use a delegate that gets an input (x) and gives an output f(x)
        // In case of multi variable functions use Func<Dictionary<string, double>, double> where the dictionary contains <Symbol (x), value of the symbol x = #>
        private Func<double, double> NumericFunction;

        public MathFunction(string latexFunction)
        {
            sympyMathFunction = LatexToSympy(latexFunction);
            NumericFunction = CompileFunction(LatexToCSharp(latexFunction));
        }

        private static string LatexToSympy(string latexFunction)
        {
            Console.WriteLine($"Raw input function: {latexFunction}");


            latexFunction = Regex.Replace(latexFunction, @"f\s*\(x\)\s*=", "");
            latexFunction = Regex.Replace(latexFunction, @"f\\left\(x\\right\)\s*=", "");
            latexFunction = Regex.Replace(latexFunction, @"\\cdot", " * ");
            latexFunction = Regex.Replace(latexFunction, @"\\frac\{([^{}]+)\}\{([^{}]+)\}", "($1/$2)");
            var latexToSymPy = new (string, string)[]
            {
            (@"\\sin", "sin"),
            (@"\\cos", "cos"),
            (@"\\tan", "tan"),
            (@"\\exp", "exp"),
            (@"\\sqrt", "sqrt"),
            (@"\\log", "log"),
            (@"\\ln", "log"),
            (@"e\^{", "exp("),
            (@"\\pi", "pi")
            };

            foreach (var (latex, sympyFunc) in latexToSymPy)
            {
                latexFunction = Regex.Replace(latexFunction, latex, sympyFunc);
            }


            latexFunction = Regex.Replace(latexFunction, @"(?<!\w)e\^({[^}]+}|\w+)", "exp($1)");
            latexFunction = Regex.Replace(latexFunction, @"(?<=exp\([^)]*\))(?=\w)", " * ");

            latexFunction = Regex.Replace(latexFunction, @"(?<=\))(?=[a-zA-Z])", " * ");


            latexFunction = Regex.Replace(latexFunction, @"(?<=[0-9a-zA-Z])(?=\s*(sin|cos|tan|exp|sqrt|log|ln|pi)\s*\()", " * ");

            latexFunction = latexFunction.Replace(@"\left", "").Replace(@"\right", "");
            latexFunction = latexFunction.Replace("{", "(").Replace("}", ")");

            Console.WriteLine($"Converted function: {latexFunction}");
            return latexFunction;
        }

        private static string LatexToCSharp(string latexFunction)
        {
            latexFunction = LatexToSympy(latexFunction);

            var latexToCSharp = new (string, string)[]
            {
            ("sin", "Sin"),
            ("cos", "Cos"),
            ("tan", "Tan"),
            ("exp", "Exp"),
            ("sqrt", "Sqrt"),
            ("log", "Log"),
            ("pi", "PI")
            };

            foreach (var (latex, func) in latexToCSharp)
            {
                latexFunction = Regex.Replace(latexFunction, latex, $"Math.{func}");
            }

            return latexFunction;
        }

        private static Func<double, double> CompileFunction(string functionString)
        {
            return x =>
            {
                var expression = new Expression(functionString);
                expression.Parameters["x"] = x;
                return Convert.ToDouble(expression.Evaluate());
            };
        }

        public double calculateValue(double value)
        {
            return NumericFunction(value);
        }

        // TODO: Create a numerical method to calculate integrals (Like Simpson's method)

        /* Unsafe implementation, this misuses a data table as a calculator
        private static Func<double, double> CompileFunction(string functionString)
        {
            // This just replaces all "x" instances with a {0} to later substitute it with an actual value
            string expression = functionString.Replace("x", "({0})"); 
            return x =>
            {
                string formattedExpression = string.Format(expression, x.ToString(System.Globalization.CultureInfo.InvariantCulture));
                return Evaluate(formattedExpression);
            };
        }

        private static double Evaluate(string expression)
        {
            try
            {
                var table = new DataTable();
                return Convert.ToDouble(table.Compute(expression, ""));
            }
            catch
            {
                throw new Exception("Failed to evaluate the function.");
            }
        }*/
    }
}

from sympy import symbols, sympify, integrate, diff, limit, simplify
from sympy.parsing.sympy_parser import parse_expr
import json
import sys

x = symbols('x')

def solve_integral(expr_str, a=None, b=None):
    expr = parse_expr(expr_str)
    if a is not None and b is not None:
        integral = integrate(expr, (x, a, b))
        steps = [
            f"Given: \\( \\int_{{{a}}}^{{{b}}} {latex(expr)} \\, dx \\)",
            f"Step 1: Find antiderivative: \\( \\int {latex(expr)} \\, dx = {latex(integrate(expr, x))} + C \\)",
            f"Step 2: Evaluate from {a} to {b}:",
            f"\\( {latex(integrate(expr, x))} \\bigg|_{{{a}}}^{{{b}}} = {latex(integral)} \\)"
        ]
    else:
        antiderivative = integrate(expr, x)
        steps = [
            f"Given: \\( \\int {latex(expr)} \\, dx \\)",
            f"Step 1: Find antiderivative: \\( {latex(antiderivative)} + C \\)"
        ]
    return steps


def latex(expr):
    from sympy import latex as sympy_latex
    return sympy_latex(expr)

if __name__ == "__main__":
    try:
        input_json = sys.argv[1]
        data = json.loads(input_json)

        expr_type = data.get("type")
        expression = data.get("expression")
        a = data.get("a")
        b = data.get("b")
        point = data.get("point")

        if expr_type == "integral":
            steps = solve_integral(expression, a, b)
        elif expr_type == "derivative":
            steps = solve_derivative(expression)
        elif expr_type == "limit":
            steps = solve_limit(expression, point)
        else:
            steps = ["Unsupported operation type"]

        print(json.dumps({"steps": steps}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

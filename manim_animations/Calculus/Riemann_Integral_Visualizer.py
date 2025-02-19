from manim import *
from sympy import *
import re


class GetRiemannRectangles(Scene):
    def construct(self):
        input_file = "G:\\Capstone\\manim_animations\\Calculus\\media\\videos\\Riemann_Integral_Visualizer\\1080p60\\temp.txt"

        with open(input_file, 'r') as f:
            parameters = f.read().strip()

        l = parameters.split(',')
        print(l)
        if len(l) < 8:
            print(f"Error: Expected 8 parameters but got {len(l)}. Content: {l}")
            return

        sympy_function = l[0]
        xMin, xMax, yMin, yMax, xStep,yStep,integral_dx = l[1:8]

        """print(f"Raw input function: {latex_function}")

        latex_function = re.sub(r"f\s*\(x\)\s*=", "", latex_function)  
        latex_function = re.sub(r"f\\left\(x\\right\)\s*=", "", latex_function)

        latex_function = re.sub(r"\\frac\{([^{}]+)\}\{([^{}]+)\}", r"(\1/\2)", latex_function)

        latex_to_sympy = {
            r"\\sin": "sin",
            r"\\cos": "cos",
            r"\\tan": "tan",
            r"\\exp": "exp",
            r"\\sqrt": "sqrt",
            r"\\log": "log",
            r"\\ln": "log",
            r"\\pi": "pi"
        }

        for latex, sympy_func in latex_to_sympy.items():
            latex_function = re.sub(latex, sympy_func, latex_function)

        latex_function = re.sub(r"e\^({[^}]+}|[a-zA-Z0-9]+)", r"exp(\1)", latex_function)

        latex_function = latex_function.replace("^", "**")

        latex_function = latex_function.replace(r"\left", "").replace(r"\right", "")
        latex_function = latex_function.replace("{", "(").replace("}", ")")

        print(latex_function)
        x = symbols('x')
        try:
            symbolic_expr = sympify(latex_function, evaluate=False)
            func = lambdify(x, symbolic_expr, modules=["numpy"])
        except Exception as e:
            print(f"Error parsing LaTeX function: {e}")
            return
        """
        try:
            xMin, xMax, yMin, yMax, xStep,yStep,integral_dx = float(xMin), float(xMax), float(yMin), float(yMax), float(xStep),float(yStep),float(integral_dx)
        except ValueError:
            print("Error: One or more parameters could not be converted to float.")
            return

        x = symbols('x')
        symbolic_expr = sympify(sympy_function, evaluate=False)
        func = lambdify(x, symbolic_expr, modules=["numpy"])
        axes = Axes(
            x_range=[xMin, xMax, xStep], 
            y_range=[yMin, yMax, yStep],
            x_length=8,
            y_length=6,
            axis_config={"include_tip": True}
        ).add_coordinates()

        graph = axes.plot(func, x_range=(xMin, xMax, xStep), color=YELLOW)

        y_label = axes.get_y_axis_label("y", edge=LEFT, direction=LEFT, buff=0.4)
        x_label = axes.get_x_axis_label("x")

        Axes_lab = (
            MathTex(r"f(x)=" + str(func))
            .next_to([xMax, yMax, 0], UR-0.5)
            .set_color(BLUE)
            .scale(0.6)
        )

        axes_labels = VGroup(x_label, y_label)

        riemann_rectangles = axes.get_riemann_rectangles(graph, x_range=[xMin, xMax], dx=integral_dx)

        self.add(axes)
        self.play(Create(axes), Create(graph))
        self.play(Create(Axes_lab))
        self.play(Create(riemann_rectangles))
        self.wait(2)


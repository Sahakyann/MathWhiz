from manim import *
from sympy import *
import re



class limitVisualizer(Scene):
     def construct(self):
        input_file = "G:\\Capstone\\manim_animations\\Calculus\\media\\images\\limit_visualizer\\temp.txt"
        
        with open(input_file, 'r') as f:
            parameters = f.read().strip()
        
        l = parameters.split(',')
        if len(l) < 5:
            print(f"Error: Expected 6 parameters but got {len(l)}. Content: {l}")
            return

        latex_function = l[0]
        xMin, xMax, yMin, yMax = l[1:5]

        print(f"Raw input function: {latex_function}")

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
            r"e\^{": "exp(",
            r"\\pi": "pi"
        }

        for latex, sympy_func in latex_to_sympy.items():
            latex_function = re.sub(latex, sympy_func, latex_function)

 
        latex_function = latex_function.replace(r"\left", "").replace(r"\right", "")
        latex_function = latex_function.replace("{", "(").replace("}", ")")

        print(latex_function)
        x = symbols('x')
        try:
            symbolic_expr = sympify(latex_function, evaluate=False)
            func = lambdify(x, symbolic_expr, modules=["math"])
        except Exception as e:
            print(f"Error parsing LaTeX function: {e}")
            return

        try:
            xMin, xMax, yMin, yMax = float(xMin), float(xMax), float(yMin), float(yMax), float(xStep)
        except ValueError:
            print("Error: One or more parameters could not be converted to float.")
            return

        grid = Axes(
            x_range=[xMin, xMax, 5], 
            y_range=[yMin, yMax, 5],
            x_length=8,
            y_length=6,
            axis_config={"include_tip": True}
        ).add_coordinates()
        
        graph = grid.plot(func, x_range=(xMin, xMax), color=YELLOW)


        Axes_lab = (
            MathTex(r"f(x)=" + latex_function)
            .next_to([xMax+1.5, yMax+0.5, 0], RIGHT)
            .set_color(BLUE)
            .scale(0.6)
        )

   
        c = ValueTracker(xMin)

        label_tracker_x = always_redraw(
            lambda: MathTex(fr"x = {c.get_value():.2f}")
            .next_to(Axes_lab, DOWN)
            .set_color(GREEN)
            .scale(0.6)
        )

        label_tracker_y = always_redraw(
            lambda: MathTex(fr"f(x) = {graph.underlying_function(c.get_value()):.5f}")
            .next_to(label_tracker_x, DOWN)
            .set_color(BLUE)
            .scale(0.6)
        )

        value_dot = always_redraw(
            lambda: Dot()
            .move_to(grid.c2p(c.get_value(), graph.underlying_function(c.get_value())))
            .set_color(RED)
        )

        self.add(grid)
        self.play(DrawBorderThenFill(grid))
        self.play(Create(graph))
        self.play(Create(Axes_lab))

        self.add(label_tracker_x, label_tracker_y, value_dot)
        self.play(c.animate.set_value(xMax), run_time=6, rate_func=linear)
        self.wait()

if __name__ == "__main__":
    config.media_dir = "G:\\Capstone\\manim_animations\\Calculus\\media\\images\\limit_visualizer"
    #scene.render()




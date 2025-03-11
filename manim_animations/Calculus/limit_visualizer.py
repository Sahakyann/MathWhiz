from manim import *
import sympy as sp
import re



class limitVisualizer(Scene):
     def construct(self):
        input_file = "G:\\Capstone\\manim_animations\\Calculus\\media\\videos\\limit_visualizer\\1080p60\\temp.txt"
        
        with open(input_file, 'r') as f:
            parameters = f.read().strip()

        l = parameters.split(',')
        print(l)
        if len(l) < 5:
            print(f"Error: Expected 5 parameters but got {len(l)}. Content: {l}")
            return

        sympy_function = l[0]
        latex_function = l[5]
        xMin, xMax, yMin, yMax = l[1:5]
        print(f"Function Received from the server: {sympy_function}")

        '''latex_function = re.sub(r"f\s*\(x\)\s*=", "", latex_function)  
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
            return'''

        try:
            xMin, xMax, yMin, yMax = float(xMin), float(xMax), float(yMin), float(yMax)
        except ValueError:
            print("Error: One or more parameters could not be converted to float.")
            return

        x = sp.symbols('x')
        symbolic_expr = sp.sympify(sympy_function, evaluate=False)
        func = sp.lambdify(x, symbolic_expr, modules=["numpy"])

        axes = Axes(
            x_range=[xMin, xMax, 1], 
            y_range=[yMin, yMax, 1],
            x_length=8,
            y_length=6,
            axis_config={"include_tip": True,'tip_shape': StealthTip}
        ).add_coordinates()
        
        graph = axes.plot(func, x_range=(xMin, xMax), color=YELLOW, use_smoothing=False)


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
            lambda: MathTex(fr"f(x) = {graph.underlying_function(c.get_value()):.2f}")
            .next_to(label_tracker_x, DOWN)
            .set_color(BLUE)
            .scale(0.6)
        )

        value_dot = always_redraw(
            lambda: Dot()
            .move_to(axes.c2p(c.get_value(), graph.underlying_function(c.get_value())))
            .set_color(RED)
        )

        self.add(axes)
        self.play(DrawBorderThenFill(axes))
        self.play(Create(graph))
        self.play(Create(Axes_lab))

        self.add(label_tracker_x, label_tracker_y, value_dot)
        self.play(c.animate.set_value(xMax), run_time=6, rate_func=linear)
        self.wait()




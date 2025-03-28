from manim import *
import sympy as sp
import json
import numpy as np

class NewtonsMethod(Scene):
    def construct(self):
        # Load JSON file (Manim CLI argument: --json_file)
        json_file_path = config.get("json_file")
        if not json_file_path:
            print("Error: No JSON file provided.")
            return
        
        with open(json_file_path, "r") as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                print("Error: Invalid JSON format.")
                return
        
       
        sympy_function = data.get("sympyMathFunction", "x**2 - 2") 
        x_start = float(data.get("initialGuess", 1.5))
        x_min, x_max = float(data.get("xMin", -2)), float(data.get("xMax", 2))
        max_iterations = data.get("maxIterations", 10)
       
        x = sp.Symbol('x')
        f_expr = sp.sympify(sympy_function, evaluate=False)
        f_prime_expr = sp.diff(f_expr, x) 

       
        f = sp.lambdify(x, f_expr, 'numpy')
        f_prime = sp.lambdify(x, f_prime_expr, 'numpy')

        print(f"Function: {f_expr}")
        print(f"Derivative: {f_prime_expr}") 

       
        axes = Axes(
            x_range=[x_min, x_max, 1],
            y_range=[-4, 4, 1],
            x_length=8,
            y_length=6,
            axis_config={"include_tip": True}
        ).add_coordinates()

        graph = axes.plot(lambda x: f(x), color=YELLOW, x_range=[x_min, x_max])
        function_label = MathTex(f"f(x) = {sp.latex(f_expr)}").to_corner(UL).set_color(YELLOW)

        self.play(Create(axes), Create(graph), Write(function_label))
        self.wait(1)

        tolerance = 1e-3
        points = [x_start]
        tangent_lines = []

        for i in range(max_iterations):
            x_n = points[-1]
            y_n = f(x_n)
            slope = f_prime(x_n)

            if abs(slope) < 1e-6:
                break  

          
            x_next = x_n - y_n / slope
            points.append(x_next)


            tangent_line = axes.plot(lambda x: slope * (x - x_n) + y_n, color=BLUE, x_range=[x_min, x_max])
            tangent_lines.append(tangent_line)

       
            point = Dot(axes.c2p(x_n, y_n), color=RED)
            new_x_label = MathTex(f"x_{i+1}").next_to(point, DOWN)

            self.play(Create(tangent_line), Create(point), Write(new_x_label))
            self.wait(1)

         
            next_point = Dot(axes.c2p(x_next, 0), color=GREEN)
            self.play(Create(next_point))
            self.wait(1)

            if abs(x_next - x_n) < tolerance:
                break

        self.wait(2)

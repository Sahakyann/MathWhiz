from manim import *
import sympy as sp
import json
import os

class GetRiemannRectangles(Scene):
    def construct(self):
        # Get JSON file path from CLI
        json_file_path = config.get("json_file")

        if not json_file_path or not os.path.exists(json_file_path):
            print("Error: No valid JSON file provided.")
            return

        with open(json_file_path, "r") as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                print("Error: Invalid JSON format.")
                return

      
        try:
            sympy_function = data["sympyMathFunction"]
            latex_function = data["latex_function"]
            xMin, xMax, yMin, yMax = data["xMin"], data["xMax"], data["yMin"], data["yMax"]
            xStep, yStep = data["xStep"], data["yStep"]
            integral_dx = data["integral_dx"]
            integral_from, integral_to = data["integral_from"], data["integral_to"]
        except KeyError as e:
            print(f"Error: Missing key {e} in JSON data.")
            return

        print(f"Function Received from the JSON file: {sympy_function}")

       
        try:
            xMin, xMax, yMin, yMax = float(xMin), float(xMax), float(yMin), float(yMax)
            xStep, yStep = float(xStep), float(yStep)
            integral_dx = float(integral_dx)
            integral_from, integral_to = float(integral_from), float(integral_to)
        except ValueError:
            print("Error: One or more parameters could not be converted to float.")
            return

  
        x = sp.symbols('x')
        symbolic_expr = sp.sympify(sympy_function, evaluate=False)
        func = sp.lambdify(x, symbolic_expr, modules=["numpy"])

    
        axes = Axes(
            x_range=[xMin, xMax, xStep], 
            y_range=[yMin, yMax, yStep],
            x_length=8,
            y_length=6,
            axis_config={"include_tip": True, 'tip_shape': StealthTip}
        ).add_coordinates()

     
        graph = axes.plot(func, x_range=(xMin, xMax, xStep), color=YELLOW)

        y_label = axes.get_y_axis_label("y", edge=LEFT, direction=LEFT, buff=0.4)
        x_label = axes.get_x_axis_label("x")
        axes_labels = VGroup(x_label, y_label)

        function_label = (
            MathTex(latex_function)   
            .to_edge(UL)
            .set_color(BLUE)
            .scale(0.6)
        )

      
        riemann_rectangles = axes.get_riemann_rectangles(graph, x_range=[integral_from, integral_to], dx=integral_dx)

        self.add(axes)
        self.play(Create(axes), Create(graph))
        self.play(Create(function_label))
        self.play(Create(riemann_rectangles))
        self.wait(2)
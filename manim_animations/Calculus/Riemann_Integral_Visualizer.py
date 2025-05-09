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

        axes = Axes(
            x_range=[xMin, xMax, xStep], 
            y_range=[yMin, yMax, yStep],
            x_length=8,
            y_length=6,
            axis_config={"include_tip": True, 'tip_shape': StealthTip}
        ).add_coordinates()

        function_label = (
            MathTex(r"\int_{%s}^{%s} %s \, dx" % (integral_from, integral_to, latex_function))   
            .to_edge(UL)
            .set_color(BLUE)
            .scale(0.6)
        )
        

        x = sp.symbols('x')
        symbolic_expr = sp.sympify(sympy_function, evaluate=False)
        func = sp.lambdify(x, symbolic_expr, modules=["numpy"])
        singularities = sp.singularities(symbolic_expr, x)
        singular_points = [float(s.evalf()) for s in singularities if s.is_real]

        singular_points = sorted([s for s in singular_points if xMin < s < xMax])

        plot_intervals = []
        previous_x = xMin

        for singularity in singular_points:
            if previous_x < singularity - 0.05:
                plot_intervals.append((previous_x, singularity - 0.05))
            previous_x = singularity + 0.05

        if previous_x < xMax:
            plot_intervals.append((previous_x, xMax))


        for singularity in singular_points:
            dashed_line = DashedLine(
            start=axes.c2p(singularity, yMin-10),
            end=axes.c2p(singularity, yMax+10),
            color=RED,
            dash_length=0.1)
            self.add(dashed_line)

        graphs = []
        for start, end in plot_intervals:
            graph_segment = axes.plot(func, x_range=(start, end, xStep), color=YELLOW)
            graphs.append(graph_segment)

     
        integration_intervals = []
        previous_x = integral_from

        for singularity in singular_points:
            if previous_x < singularity - 0.05:
                integration_intervals.append((previous_x, singularity - 0.05))
            previous_x = singularity + 0.05

        if previous_x < integral_to:
            integration_intervals.append((previous_x, integral_to))

        riemann_rects = []
        for start, end in integration_intervals:
            graph_segment = axes.plot(func, x_range=(start, end, xStep), color=GREEN)
            riemann_rects.append(axes.get_riemann_rectangles(graph_segment, x_range=[start, end], dx=integral_dx))


        self.add(axes)
        for graph in graphs:
            self.play(Create(graph)) 
        self.play(Create(function_label))

        for rect in riemann_rects:
            self.play(Create(rect))

        self.wait(2)
  
        '''x = sp.symbols('x')
        symbolic_expr = sp.sympify(sympy_function, evaluate=False)
        func = sp.lambdify(x, symbolic_expr, modules=["numpy"])

    
       

     
        graph = axes.plot(func, x_range=(xMin, xMax, xStep), color=YELLOW)

        y_label = axes.get_y_axis_label("y", edge=LEFT, direction=LEFT, buff=0.4)
        x_label = axes.get_x_axis_label("x")
        axes_labels = VGroup(x_label, y_label)

        function_label = (
            MathTex("f(x)=",latex_function)   
            .to_edge(UL)
            .set_color(BLUE)
            .scale(0.6)
        )

      
        riemann_rectangles = axes.get_riemann_rectangles(graph, x_range=[integral_from, integral_to], dx=integral_dx)

        self.add(axes)
        self.play(Create(axes), Create(graph))
        self.play(Create(function_label))
        self.play(Create(riemann_rectangles))
        self.wait(2)'''
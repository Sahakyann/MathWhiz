import json
import argparse
import sympy as sp
import numpy as np
import os
from manim import *

class TaylorSeriesVisualizer(Scene):
    def construct(self):
        json_file_path = config.get("json_file")

        if not json_file_path or not os.path.exists(json_file_path):
            print("Error: No valid JSON file provided.")
            return

        with open(json_file_path, "r") as f:
            try:
                json_data = json.load(f)
            except json.JSONDecodeError:
                print("Error: Invalid JSON format.")
                return
   
        x = sp.Symbol('x')
        func_expr = sp.sympify(json_data["sympyMathFunction"]) 
        a = json_data["expansionPoint"]
        degree = json_data["degree"]
        x_min, x_max = json_data["xMin"], json_data["xMax"]

        func = sp.lambdify(x, func_expr, 'numpy')

 
        axes = Axes(
            x_range=[x_min, x_max, 1],
            y_range=[-2, 2, 0.5],
            x_length=7,
            y_length=5,
            axis_config={"include_tip": True}
        ).add_coordinates()

      
        graph = axes.plot(lambda x: func(x), color=YELLOW, x_range=[x_min, x_max])
        function_label = MathTex(f"f(x) = {sp.latex(func_expr)}").to_corner(UL).set_color(YELLOW)

 
        self.play(Create(axes), Create(graph), Write(function_label))
        self.wait(1)

    
        colors = [PURE_BLUE, BLUE, DARK_BLUE, MAROON] 

        taylor_graphs = []
        labels = []

    
        for i, n in enumerate(range(1, degree + 1, 2)):
            taylor_poly = sum(
                (sp.diff(func_expr, x, i).subs(x, a) / sp.factorial(i)) * (x - a) ** i
                for i in range(n + 1)
            )
            taylor_func = sp.lambdify(x, taylor_poly, 'numpy')

            color = colors[min(i, len(colors) - 1)] 

         
            taylor_graph = axes.plot(lambda x: taylor_func(x), color=color, x_range=[x_min, x_max])
            taylor_graphs.append(taylor_graph)

            label = MathTex(f"n = {n}").scale(0.7)
            label.next_to(taylor_graph.get_end(), RIGHT, buff=0.5).set_color(color)
            labels.append(label)

   
        for i in range(len(taylor_graphs)):
            self.play(Create(taylor_graphs[i]), Write(labels[i]))
            self.wait(1)

        self.wait(2)

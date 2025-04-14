from manim import *
import numpy as np

config.frame_size = (1080, 1920)

class LinearAlgebraBackground(Scene):
    def construct(self):
        title = Text("Linear").next_to([-1.2, 9.3, 0]).set_color(color_gradient([PURPLE, TEAL], 2)).scale(3.4)
        bottom_title = Text("Algebra").next_to(title,DOWN,buff=1).set_color(color_gradient([PURPLE, TEAL], 2)).scale(3.4)
        vector_def = MathTex(r"\vec{v} = \begin{bmatrix} x \\ y \end{bmatrix}").next_to(bottom_title, DOWN, buff=2).scale(2).set_color(color_gradient([TEAL,PURPLE], 2))
        matrix_eq = MathTex(r"A\vec{x} = \vec{b}").next_to(vector_def, DOWN, buff=1.3).scale(2).set_color(color_gradient([PURPLE, PINK], 2))
        dot_product = MathTex(r"\vec{a} \cdot \vec{b} = \|\vec{a}\|\|\vec{b}\|\cos(\theta)").next_to(matrix_eq, DOWN, buff=2).scale(1.5).set_color(color_gradient([TEAL,PINK], 2))

     
        plane = NumberPlane(
            x_range=[-6, 6, 1],
            y_range=[-6, 6, 1],
            x_length=6,
            y_length=6,
            background_line_style={
                "stroke_color": GREY,
                "stroke_width": 1,
                "stroke_opacity": 0.4
            }
        ).set_opacity(0.8)

      
        vec1 = Arrow(start=plane.c2p(0, 0), end=plane.c2p(3, 2), buff=0, color=YELLOW)
        vec2 = Arrow(start=plane.c2p(0, 0), end=plane.c2p(-2, 3), buff=0, color=GREEN)

        
        visual = VGroup(plane, vec1, vec2).next_to(dot_product, DOWN, buff=2)

        self.add(title, bottom_title,vector_def, matrix_eq, dot_product, visual)

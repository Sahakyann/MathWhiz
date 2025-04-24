from manim import *
import numpy as np

class VectorOperationsThumbnail(Scene):
    def construct(self):

        title = Text("LINEAR ALGEBRA", weight=BOLD, color=WHITE).scale(2).center()

        self.add(title)

        plane = NumberPlane(
            x_range=[-20, 20],
            y_range=[-20, 20],
            background_line_style={
               
                "stroke_color": DARK_BLUE,
                "stroke_opacity": 0.2,
                "stroke_width": 3,
            },
        ).scale(0.95).shift(UP*0.5)

        v1 = Arrow(start=plane.c2p(0, 0), end=plane.c2p(2, 1), buff=0, color=TEAL, stroke_opacity=0.4)
        v2 = Arrow(start=plane.c2p(0, 0), end=plane.c2p(-1.5, 1.5), buff=0,color=TEAL, stroke_opacity=0.4)
        v3 = Arrow(start=plane.c2p(0, 0), end=plane.c2p(0.5, 2.5),buff=0, color=TEAL, stroke_opacity=0.4)

        self.add(plane, v1, v2, v3)



class LinearAlgebraPlaceholderThumbnail(Scene):
    def construct(self):


        
        title = Text("LINEAR ALGEBRA", weight=BOLD, color=WHITE).scale(2).center()
        self.add(title)

 
        plane = NumberPlane(
            background_line_style={
                "stroke_color": DARK_BLUE,
                "stroke_opacity": 0.2,
                "stroke_width": 3,
            },
        ).scale(0.95).shift(UP * 0.5)
        
        matrix = [[2, 0], [0.5, 1.5]]

        self.play(
            ApplyMatrix(matrix, plane),
            run_time=3
        )

        vectors = VGroup(
            Arrow(plane.c2p(0, 0), plane.c2p(2, 1), buff=0, color=TEAL, stroke_opacity=0.2),
            Arrow(plane.c2p(0, 0), plane.c2p(-1.5, 2), buff=0, color=TEAL, stroke_opacity=0.2),
            Arrow(plane.c2p(0, 0), plane.c2p(1, -1), buff=0, color=TEAL, stroke_opacity=0.2),
            Arrow(plane.c2p(0, 0), plane.c2p(-2, -0.5), buff=0, color=TEAL, stroke_opacity=0.2),
            Arrow(plane.c2p(0, 0), plane.c2p(0.5, 2), buff=0, color=TEAL, stroke_opacity=0.2)
        )



        self.add(plane, vectors)

from manim import *

class GridStretchLinearTransformation(Scene):
    def construct(self):
        grid = NumberPlane(
            background_line_style={"stroke_opacity": 0.5}
        )

        self.add(grid)
        matrix = [[2, 0], [0.5, 1.5]]

        matrix_label = MathTex(
            "T = \\begin{bmatrix} 2 & 0 \\\\ 0.5 & 1.5 \\end{bmatrix}"
        ).scale(0.8).to_corner(UL).shift(DOWN * 0.5)
        title = Text("The space gets streched", color=WHITE).scale(0.8).to_edge(DOWN)
        self.play(FadeIn(matrix_label,title))
        self.wait(0.5)

        self.play(
            ApplyMatrix(matrix, grid),
            run_time=3
        )

        self.wait(2)



class LinearTransformationProperties(Scene):
    def construct(self):
        grid = NumberPlane(
            background_line_style={"stroke_opacity": 0.5}
        )

        self.add(grid)

        line1 = Line(start=grid.c2p(-4, 2), end=grid.c2p(4, 2), color=BLUE)
        line2 = Line(start=grid.c2p(-4, -1), end=grid.c2p(4, 3), color=YELLOW)

        vec1 = Arrow(start=grid.c2p(0, 0), end=grid.c2p(2, 1), color=GREEN)
        vec2 = Arrow(start=grid.c2p(0, 0), end=grid.c2p(-3, 2), color=RED)

       

        matrix = [[1, 0.5], [0, 1.5]]

        matrix_label = MathTex(
            "T = \\begin{bmatrix} 1 & 0.5 \\\\ 0 & 1.5 \\end{bmatrix}"
        ).scale(0.8).to_corner(UL).shift(DOWN * 0.5)
        title = Text("The space gets streched", color=WHITE).scale(0.8).to_edge(DOWN)
        self.play(FadeIn(matrix_label,title))
        self.wait(0.5)
        self.add(line1, line2, vec1, vec2)
        self.play(
            ApplyMatrix(matrix, grid),
            ApplyMatrix(matrix, line1),
            ApplyMatrix(matrix, line2),
            ApplyMatrix(matrix, vec1),
            ApplyMatrix(matrix, vec2),
            run_time=3
        )

        self.wait(2)

from manim import *
import numpy as np
import json
import os

class EigenvectorVisualizerWithLegend(Scene):
    def construct(self):
        json_file_path = config.get("json_file")

        if not json_file_path or not os.path.exists(json_file_path):
            print("No valid JSON file provided. Using default values.")
            A = np.array([[2, 1], [1, 2]])
            vectors = [
                np.array([1, 0]), np.array([0, 1]), np.array([1, 1]),
                np.array([-1, 1]), np.array([2, -1])
            ]
        else:
            with open(json_file_path, "r") as f:
                data = json.load(f)
                A = np.array(data.get("Matrix", [[2, 1], [1, 2]]))
                vectors = [np.array(v) for v in data.get("Vectors", [[1, 0], [0, 1]])]

        matrix_tex = MathTex(
            f"A = \\begin{{bmatrix}} {A[0,0]} & {A[0,1]} \\\\ {A[1,0]} & {A[1,1]} \\end{{bmatrix}}"
        ).to_corner(UL).scale(0.75)
        self.play(Write(matrix_tex))

        grid = NumberPlane()
        self.play(Create(grid))

        legend = VGroup(
            Text("Green = Eigenvector", font_size=24, color=GREEN),
            Text("Blue = Non-eigenvector", font_size=24, color=BLUE)
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2).to_corner(DL)
        self.play(FadeIn(legend))

        for i, vec in enumerate(vectors):
            transformed = A @ vec
            is_eigen = np.cross(vec, transformed) == 0
            color = GREEN if is_eigen else BLUE

            vec_arrow = Arrow(ORIGIN, [*vec, 0], color=color, buff=0)
            vec_label = MathTex(f"\\vec{{v}}_{{{i+1}}}").scale(0.6).next_to(vec_arrow.get_end(), UR)
            self.play(GrowArrow(vec_arrow), Write(vec_label), run_time=0.6)
            self.wait(0.5)
            trans_arrow = Arrow(ORIGIN, [*transformed, 0], color=color, buff=0)
            trans_label = MathTex(f"A\\vec{{v}}_{{{i+1}}}").scale(0.6).next_to(trans_arrow.get_end(), UR)
            self.play(Transform(vec_arrow, trans_arrow), Transform(vec_label, trans_label), run_time=0.8)

            if is_eigen:
                span_line = Line([* -3*vec, 0], [* 3*vec, 0], color=WHITE, stroke_opacity=0.3)
                self.play(Create(span_line), run_time=0.5)

            label = MathTex(f"\\vec{{v}}_{{{i+1}}} = \\begin{{bmatrix}} {vec[0]} & {vec[1]} \\end{{bmatrix}}")
            label.scale(0.5).next_to(matrix_tex, DOWN, buff=0.3 + 0.3*i).align_to(matrix_tex, LEFT)
            self.play(Write(label), run_time=0.4)

            self.wait(1)

        self.wait(2)

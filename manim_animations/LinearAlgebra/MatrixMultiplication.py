from manim import *
import numpy as np
import json
import os

class MatrixMultiplication(Scene):
    def construct(self):
        json_file_path = config.get("json_file")
        if not json_file_path or not os.path.exists(json_file_path):
            A = np.array([[1, 2], [3, 4]])
            B = np.array([[5, 6], [7, 8]])
        else:
            with open(json_file_path, "r") as f:
                data = json.load(f)
                A = np.array(data["Matrix"])
                B = np.array(data["Vectors"])

        result = A @ B

        matrix_A = Matrix(A, left_bracket="[", right_bracket="]")
        matrix_B = Matrix(B, left_bracket="[", right_bracket="]")
        matrix_result = Matrix(result * 0, left_bracket="[", right_bracket="]")

        dot = MathTex("\\cdot")
        equals = MathTex("=")


        equation_group = VGroup(matrix_A, dot, matrix_B, equals, matrix_result)
        equation_group.arrange(RIGHT, buff=0.5)
        equation_group.move_to(UP * 1.5)

        self.play(Write(matrix_A), Write(dot), Write(matrix_B), Write(equals), Write(matrix_result))
        self.wait(1)

        entries_A = matrix_A.get_entries()
        entries_B = matrix_B.get_entries()
        entries_R = matrix_result.get_entries()

        rows_A, cols_A = A.shape
        rows_B, cols_B = B.shape

        expressions = VGroup()

        for i in range(rows_A):
            for j in range(cols_B):
 
                row_indices = [entries_A[i * cols_A + k] for k in range(cols_A)]
                col_indices = [entries_B[k * cols_B + j] for k in range(rows_B)]

                self.play(*[entry.animate.set_color(YELLOW) for entry in row_indices])
                self.play(*[entry.animate.set_color(ORANGE) for entry in col_indices])
                self.wait(0.3)

                term_tex_parts = []
                for k in range(cols_A):
                    a = str(A[i, k])
                    b = str(B[k, j])
                    term = VGroup(
                        MathTex(b).set_color(ORANGE),
                        MathTex(" \\cdot ").set_color(WHITE),
                         MathTex(a).set_color(YELLOW)
                    )
                    term.arrange(LEFT, buff=0.05)
                    term_tex_parts.append(term)

                full_expr = VGroup()
                for idx, term in enumerate(term_tex_parts):
                    full_expr.add(term)
                    if idx < len(term_tex_parts) - 1:
                        plus = MathTex("+")
                        plus.set_color(WHITE)
                        full_expr.add(plus)

                equals = MathTex("=")
                equals.set_color(WHITE)
                value = MathTex(str(result[i, j]))
                value.set_color(WHITE)
                full_expr.add(equals, value)

                full_expr.arrange(RIGHT, buff=0.2)
                full_expr.next_to(matrix_B, DOWN, buff=0.5 + 0.5 * len(expressions))
                expressions.add(full_expr)

                self.play(Write(full_expr))

                result_entry = entries_R[i * cols_B + j]
                new_value = MathTex(str(result[i, j]))
                new_value.move_to(result_entry.get_center())
                new_value.set_color(WHITE)
                self.play(Transform(result_entry, new_value))

                self.wait(0.3)
                self.play(*[entry.animate.set_color(WHITE) for entry in row_indices + col_indices])

        self.wait(2)

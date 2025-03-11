from manim import *
import numpy as np
import json
import os

class VectorTransformation(Scene):
    def construct(self):
        # Get JSON file path from cli argument
        json_file_path = config.get("json_file")

        if not json_file_path or not os.path.exists(json_file_path):
            print("No valid JSON file provided. Using default values.")
            transformation_matrix = np.array([[1.5, 0.5], [-0.5, 1]])
            vectors = [np.array([2, 3])]
        else:
            with open(json_file_path, "r") as f:
                data = json.load(f)
                transformation_matrix = np.array(data.get("Matrix", [[1.5, 0.5], [-0.5, 1]]))
                vectors = [np.array(v) for v in data.get("Vectors", [[2, 3]])]


        axes = NumberPlane()
        self.add(axes)

        matrix_label = MathTex(
            f"T = \\begin{{bmatrix}} {transformation_matrix[0,0]} & {transformation_matrix[0,1]} \\\\ {transformation_matrix[1,0]} & {transformation_matrix[1,1]} \\end{{bmatrix}}"
        ).to_corner(UL)
        self.add(matrix_label)

  
        i_hat = Arrow(ORIGIN, RIGHT, buff=0, color=BLUE)
        j_hat = Arrow(ORIGIN, UP, buff=0, color=GREEN)

    
        new_i_hat = Arrow(ORIGIN, np.append(transformation_matrix @ np.array([1, 0]), 0), buff=0, color=BLUE)
        new_j_hat = Arrow(ORIGIN, np.append(transformation_matrix @ np.array([0, 1]), 0), buff=0, color=GREEN)

        self.play(Create(i_hat), Create(j_hat))

        
        vg_orig = VGroup()
        vg_transformed = VGroup()

        for v in vectors:
            vector = Arrow(ORIGIN, np.append(v, 0), buff=0, color=YELLOW)
            transformed_v = transformation_matrix @ v
            transformed_vector = Arrow(ORIGIN, np.append(transformed_v, 0), buff=0, color=YELLOW)

            v_label = MathTex(f"{v[0]}\\hat{{i}} + {v[1]}\\hat{{j}}").next_to(vector, RIGHT)
            new_v_label = MathTex(f"{transformed_v[0]:.1f}\\hat{{i}} + {transformed_v[1]:.1f}\\hat{{j}}").next_to(transformed_vector, RIGHT)

            self.play(Create(vector), Write(v_label))
            vg_orig.add(vector)
            vg_orig.add(v_label)
            vg_transformed.add(transformed_vector)
            vg_transformed.add(new_v_label)
        
        self.play(Transform(i_hat, new_i_hat), Transform(j_hat, new_j_hat),Transform(vg_orig,vg_transformed))
        self.wait(1)
      
        
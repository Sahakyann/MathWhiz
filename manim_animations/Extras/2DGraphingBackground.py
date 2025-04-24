from manim import *
import numpy as np

config.frame_size = (1080, 1920)

class TwoDGraphingBackground(Scene):
    def construct(self):

        grid = NumberPlane(
            x_range=[-6, 6, 1],
            y_range=[-10, 10, 1],
            x_length=20,
            y_length=25,      
            axis_config={"color": WHITE}
        )
        grid.background_lines.set_color(LOGO_BLUE)
        grid_title = Tex("2D Graphing", font_size=210, color=WHITE)
        grid_title.center()

        self.add(grid, grid_title)

     
        grid.prepare_for_nonlinear_transform()
        self.play(
            grid.animate.apply_function(
                lambda p: p
                          + np.array(
                    [
                        np.sin(p[1]),
                        np.sin(p[0]),
                        0,
                    ]
                )
            ),
            run_time=3,
        )
       


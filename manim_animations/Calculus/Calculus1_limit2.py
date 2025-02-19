from manim import *
import numpy as np
import math

class C_Limit(Scene):
    def construct(self):

        grid = Axes(
            x_range=[-5, 5, 1], 
            y_range=[-2, 2, 0.5],
            x_length=10,
            y_length=4,
            axis_config={"include_tip": True, "numbers_to_exclude": [-5, -4, -3, -2, 0, 2, 3, 4, 5]}
        ).add_coordinates()

        x_axis_label = grid.get_x_axis_label(Tex("x").scale(0.5), direction=RIGHT * 1.5)
        y_axis_label = grid.get_y_axis_label(Tex("y").scale(0.5), direction=UP * 1.5)

        def func(x):
            return math.sin(math.pi / x) / x if x != 0 else 0

        graph_left = grid.plot(func, x_range=(-5, -0.01, 0.1), color=YELLOW)
        graph_right = grid.plot(func, x_range=(0.01, 5, 0.1), color=YELLOW)

        Axes_lab = (
            MathTex(r"f(x) = \frac{\sin(\pi/x)}{x}")
            .next_to([3,3,0],RIGHT)
            .set_color(BLUE)
            .scale(0.6)
        )

 
        c = ValueTracker(-2)


        label_tracker_x = always_redraw(
            lambda: MathTex(fr"x = {c.get_value():.2f}")
            .next_to(Axes_lab, DOWN)
            .set_color(GREEN)
            .scale(0.6)
        )


        label_tracker_y = always_redraw(
            lambda: MathTex(fr"f(x) = {func(c.get_value()):.2f}")
            .next_to(label_tracker_x, DOWN)
            .set_color(BLUE)
            .scale(0.6)
        )

        value_dot = always_redraw(
            lambda: Dot()
            .move_to(grid.c2p(c.get_value(), func(c.get_value())))
            .set_color(RED)
        )

        self.add(grid, x_axis_label, y_axis_label)
        self.play(DrawBorderThenFill(grid))
        self.play(Create(graph_left))
        self.play(Create(graph_right))
        self.play(Create(Axes_lab))

        self.add(label_tracker_x, label_tracker_y, value_dot)
        self.play(c.animate.set_value(2), run_time=5, rate_func=linear)
        self.wait()
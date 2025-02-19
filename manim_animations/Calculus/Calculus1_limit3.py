from manim import *
import re


class C_Limit(Scene):
    def construct(self):

        grid = Axes(
            x_range=[0, 10, 1], 
            y_range=[0, 5, 1],
            x_length = 10,
            y_length = 5,
            axis_config = {"include_tip": True}).add_coordinates()
        
        x_axis_label = grid.get_x_axis_label(Tex("x").scale(0.5), direction=RIGHT * 1.5)
        y_axis_label = grid.get_y_axis_label(Tex("y").scale(0.5), direction=UP * 1.5)
        graph = grid.plot(lambda x : x**(-1),x_range = (0.1,10,1),color = YELLOW)
        Axes_lab = (
            MathTex(r"f(x) = 1/x")
            .next_to([3,3,0],RIGHT)
            .set_color(BLUE)
            .scale(0.6)
        )
        
        c = ValueTracker(0.001)

       
        label_tracker_x = always_redraw(
            lambda: MathTex(fr"x = {c.get_value():.2f}")
            .next_to(Axes_lab, DOWN)
            .set_color(GREEN)
            .scale(0.6)
        )


        label_tracker_y = always_redraw(
            lambda: MathTex(fr"f(x) = {graph.underlying_function(c.get_value()):.5f}")
            .next_to(label_tracker_x, DOWN)
            .set_color(BLUE)
            .scale(0.6)
        )

        value_dot = always_redraw(
            lambda: Dot()
            .move_to(grid.c2p(c.get_value(), graph.underlying_function(c.get_value())))
            .set_color(RED)
        )

        self.add(grid, x_axis_label, y_axis_label)
        self.play(DrawBorderThenFill(grid))
        self.play(Create(graph))
        self.play(Create(Axes_lab))

        self.add(label_tracker_x, label_tracker_y, value_dot)
        self.play(c.animate.set_value(10), run_time=6, rate_func=linear)
        self.wait()


        





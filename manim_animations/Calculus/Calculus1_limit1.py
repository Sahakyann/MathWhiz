from manim import *
import re


class C_Limit(Scene):
    def construct(self):

        grid = Axes(
            x_range=[0, 5, 1], 
            y_range=[0, 7, 1],
            x_length = 6,
            y_length = 6,
            axis_config = {"include_tip": True,"numbers_to_exclude": [1,3,5,6,7]}).add_coordinates()
        
        x_axis_label = grid.get_x_axis_label(Tex("as $x$ approaches 2").scale(0.5),edge = DOWN,direction = DOWN,buff = 0.5)
        y_axis_label = grid.get_y_axis_label(Tex("$f(x)$ approaches 4").scale(0.5),edge = LEFT,direction = LEFT, buff = 0.5)
        graph = grid.plot(lambda x : x**2-x+2,x_range = [0,5],color = YELLOW)
        Axes_lab = (
            MathTex(r"f(x) = x^2 - x + 2")
            .next_to([1.5,1,0],RIGHT)
            .set_color(BLUE)
            .scale(0.6)
        )
        
        c = ValueTracker(0)

        #label_tracker_x = always_redraw(
        #    lambda:
        #     MathTex(fr"x = {c.get_value()}")
        #    .next_to(Axes_lab,DOWN)
        #    .set_color(GREEN)
        #    .scale(0.6)
        #)
        #label_tracker_y = always_redraw(
        #    lambda:
        #    MathTex(fr"f(x) = {graph.underlying_function(c.get_value())}")
        #    .next_to(label_tracker_x,DOWN)
        #    .set_color(BLUE)
        #    .scale(0.6)
        #)
        
       
        vert_line = always_redraw(
            lambda: Line (start = grid.c2p(c.get_value(),0),
                     end = grid.c2p(c.get_value(),graph.underlying_function(c.get_value())),
                     stroke_color =  GREEN, stroke_width = 5)
        )

        horiz_line = always_redraw(
            lambda: Line (start = grid.c2p(0,graph.underlying_function(c.get_value())),
                    end = grid.c2p(c.get_value(),graph.underlying_function(c.get_value())),
                    stroke_color = BLUE, stroke_width = 5)
        )
        self.add(grid,x_axis_label,y_axis_label)
        self.play(DrawBorderThenFill(grid))
        self.play(Create(graph))
        self.play(Create(Axes_lab))
        #self.play(Create(label_tracker_x))
        #self.play(Create(label_tracker_y))
        self.add(vert_line,horiz_line)
        self.play(
            c.animate.set_value(2),run_time = 3, rate_func = linear
        )
        self.wait(  )
        #self.play(Create(vert_line))
        #self.play(Create(horiz_line))


        





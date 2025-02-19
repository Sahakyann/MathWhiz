from manim import *


class CalculusBackground(Scene):
    def construct(self):
        axes = Axes(
            x_range=[-10, 10.3, 1],
            y_range=[-1.5, 1.5, 1],
            x_length=10,
            axis_config={"color": GREEN},
            x_axis_config={
                "numbers_to_include": np.arange(-10, 10.01, 2),
                "numbers_with_elongated_ticks": np.arange(-10, 10.01, 2),
            },
            tips=False,
        )
        #circle = Circle(stroke_width = 6,
        #stroke_color = YELLOW, 
        #fill_color = RED_C, fill_opacity = 0.8).center().scale(0.4)
    
        

        #axes_labels = axes.get_axis_labels()
        intro_text_top = Text('Welcome to').center()
        intro_text_bottom = Text('MathWhiz').next_to(intro_text_top,DOWN).set_color(color_gradient([BLUE,YELLOW],2))
        intro_text_top_end = Text('Welcome to').center()
        intro_text_bottom_end = Text('MathWhiz').next_to(intro_text_top,DOWN).set_color(color_gradient([BLUE,YELLOW],2))
        cos_graph = axes.plot(lambda x: np.cos(x), color=RED).center().scale(0.5)
        sin_graph = axes.plot(lambda x: np.sin(x), color=BLUE).center().scale(0.5)
        t = MathTex(r"f'(x) = \lim_{\Delta x \to 0} \frac{f(x+\Delta x) - f(x)}{\Delta x}").center().scale(0.9)
        t1 = MathTex(r"\int_a^b f'(x) dx = f(b)- f(a)").center().scale(0.9)

        

        sin_label = axes.get_graph_label(
            sin_graph, "\\sin(x)", x_val=-10, direction=UP / 2
        )
        cos_label = axes.get_graph_label(cos_graph, label="\\cos(x)")

        vert_line = axes.get_vertical_line(
            axes.i2gp(TAU, cos_graph), color=YELLOW, line_func=Line
        )
        line_label = axes.get_graph_label(
            cos_graph, r"x=2\pi", x_val=TAU, direction=UR, color=WHITE
        )
        vg = VGroup(intro_text_top,intro_text_bottom)
        vg_saved = VGroup(intro_text_top_end,intro_text_bottom_end)
        self.play(Write(vg))
        self.wait(1)
        self.play(ReplacementTransform(vg,cos_graph),run_time = 3)
        self.wait(1)
        self.play(ReplacementTransform(cos_graph,sin_graph),run_time = 3)
        self.wait(1)
        self.play(ReplacementTransform(sin_graph,t),run_time = 3)
        self.wait(1)
        self.play(ReplacementTransform(t,t1),run_time = 3)
        self.wait(1)
        self.play(ReplacementTransform(t1,vg_saved),run_time=3)
        self.wait(1)
        #plot = VGroup(axes, sin_graph, cos_graph, vert_line)
        #labels = VGroup(axes_labels, sin_label, cos_label, line_label)
        #self.add(plot, labels)


        





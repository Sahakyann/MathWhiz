from manim import *
import numpy as np

config.frame_size = (1080,1920)

class CalculusBackground(Scene):
    def construct(self):
        #self.camera.background_color = WHITE
    
        
        intro_text_top = Text('The Essence of').next_to([-2.4,9,0]).set_color(color_gradient([BLUE,YELLOW],2)).scale(2.2)
        intro_text_bottom = Text('Calculus').next_to(intro_text_top,DOWN,buff=0.5).set_color(color_gradient([BLUE,YELLOW],2)).scale(1.75)
        intro_text_bottom_end = Text('Calculus').next_to(intro_text_top,DOWN,buff=0.5).set_color(color_gradient([BLUE,YELLOW],2)).scale(1.75)

        
        limit = MathTex(r"\lim_{x \to a} f(x) = L").next_to(intro_text_bottom,DOWN,buff=2).scale(2)
        derivative = MathTex(r"f'(x) = \lim_{\Delta x \to 0} \frac{f(x+\Delta x) - f(x)}{\Delta x}").scale(1.4)
        integral = MathTex(r"\int_a^b f'(x) dx = f(b)- f(a)").scale(1.4)


        func = lambda x: np.sin(x) + 2
        axes = Axes(
            x_range=[0, 10, 1], 
            y_range=[0, 6, 1],
            x_length=8,
            y_length=6,
            axis_config={"include_tip": True,"include_ticks": False}
        )

        graph = axes.plot(func, x_range=(0, 10, 1), color=YELLOW)
        vg = VGroup(axes,graph).next_to(integral,DOWN,buff=2)
        riemann_rectangles = axes.get_riemann_rectangles(graph, x_range=[0,np.pi+2], dx=0.2)
  

        self.add(intro_text_top,intro_text_bottom)
        self.add(intro_text_bottom_end)
        self.wait(2)
        self.play(ReplacementTransform(intro_text_bottom,limit),run_time = 3)
        self.wait(1)
        self.play(ReplacementTransform(limit,derivative),run_time = 3)
        self.wait(1)
        self.play(ReplacementTransform(derivative,integral),run_time = 3)
        self.wait(1)
        self.play(Create(vg),run_time=2)
        self.play(Create(riemann_rectangles))
        self.wait(2)
        self.play(ReplacementTransform(integral,intro_text_bottom_end),run_time = 3)
        
        '''vg = VGroup(intro_text_top,intro_text_bottom)
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
        self.wait(1)'''
        #plot = VGroup(axes, sin_graph, cos_graph, vert_line)
        #labels = VGroup(axes_labels, sin_label, cos_label, line_label)
        #self.add(plot, labels)


        





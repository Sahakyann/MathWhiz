from manim import *

class LimitThumbnail(Scene):
    def construct(self):
   
        axes = Axes(
            x_range=[0, 4, 1],
            y_range=[0, 2, 0.5],
            x_length=8,
            y_length=4,
            axis_config={"include_tip": False},
        )
        labels = axes.get_axis_labels(x_label="x", y_label="f(x)")
        graph = axes.plot(lambda x: 1 / x, color=BLUE, x_range=[0.5, 4])

        x_val = 2
        dashed_line = DashedLine(
            start=axes.c2p(x_val, 0),
            end=axes.c2p(x_val, 1),
            color=YELLOW
        )

        left_dot = Dot(axes.c2p(1.5, 1 / 1.5), color=YELLOW)
        right_dot = Dot(axes.c2p(2.5, 1 / 2.5), color=GREEN)

        left_arrow = Arrow(
            start=axes.c2p(1.5, 1 / 1.5),
            end=axes.c2p(2, 1 / 2),
            color=YELLOW,
            buff=0.1
        )
        right_arrow = Arrow(
            start=axes.c2p(2.5, 1 / 2.5),
            end=axes.c2p(2, 1 / 2),
            color=GREEN,
            buff=0.1
        )

        limit_dot = Dot(axes.c2p(2, 1 / 2), color=WHITE)
       
        title = Text("LIMIT OF A FUNCTION", font_size=70,weight=BOLD, color=WHITE).set_color(WHITE)
        title.to_edge(UP)
        vg = VGroup(axes,labels,dashed_line,limit_dot,graph,left_dot,right_dot,left_arrow,right_arrow).scale(1.4).next_to(title,DOWN)
        self.add(title)
        self.add(vg)
        #self.add(axes, labels, graph, dashed_line)
        #self.add( left_dot, right_dot, left_arrow, right_arrow, limit_dot)
        #self.add(title)



class SqueezingTheorem(Scene):
    def construct(self):
   
        axes = Axes(
            x_range=[-1.5, 1.5],
            y_range=[-0.5, 1.5],
            x_length=10,
            y_length=5,
            axis_config={"color": GREY},
        )
        axes.add_coordinates()

        g = lambda x: -x**2
        f = lambda x: x**2 * np.sin(1/x) if x != 0 else 0
        h = lambda x: x**2

        g_graph = axes.plot(g, x_range=[-1.5, 1.5], color=BLUE)
        f_graph = axes.plot(f, x_range=[-1.5, 1.5], color=YELLOW)
        h_graph = axes.plot(h, x_range=[-1.5, 1.5], color=GREEN)

        dot = Dot(axes.c2p(0, 0), color=WHITE)
        dashed_x = DashedLine(axes.c2p(0, -0.5), axes.c2p(0, 1.5), color=WHITE)
        dashed_y = DashedLine(axes.c2p(-1.5, 0), axes.c2p(1.5, 0), color=WHITE)
 
        f_label = MathTex("f(x) = x^2 \\sin\\left(\\frac{1}{x}\\right)", color=YELLOW).scale(0.7).next_to(axes.input_to_graph_point(1.3, f_graph), UP)
        g_label = MathTex("g(x) = -x^2", color=BLUE).scale(0.7).next_to(axes.input_to_graph_point(0.9, g_graph), RIGHT)
        h_label = MathTex("h(x) = x^2", color=GREEN).scale(0.7).next_to(axes.input_to_graph_point(-1, h_graph), RIGHT)
        x_label = MathTex("x = a", color=WHITE).scale(0.7).next_to(dashed_x, DOWN)
        L_label = MathTex("L = 0", color=WHITE).scale(0.7).next_to(dot, DOWN, buff=0.2)
        title = Text("THE SQUEEZING THEOREM", weight=BOLD, color=WHITE).scale(0.8)
        title.to_edge(UP)

      
        self.add(g_graph, f_graph, h_graph)
        self.add(dashed_x, dashed_y, dot)
        self.add(f_label, g_label, h_label, x_label, L_label, title)

class LHopitalsRuleThumbnail(Scene):
    def construct(self):
        axes = Axes(
            x_range=[-3, 3],
            y_range=[-1, 1.5],
            x_length=10,
            y_length=4,
            axis_config={"include_tip": False}
        )
        
        
        orig_func = lambda x: np.sin(x) / x if x != 0 else 1
        original_graph = axes.plot(orig_func, color=BLUE, x_range=[-2.9, 2.9])        
        derivative_graph = axes.plot(lambda x: np.cos(x), color=YELLOW, x_range=[-2.9, 2.9], stroke_opacity=0.6)

        limit_line = DashedLine(axes.c2p(-3, 1), axes.c2p(3, 1), color=WHITE)
        x_line = DashedLine(axes.c2p(0, -1), axes.c2p(0, 1.5), color=WHITE)
        limit_dot = Dot(axes.c2p(0, 1), color=WHITE)

        orig_label = MathTex(r"\frac{\sin x}{x}", color=BLUE).scale(0.7).next_to(axes.input_to_graph_point(3, original_graph), UP)
        deriv_label = MathTex(r"\frac{\cos x}{1}", color=YELLOW).scale(0.7).next_to(axes.input_to_graph_point(-2.5, derivative_graph), UP)
        limit_expr = MathTex(
            r"\lim_{x \to 0} \frac{\sin x}{x} \overset{\text{L'Hôpital}}{=} \lim_{x \to 0} \frac{\cos x}{1} = 1",
            color=WHITE
        ).scale(0.75).next_to(limit_dot, DOWN, buff=3.5)

      
        title = Text("L'HÔPITAL'S RULE", weight=BOLD, color=WHITE).scale(0.9)
        title.to_edge(UP)

        
        graph_group = VGroup(
            axes,
            original_graph, derivative_graph,
            x_line, limit_line, limit_dot,
            orig_label, deriv_label, limit_expr
        ).scale(1.1).next_to(title, DOWN)

        self.add(title, graph_group)


class DerivativeOfFunctionThumbnail(Scene):
    def construct(self):
        axes = Axes(
            x_range=[-3, 3],
            y_range=[-2, 4],
            x_length=10,
            y_length=5,
            axis_config={"include_tip": False},
        )
       


        func = lambda x: x**2 - x + 1
        graph = axes.plot(func, color=BLUE, x_range=[-2, 3])
  
        a = 1
        f_a = func(a)
     
        derivative = lambda x: 2*x - 1
        slope = derivative(a)

        tangent_line = axes.plot(lambda x: f_a + slope*(x - a), color=YELLOW, x_range=[-2.5, 2.5])

        dot = Dot(axes.c2p(a, f_a), color=WHITE)

        function_label = MathTex("f(x) = x^2 - x + 1", color=BLUE).scale(0.7).next_to(axes.input_to_graph_point(-2.5, graph), UP)
        tangent_label = MathTex("f'(x)", color=YELLOW).scale(0.7).next_to(axes.input_to_graph_point(2.3, tangent_line), RIGHT)
      

        title = Text("DERIVATIVE OF A FUNCTION", weight=BOLD, color=WHITE).scale(0.9)
        title.to_edge(UP)

        derivative_formula = MathTex(
            r"f'(a) = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}", color=WHITE
        ).scale(0.7).next_to(title, DOWN, buff=-2)

        graph_group = VGroup(
            axes,
            graph, tangent_line, dot,
            function_label, tangent_label,
            derivative_formula
        ).scale(0.8).next_to(title, DOWN,buff=-2)

        self.add(title, graph_group)






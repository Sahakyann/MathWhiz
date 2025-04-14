from manim import *


class Intro_text_transform(Scene):
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

        intro_text_top = Text('Welcome to').center()
        intro_text_bottom = Text('MathWhiz').next_to(intro_text_top,DOWN).set_color(color_gradient([BLUE,YELLOW],2))
        vg = VGroup(intro_text_top,intro_text_bottom)

        calc_text = Text("Calculus").to_edge(UP).scale(1.1).set_color(color_gradient([BLUE,LOGO_BLUE],2))
        lin_text = Text("Linear Algebra").next_to(calc_text,DOWN,buff = 1).scale(1.1).set_color(color_gradient([LOGO_BLUE, TEAL], 2))
        vis_calc_text =  Text("Visual Calculators").next_to(lin_text,DOWN,buff = 1).scale(1.1).set_color(color_gradient([TEAL, PURPLE], 2))
        stat_text = Text("Statistics").next_to(vis_calc_text,DOWN,buff = 1).scale(1.1).set_color(color_gradient([PURPLE, TEAL_D], 2))
        prob_text =  Text("Probability").next_to(stat_text,DOWN,buff = 1).scale(1.1).set_color(color_gradient([TEAL_D, LOGO_BLUE], 2))
        target_texts = VGroup(
            calc_text,
            lin_text,
            vis_calc_text,
            stat_text,
            prob_text
        )
        intro_copies = VGroup(*[vg.copy() for _ in range(5)])
        self.play(Write(vg))
        self.wait(1)
        self.remove(vg)
        self.play(*[
            ReplacementTransform(intro_copies[i], target_texts[i])
            for i in range(5)
        ],run_time = 3)
        self.wait(2)
        #axes_labels = axes.get_axis_labels()
        '''intro_text_top = Text('Welcome to').center()
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
        #self.add(plot, labels)'''


class Section_Transform(ThreeDScene):
    def construct(self):

        intro_text_top = Text('Welcome to').center()
        intro_text_bottom = Text('MathWhiz').next_to(intro_text_top,DOWN).set_color(color_gradient([BLUE,YELLOW],2))
        vg = VGroup(intro_text_top,intro_text_bottom)

        calc_text = Text("Calculus").to_edge(UP).scale(0.9)
        lin_text = Text("Linear Algebra").next_to(calc_text, DOWN, buff=1).scale(0.9)
        prob_text = Text("Probability").next_to(lin_text, DOWN, buff=1).scale(0.9)
        stat_text = Text("Statistics").next_to(prob_text, DOWN, buff=1).scale(0.9)
        vis_calc_text = Text("Visual Calculators").next_to(stat_text, DOWN, buff=1).scale(0.9)
        target_texts = VGroup(
            calc_text,
            lin_text,
            vis_calc_text,
            stat_text,
            prob_text
        )
        intro_copies = VGroup(*[vg.copy() for _ in range(5)])
        self.play(Write(vg))
        self.wait(1)
        self.remove(vg)
        self.play(*[
            ReplacementTransform(intro_copies[i], target_texts[i])
            for i in range(5)
        ],run_time = 3)
        
        
        # Calculus Section
        limit = MathTex(r"\lim_{x \to a} f(x) = L").scale(0.8)
        derivative = MathTex(r"f'(x) = \lim_{\Delta x \to 0} \frac{f(x+\Delta x) - f(x)}{\Delta x}").scale(0.7)
        integral = MathTex(r"\int_a^b f'(x) dx = f(b)- f(a)").scale(0.75)

        limit.to_edge(UL)
        derivative.next_to(limit, DOWN, buff=0.7)
        integral.next_to(derivative, DOWN, buff=0.7)

        func = lambda x: np.sin(x) + 2
        axes = Axes(
            x_range=[0, 10, 1], 
            y_range=[0, 6, 1],
            x_length=8,
            y_length=5,
            axis_config={"include_tip": True, "include_ticks": False}
        )
        graph = axes.plot(func, x_range=(0, 10), color=YELLOW)
        riemann_rectangles = axes.get_riemann_rectangles(graph, x_range=[0, np.pi+2], dx=0.2)
        vg_graph = VGroup(axes, graph, riemann_rectangles).scale(0.6).next_to(integral, DOWN, buff=0.5)
        
        calc_group = VGroup(limit,derivative,integral,vg_graph).scale(0.5)
        calc_group.to_edge(UL).shift(RIGHT * 1.5)
        self.play(ReplacementTransform(calc_text,calc_group))

        # Linear Section
        vector_def = MathTex(r"\vec{v} = \begin{bmatrix} x \\ y \end{bmatrix}").to_edge(UP).scale(0.8)
        matrix_eq = MathTex(r"A\vec{x} = \vec{b}").next_to(vector_def, DOWN, buff=0.5).scale(0.8)
        dot_product = MathTex(r"\vec{a} \cdot \vec{b} = \|\vec{a}\|\|\vec{b}\|\cos(\theta)").next_to(matrix_eq, DOWN, buff=0.5).scale(0.8)

     
        plane = NumberPlane(
            x_range=[-6, 6, 1],
            y_range=[-6, 6, 1],
            x_length=6,
            y_length=6,
            background_line_style={
                "stroke_color": GREY,
                "stroke_width": 1,
                "stroke_opacity": 0.4
            }
        ).set_opacity(0.8)

      
        vec1 = Arrow(start=plane.c2p(0, 0), end=plane.c2p(3, 2), buff=0, color=YELLOW)
        vec2 = Arrow(start=plane.c2p(0, 0), end=plane.c2p(-2, 3), buff=0, color=GREEN)

        vg_graph_lin = VGroup(plane, vec1, vec2).next_to(dot_product,DOWN).scale(0.53).shift(UP)
        lin_group = VGroup(vector_def,dot_product,matrix_eq,vg_graph_lin).scale(0.55)
        lin_group.to_edge(UP)
        self.play(ReplacementTransform(lin_text,lin_group))

        # Probability Section
        bayes = MathTex(r"P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}").to_edge(UR).scale(0.8)
        expected = MathTex(r"\mathbb{E}[X] = \sum x_i \cdot P(x_i)").next_to(bayes, DOWN, buff=0.5).scale(0.8)
        variance = MathTex(r"\text{Var}(X) = \mathbb{E}[X^2] - (\mathbb{E}[X])^2").next_to(expected, DOWN, buff=0.5).scale(0.8)


        axes = Axes(
            x_range=[-4, 4, 1],
            y_range=[0, 0.5, 0.1],
            x_length=8,
            y_length=4,
            axis_config={"include_tip": True},
            tips=True
        )

 
        def normal_dist(x):
            return (1 / np.sqrt(2 * np.pi)) * np.exp(-0.5 * x**2)

        graph = axes.plot(normal_dist, x_range=[-4, 4])

        vg_graph_prob = VGroup(axes, graph).scale(0.9).next_to(variance, DOWN, buff=1)
        prob_group = VGroup(bayes,expected,variance,vg_graph_prob).scale(0.45)
        prob_group.to_edge(UR).shift(LEFT * 1.5)
        self.play(ReplacementTransform(prob_text,prob_group))

        # Statistics Section
        mean_eq = MathTex(r"\bar{x} = \frac{1}{n} \sum_{i=1}^n x_i").to_edge(DL).scale(0.8)
        mean_eq.shift(RIGHT * 2)
        std_dev = MathTex(r"\sigma = \sqrt{ \frac{1}{n} \sum_{i=1}^n (x_i - \bar{x})^2 }").next_to(mean_eq, DOWN, buff=0.5).scale(0.8)
        mle = MathTex(r"\hat{\theta}_{\text{MLE}} = \arg\max_\theta \prod_{i=1}^n f(x_i \mid \theta)").next_to(std_dev, DOWN, buff=0.5).scale(0.6)

        axes = Axes(
            x_range=[-3, 3, 1],
            y_range=[0, 1, 0.2],
            x_length=8,
            y_length=4,
            axis_config={"include_tip": True}
        )

  
        def likelihood(theta):
            return np.exp(-((theta - 1.0) ** 2))

        likelihood_curve = axes.plot(likelihood, x_range=[-3, 3], color=GREEN_D)

        peak_dot = Dot(axes.c2p(1.0, likelihood(1.0)), color=WHITE)
        mle_label = MathTex(r"\hat{\theta}_{\text{MLE}}").next_to(peak_dot, UP).scale(1.2).set_color(GREEN)

        vg_graph_stat = VGroup(axes, likelihood_curve, peak_dot, mle_label).next_to(mle, DOWN).scale(0.6)
        stat_group = VGroup(mean_eq,std_dev,mle).scale(0.6)
        stat_group.to_edge(DL)
        stat_group.shift(RIGHT*3.5)
        self.play(ReplacementTransform(stat_text,stat_group))

        # Visual Calculators and Tools Section

        axes_taylor = Axes(
            x_range=[-4, 4],
            y_range=[-1.5, 1.5],
            x_length=7,
            y_length=3,
            tips=False,
        )

        original = axes_taylor.plot(lambda x: np.sin(x), color=WHITE)
        approx1 = axes_taylor.plot(lambda x: x, x_range=[-3, 3], color=TEAL)
        approx3 = axes_taylor.plot(lambda x: x - (x**3) / 6, x_range=[-3, 3],color=BLUE)
        approx5 = axes_taylor.plot(lambda x: x - (x**3) / 6 + (x**5) / 120, color=DARK_BLUE)

        legend = VGroup(
            Text("n=1", color=TEAL).scale(0.4),
            Text("n=3", color=BLUE).scale(0.4),
            Text("n=5", color=DARK_BLUE).scale(0.4),
        ).arrange(RIGHT, buff=0.2).next_to(axes_taylor, DOWN)

       

        vis_calc_group = VGroup(
            axes_taylor, original, approx1, approx3, approx5, legend
        ).to_edge(DR).shift(DOWN * 2,LEFT).scale(0.5)

        self.play(ReplacementTransform(vis_calc_text,vis_calc_group))

        intro_text_top_end = Text('Welcome to').center()
        intro_text_bottom_end = Text('MathWhiz').next_to(intro_text_top,DOWN).set_color(color_gradient([BLUE,YELLOW],2))
        final_group = VGroup(calc_group,lin_group,prob_group,stat_group,vis_calc_group)
        final_intro_text = VGroup(intro_text_top_end,intro_text_bottom_end)
        self.wait(2)
        self.play(ReplacementTransform(final_group,final_intro_text),run_time=2.5)
        self.wait(2)

       





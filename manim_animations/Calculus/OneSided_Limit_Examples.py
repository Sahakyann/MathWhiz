from manim import *

class OneSidedLimitJump(MovingCameraScene):
    def construct(self):
        axes = Axes(
            x_range=[-2, 2, 1],
            y_range=[-1, 2, 1],
            x_length=6,
            y_length=4,
            axis_config={"color": WHITE},
            tips=False,
        ).scale(2)

        self.play(Create(axes))

        left_part = axes.plot(lambda t: 0, x_range=[-2, 0], color=YELLOW)
        right_part = axes.plot(lambda t: 1, x_range=[0, 2], color=YELLOW)

        self.play(Create(left_part), Create(right_part))

        left_dot = Dot(axes.c2p(0, 0), color=YELLOW).scale(0.7)
        right_dot = Dot(axes.c2p(0, 1), color=YELLOW).scale(0.7)
        hollow_dot = Dot(axes.c2p(0, 0), color=BLACK).scale(0.5)

        self.play(FadeIn(left_dot), FadeIn(right_dot), FadeIn(hollow_dot))

        function_label = MathTex(
            r"H(t) = \begin{cases} 0, & t < 0 \\ 1, & t \geq 0 \end{cases}"
        ).scale(0.8).to_corner(UL)
        self.play(FadeIn(function_label))

        left_arrow = Arrow(
            start=axes.c2p(-1.5, 0),
            end=axes.c2p(0, 0),
            color=RED,
            buff=0.05,
            stroke_width=4
        )
        right_arrow = Arrow(
            start=axes.c2p(1.5, 1),
            end=axes.c2p(0, 1),
            color=GREEN,
            buff=0.05,
            stroke_width=4
        )

        left_limit_label = MathTex("\\lim_{t \\to 0^-} H(t) = 0", color=RED).scale(0.8)
        right_limit_label = MathTex("\\lim_{t \\to 0^+} H(t) = 1", color=GREEN).scale(0.8)

        left_limit_label.next_to(left_arrow, LEFT, buff=0.2).shift(UP + RIGHT*3)
        right_limit_label.next_to(right_arrow, RIGHT, buff=0.2).shift(UP + LEFT *3)

        self.play(Create(left_arrow), Create(right_arrow))
        self.play(FadeIn(left_limit_label), FadeIn(right_limit_label))

        self.wait(3)




class OneOverXBehavior(MovingCameraScene):
    def construct(self):
        axes = Axes(
            x_range=[-4, 4, 1],
            y_range=[-10, 10, 2],
            x_length=8,
            y_length=6,
            axis_config={"color": WHITE},
            tips=False,
        )

        self.play(Create(axes))

        graph_left = axes.plot(
            lambda x: 1/x,
            x_range=[-4, -0.1],
            color=BLUE
        )
        graph_right = axes.plot(
            lambda x: 1/x,
            x_range=[0.1, 4],
            color=BLUE
        )

        dashed_line = DashedLine(
            start=axes.c2p(0, -10),
            end=axes.c2p(0, 10),
            color=GRAY
        )

        self.play(Create(graph_left), Create(graph_right), FadeIn(dashed_line))

        tracker_right = ValueTracker(2)
        tracker_left = ValueTracker(-2)

        moving_dot_right = always_redraw(
            lambda: Dot(color=GREEN).move_to(axes.c2p(tracker_right.get_value(), 1 / tracker_right.get_value()))
        )
        moving_dot_left = always_redraw(
            lambda: Dot(color=RED).move_to(axes.c2p(tracker_left.get_value(), 1 / tracker_left.get_value()))
        )

  
        function_label = always_redraw(
            lambda: MathTex("f(x) = \\frac{1}{x}").scale(0.7).next_to(moving_dot_right, UR)
        )

        function_label1 = always_redraw(
            lambda: MathTex("f(x) = \\frac{1}{x}").scale(0.7).next_to(moving_dot_left, UR)
        )

        self.add(moving_dot_right, moving_dot_left, function_label,function_label1)


        right_limit_label = MathTex("\\lim_{x \\to 0^+} \\frac{1}{x} = +\\infty", color=GREEN).scale(0.8)
        left_limit_label = MathTex("\\lim_{x \\to 0^-} \\frac{1}{x} = -\\infty", color=RED).scale(0.8)

  
        right_limit_label.to_edge(DOWN).shift(RIGHT * 2)
        left_limit_label.to_edge(DOWN).shift(LEFT * 2)

        self.play(FadeIn(right_limit_label), FadeIn(left_limit_label))

        self.wait(0.5)

        self.play(tracker_right.animate.set_value(0.1), run_time=4)

        self.play(tracker_left.animate.set_value(-0.1), run_time=4)

        self.wait(2)



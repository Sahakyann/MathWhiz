from manim import *

class LimitAtInfinity(MovingCameraScene):
    def construct(self):

        axes = Axes(
            x_range=[0, 20, 2],
            y_range=[0, 400, 50],
            x_length=8,
            y_length=5,
            axis_config={"color": WHITE},
            tips=False
        )

        self.play(Create(axes))

        caption = Text("As x → ∞, f(x) → ∞", font_size=28, color=YELLOW)
        caption.to_edge(DOWN)
        self.play(FadeIn(caption))

        def func(x):
            return x**2

        graph = axes.plot(func, x_range=[0, 2], color=BLUE)
        graph_obj = graph
        self.play(FadeIn(graph_obj))

        moving_dot = Dot(color=RED).move_to(axes.c2p(2, func(2)))
        self.play(FadeIn(moving_dot))

        label = MathTex("f(x) = x^2").scale(0.7).next_to(moving_dot, UR)
        self.play(FadeIn(label))

        self.wait(0.5)

        for end_x in [4, 8, 12, 16, 20]:
            new_graph = axes.plot(func, x_range=[0, end_x], color=BLUE)

            new_dot_target = axes.c2p(end_x, func(end_x))

            self.play(
                Transform(graph_obj, new_graph),
                moving_dot.animate.move_to(new_dot_target),
                label.animate.next_to(moving_dot, UR),
                self.camera.frame.animate.move_to(axes.c2p(end_x, func(end_x)/2)),
                run_time=2
            )

            self.wait(0.5)

        self.wait(2)

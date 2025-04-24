from manim import *

class EpsilonDeltaShrinking(Scene):
    def construct(self):
        axes = Axes(
            x_range=[0, 6, 1],
            y_range=[0, 12, 2],
            x_length=7,
            y_length=5,
            axis_config={"color": WHITE},
            tips=False
        )

        graph = axes.plot(lambda x: 2*x, color=YELLOW)
        graph_label = axes.get_graph_label(graph, label='f(x) = 2x', x_val=5)

        center_dot = Dot(axes.coords_to_point(3, 6), color=WHITE)
        center_label = MathTex("(3,6)").next_to(center_dot, UR, buff=0.2)

        self.play(Create(axes), Create(graph), FadeIn(graph_label))
        self.play(FadeIn(center_dot), Write(center_label))

    
        epsilon_value = 1
        delta_value = epsilon_value / 2

        epsilon_band = Rectangle(
            width=7,
            height=2*epsilon_value,
            color=GREEN,
            fill_color=GREEN,
            fill_opacity=0.2
        ).move_to(axes.coords_to_point(3, 6))

        delta_band = Rectangle(
            width=2*delta_value,
            height=5,
            color=RED,
            fill_color=RED,
            fill_opacity=0.2
        ).move_to(axes.coords_to_point(3, 6))

        epsilon_label = MathTex("\\varepsilon").next_to(epsilon_band, UP)
        delta_label = MathTex("\\delta").next_to(delta_band, DOWN)

        self.play(FadeIn(epsilon_band), FadeIn(delta_band))

        epsilon_text = MathTex("\\varepsilon = 1", color=GREEN).scale(0.8).to_corner(UL).shift(DOWN * 0.5)
        delta_text = MathTex("\\delta = 0.5", color=RED).scale(0.8).next_to(epsilon_text, DOWN, aligned_edge=LEFT)


        self.play(Write(epsilon_text), Write(delta_text))

        for eps in [0.5, 0.2, 0.1, 0.05]:
            new_delta = eps / 2

            new_epsilon_band = Rectangle(
                width=7,
                height=2*eps,
                color=GREEN,
                fill_color=GREEN,
                fill_opacity=0.2
            ).move_to(axes.coords_to_point(3, 6))

            new_delta_band = Rectangle(
                width=2*new_delta,
                height=5,
                color=RED,
                fill_color=RED,
                fill_opacity=0.2
            ).move_to(axes.coords_to_point(3, 6))

            new_epsilon_text = MathTex(f"\\varepsilon = {eps}", color=GREEN).scale(0.8).to_corner(UL).shift(DOWN * 0.5)
            new_delta_text = MathTex(f"\\delta = {new_delta}", color=RED).scale(0.8).next_to(new_epsilon_text, DOWN, aligned_edge=LEFT)

            self.play(
                Transform(epsilon_band, new_epsilon_band),
                Transform(delta_band, new_delta_band),
                Transform(epsilon_text, new_epsilon_text),
                Transform(delta_text, new_delta_text),
                run_time=1.5
            )

        self.wait(2)

from manim import *
import numpy as np

config.frame_size = (1080, 1920)

class ProbabilityBackground(Scene):
    def construct(self):
        title = Text("Probability").next_to([-1.8, 9, 0]).set_color(color_gradient([ORANGE, PURPLE], 2)).scale(2.9)

        bayes = MathTex(r"P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}").next_to(title, DOWN, buff=2).scale(1.6).set_color(color_gradient([ORANGE, MAROON], 2))
        expected = MathTex(r"\mathbb{E}[X] = \sum x_i \cdot P(x_i)").next_to(bayes, DOWN, buff=2).scale(1.8).set_color(color_gradient([PURPLE_C, ORANGE], 2))
        variance = MathTex(r"\text{Var}(X) = \mathbb{E}[X^2] - (\mathbb{E}[X])^2").next_to(expected, DOWN, buff=2).scale(1.4).set_color(color_gradient([PURPLE_D, ORANGE], 2))


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

        graph = axes.plot(normal_dist, x_range=[-4, 4], color=ORANGE)

        plot = VGroup(axes, graph).next_to(variance, DOWN, buff=2)

        self.add(title, bayes, expected, variance, plot)

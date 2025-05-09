from manim import *
import numpy as np

config.frame_size = (1080, 1920)

class StatisticsBackground(Scene):
    def construct(self):
        #self.camera.background_color = WHITE
        title = Text("Statistics").next_to([-1.5, 9, 0]).set_color(color_gradient([GREEN, GREEN_B], 2)).scale(3.4)

        mean_eq = MathTex(r"\bar{x} = \frac{1}{n} \sum_{i=1}^n x_i").next_to(title, DOWN, buff=2).scale(2).set_color(color_gradient([GREEN_D, GREEN_E], 2))
        std_dev = MathTex(r"\sigma = \sqrt{ \frac{1}{n} \sum_{i=1}^n (x_i - \bar{x})^2 }").next_to(mean_eq, DOWN, buff=2).scale(1.6).set_color(color_gradient([GREEN, GREEN_B], 2))
        mle = MathTex(r"\hat{\theta}_{\text{MLE}} = \arg\max_\theta \prod_{i=1}^n f(x_i \mid \theta)").next_to(std_dev, DOWN, buff=2).scale(1.4).set_color(color_gradient([GREEN_B, GREEN_C], 2))

        axes = Axes(
            x_range=[-3, 3, 1],
            y_range=[0, 1, 0.2],
            x_length=8,
            y_length=4,
            axis_config={"include_tip": True}
        )#.set_color(GREEN_A)

  
        def likelihood(theta):
            return np.exp(-((theta - 1.0) ** 2))

        likelihood_curve = axes.plot(likelihood, x_range=[-3, 3], color=GREEN_D)

        peak_dot = Dot(axes.c2p(1.0, likelihood(1.0)), color=GREEN)
        mle_label = MathTex(r"\hat{\theta}_{\text{MLE}}").next_to(peak_dot, UP).scale(1.2).set_color(GREEN)

        visual = VGroup(axes, likelihood_curve, peak_dot, mle_label).next_to(mle, DOWN, buff=2)

        self.add(title, mean_eq, std_dev, mle, visual)

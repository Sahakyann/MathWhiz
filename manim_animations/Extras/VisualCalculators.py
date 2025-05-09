from manim import *
import numpy as np

config.frame_size = (1080, 1920)

class VisualCalculatorsBackground(Scene):
    def construct(self):
        self.camera.background_color = BLACK

  
        grid = NumberPlane(
            x_range=[-12, 12, 1],
            y_range=[-20, 20, 1],
            x_length=18,
            y_length=30,
            axis_config={"color": GREY_B, "stroke_width": 1}
        )
        grid.set_opacity(0.25)


       
        title = Tex("Visual Calculators", font_size=130, color=WHITE)
        title.center()

        equations = VGroup(
            Tex(r"$\int_{-1}^{1} x^2 \, dx = \frac{2}{3}$", font_size=70, color=BLUE_E).shift(LEFT * 3.2 + UP * 7),
            Tex(r"$\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}$", font_size=70, color=GREEN_D).shift(RIGHT * 4 + UP * 7),
            Tex(r"$\frac{d}{dx}(x^3) = 3x^2$", font_size=65, color=RED_C).shift(LEFT * 3 + UP * 4),
            Tex(r"$\mathbf{A} = \begin{bmatrix} 2 & -1 \\ 1 & 3 \end{bmatrix}$", font_size=60, color=PURPLE_D).shift(RIGHT * 3 + UP * 4),
            Tex(r"$\lim_{x \to 0} \frac{\sin x}{x} = 1$", font_size=70, color=WHITE).shift(LEFT * 3.3 + UP * 9),
            Tex(r"$\sqrt{x^2 + y^2} = r$", font_size=70, color=TEAL_C).shift(RIGHT * 4.2 + UP * 2),
            Tex(r"$f(x) = x^3 - 3x + 2$", font_size=70, color=ORANGE).shift(LEFT * 2 + UP * 2),
            Tex(r"$\nabla f(x, y) = \left( \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y} \right)$", font_size=55, color=MAROON_C).shift(RIGHT * 2 + UP * 9),

            Tex(r"$\sigma^2 = \frac{1}{n} \sum (x_i - \mu)^2$", font_size=60, color=YELLOW_D).shift(LEFT * 3.5 + DOWN * 3.5),
            Tex(r"$\mu = \frac{1}{n} \sum x_i$", font_size=65, color=BLUE_C).shift(RIGHT * 3.1 + DOWN * 2.5),
            Tex(r"$P(A|B) = \frac{P(A \cap B)}{P(B)}$", font_size=65, color=TEAL_D).shift(LEFT * 1.5 + DOWN * 5.5),
            Tex(r"$\arg\min_x f(x)$", font_size=70, color=GREEN_B).shift(RIGHT * 3 + DOWN * 6.5),
            Tex(r"$\det(\mathbf{A}) = ad - bc$", font_size=65, color=PURPLE_B).shift(DOWN * 8.2),
            Tex(r"$\sum_{i=1}^n x_i = x_1 + x_2 + \dots + x_n$", font_size=55, color=RED_E).shift(DOWN * 10)
        )

        self.add(grid, title, equations)

        self.play(
            *[eq.animate.shift(UP * 0.2).shift(DOWN * 0.2) for eq in equations],
            run_time=3
        )
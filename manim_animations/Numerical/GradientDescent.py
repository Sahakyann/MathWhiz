from manim import *
import numpy as np

class GradientDescent3D(ThreeDScene):
    def construct(self):
        axes = ThreeDAxes(
            x_range=[-3, 3, 1],
            y_range=[-3, 3, 1],
            z_range=[0, 18, 2],
            x_length=6,
            y_length=6,
            z_length=4
        )

        self.set_camera_orientation(phi=60 * DEGREES, theta=-45 * DEGREES)
        self.add(axes)

        def f(x, y):
            return x**2 + y**2

        surface = Surface(
            lambda u, v: axes.c2p(u, v, f(u, v)),
            u_range=[-3, 3],
            v_range=[-3, 3],
            resolution=(30, 30),
            checkerboard_colors=[BLUE_D, BLUE_E],
            fill_opacity=0.6
        )

        self.play(Create(surface))

        point = np.array([2.5, 2.5])
        dot = Dot3D(axes.c2p(point[0], point[1], f(point[0], point[1])), color=RED)
        self.add(dot)

        learning_rate = 0.2
        steps = 20

        for _ in range(steps):
            grad = np.array([2 * point[0], 2 * point[1]])
            next_point = point - learning_rate * grad

            start = axes.c2p(point[0], point[1], f(point[0], point[1]))
            end = axes.c2p(next_point[0], next_point[1], f(next_point[0], next_point[1]))

            arrow = Arrow3D(start, end, color=YELLOW)
            self.add(arrow)

            for i in range(30):
                alpha = i / 30
                dot.move_to(interpolate(start, end, alpha))
                self.wait(0.01)

            point = next_point

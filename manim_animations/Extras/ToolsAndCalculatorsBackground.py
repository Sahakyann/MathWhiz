from manim import *
import numpy as np

config.frame_size = (1080, 1920)

class ToolsAndVisualCalculators(ThreeDScene):
    def construct(self):
        #self.camera.background_color = WHITE
        title = Text("Visual Calculators").scale(1.7).move_to([0, 10, 0])
        title2 = Text("And Tools").scale(1.7).next_to(title,DOWN)
        title.set_color(color_gradient([TEAL, TEAL_D], 2))
        title2.set_color(color_gradient([TEAL_D, BLUE_E], 2))

      
        axes_2d = Axes(
            x_range=[-4, 4],
            y_range=[-4, 4],
            x_length=6,
            y_length=4,
            tips=False,
        ).set_color(BLUE)
        graph_2d = axes_2d.plot(lambda x: 1 / x, x_range=[-4, -0.2], color= TEAL_D)
        graph_2d_right = axes_2d.plot(lambda x: 1 / x, x_range=[0.2, 4], color=TEAL_E)

        
        graph2d_group = VGroup(axes_2d, graph_2d, graph_2d_right).next_to(title2,DOWN,buff=1).scale(1.2)

       
        axes_3d = ThreeDAxes(
            x_range=[-2, 2],
            y_range=[-2, 2],
            z_range=[-1, 1],
            x_length=5,
            y_length=5,
            z_length=3,
        ).set_color(BLUE)

        def surface_func(u, v):
            return np.array([u, v, np.sin(u**2 + v**2)])

        surface = Surface(
            lambda u, v: surface_func(u, v),
            u_range=[-2, 2],
            v_range=[-2, 2],
            resolution=(24, 24),
            fill_opacity=0.7,
            checkerboard_colors=[BLUE_D, DARK_BLUE]
        )

       
        three_d_group = VGroup(axes_3d, surface).next_to(graph2d_group,DOWN,buff=1.5).shift(RIGHT*2).scale(1.2)

       
        self.set_camera_orientation(phi=65 * DEGREES, theta=-45 * DEGREES)
        self.add_fixed_in_frame_mobjects(title, title2, graph2d_group)

      
        axes_taylor = Axes(
            x_range=[-4, 4],
            y_range=[-1.5, 1.5],
            x_length=7,
            y_length=3,
            tips=False,
        ).set_color(BLUE)

        original = axes_taylor.plot(lambda x: np.sin(x), color=WHITE)
        approx1 = axes_taylor.plot(lambda x: x, x_range=[-3, 3], color=TEAL)
        approx3 = axes_taylor.plot(lambda x: x - (x**3) / 6, x_range=[-3, 3],color=BLUE)
        approx5 = axes_taylor.plot(lambda x: x - (x**3) / 6 + (x**5) / 120, color=DARK_BLUE)

        legend = VGroup(
            Text("n=1", color=TEAL).scale(0.4),
            Text("n=3", color=BLUE).scale(0.4),
            Text("n=5", color=DARK_BLUE).scale(0.4),
        ).arrange(RIGHT, buff=0.2).next_to(axes_taylor, DOWN)

       

        taylor_group = VGroup(
            axes_taylor, original, approx1, approx3, approx5, legend
        ).next_to(three_d_group,DOWN,buff=0.3).shift(LEFT*2)

        self.add_fixed_in_frame_mobjects(taylor_group)
        self.add(three_d_group)

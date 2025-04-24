from manim import *
import numpy as np


class ProbabilityBackground(Scene):
    def construct(self):
        title = Text("Probability").center().shift(DOWN * 2.035).set_color(
            color_gradient([ORANGE, PURPLE], 2)
        ).scale(2.5)

        axes = Axes(
            x_range=[-4, 4, 1],
            y_range=[0, 0.5, 0.1],
            x_length=8,
            y_length=4,
            axis_config={"include_tip": True},
            tips=True,

        ).scale(1.5)

        def normal_dist(x):
            return (1 / np.sqrt(2 * np.pi)) * np.exp(-0.5 * x**2)

        graph = axes.plot(normal_dist, x_range=[-4, 4], color=ORANGE)


        riemann_rects = axes.get_riemann_rectangles(
            graph,
            x_range=[-4, 4],
            dx=0.2,
            color=PURPLE,
            stroke_width=0.1,
            fill_opacity=0.3 
        )

        vg = VGroup(axes, graph, riemann_rects).to_edge(UP)

        self.add(vg, title)
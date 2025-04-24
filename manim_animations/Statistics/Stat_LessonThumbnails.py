from manim import *
import numpy as np


class StatisticsThumbnail(Scene):
    def construct(self):
        title = Text("Statistics").center().shift(DOWN * 1.89).set_color(
            color_gradient([GREEN, GREEN_A], 2)
        ).scale(2.5)

        axes = Axes(
            x_range=[-3, 3, 1],
            y_range=[0, 1, 0.2],
            x_length=8,
            y_length=4,
            axis_config={"include_tip": True}
        ).scale(1.5)

        def likelihood(theta):
            return np.exp(-((theta - 1.0) ** 2))

        graph = axes.plot(likelihood, x_range=[-3, 3], color=GREEN_D,fill_opacity=0.2)


        vg = VGroup(axes, graph).to_edge(UP)

        self.add(vg, title)
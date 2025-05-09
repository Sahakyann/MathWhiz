from manim import *

class WhatIsProbability(Scene):
    def construct(self):
        title = Text("What is Probability?", font_size=48).to_edge(UP)
        self.play(Write(title))


        number_line = NumberLine(x_range=[1, 10, 1], length=8, include_tip=False)
        number_line.to_edge(DOWN, buff=1.5)
        self.play(Create(number_line))

        numbers = VGroup()
        for i in range(1, 11):
            num = Text(str(i), font_size=28).next_to(number_line.n2p(i), UP)
            numbers.add(num)
        self.play(Write(numbers))

        even_boxes = VGroup(*[
            SurroundingRectangle(numbers[i], color=BLUE)
            for i in range(len(numbers)) if (i+1) % 2 == 0
        ])
        self.play(Create(even_boxes))
        even_label = MathTex(r"P(\text{div by } 2) = \frac{5}{10}", font_size=36).next_to(number_line, UP, buff=1.5)
        self.play(Write(even_label))
        self.wait(1)

        self.play(FadeOut(even_boxes), FadeOut(even_label))
        div5_boxes = VGroup(*[
            SurroundingRectangle(numbers[i], color=ORANGE)
            for i in range(len(numbers)) if (i+1) % 5 == 0
        ])
        self.play(Create(div5_boxes))
        div5_label = MathTex(r"P(\text{div by } 5) = \frac{2}{10}", font_size=36).next_to(number_line, UP, buff=1.5)
        self.play(Write(div5_label))
        self.wait(2)

        self.play(FadeOut(VGroup(div5_boxes, div5_label, numbers, number_line, title)))

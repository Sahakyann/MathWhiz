from manim import *

class DependentVsIndependent(Scene):
    def construct(self):

        title = Text("Dependent vs Independent Events", font_size=42)
        self.play(Write(title))
        self.wait(1)
        self.play(title.animate.to_edge(UP))
        independent_box = Rectangle(width=5.5, height=2.5, color=GREEN).shift(LEFT * 3)
        indep_title = Text("Independent", font_size=28).next_to(independent_box, UP)
        indep_ex = Tex("Coin 1: H or T \\\\ Coin 2: H or T", font_size=28).move_to(independent_box.get_center())

        self.play(Create(independent_box), Write(indep_title), Write(indep_ex))
        self.wait(1)

        dependent_box = Rectangle(width=6, height=2.5, color=RED).shift(RIGHT * 3)
        dep_title = Text("Dependent", font_size=28).next_to(dependent_box, UP)
        dep_ex = Tex("Draw 1 card: King? \\\\ Draw 2nd card \\textit{without} replacing", font_size=28).move_to(dependent_box.get_center())

        self.play(Create(dependent_box), Write(dep_title), Write(dep_ex))
        self.wait(2)

        self.play(independent_box.animate.set_fill(GREEN, opacity=0.1), dependent_box.animate.set_fill(RED, opacity=0.1))

        ind_rule = MathTex("P(A \\cap B) = P(A) \\cdot P(B)", font_size=32).next_to(independent_box, DOWN, buff=0.6)
        dep_rule = MathTex("P(A \\cap B) = P(A) \\cdot P(B|A)", font_size=32).next_to(dependent_box, DOWN, buff=0.6)

        self.play(Write(ind_rule), Write(dep_rule))
        self.wait(3)

        self.play(FadeOut(VGroup(independent_box, indep_ex, indep_title, ind_rule,
                                 dependent_box, dep_ex, dep_title, dep_rule, title)))

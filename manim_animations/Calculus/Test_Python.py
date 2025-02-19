from manim import *
import sys


class CreateCircle(Scene):
    def construct(self):
        parameters = sys.argv[1:]
        print(parameters)
        circle = Circle() 
        circle.set_fill(PINK, opacity=0.5) 
        self.play(Create(circle)) 

if __name__ == "__main__":
    config.media_dir = "G:\\Capstone\\manim_animations\\media\\videos\\animation_test\\1080p60\\"
    scene = GetRiemannRectanglesExample()
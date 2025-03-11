from manim import *
import sys
from manim import config

json_file_path = config.get("json_file")
if json_file_path:
    print(f"Using JSON file: {json_file_path}")

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
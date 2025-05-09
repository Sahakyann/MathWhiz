from manim import *

config.frame_size = (1080, 1920)

class ToolsAndVisualCalculators3D(ThreeDScene):
    def construct(self):
        self.camera.background_color = BLACK

        
        self.set_camera_orientation(phi=75 * DEGREES, theta=30 * DEGREES)


        title = Text("3D Graphing", font_size=160,stroke_width = 2,stroke_color = DARK_BLUE,color=WHITE)
        title.move_to(ORIGIN)
        self.add_fixed_in_frame_mobjects(title)

 
        vertical_spacing = 3
        vertical_spacing2 = 5
        shapes = VGroup()

        for i in range(8):
            y_pos = i * vertical_spacing - 11
            shape_type = i % 3

            if shape_type == 0:
                shape = Sphere(radius=2).set_color(BLUE_E)
            elif shape_type == 1:
                shape = Cube(side_length=3).set_color(TEAL)
            else:
                shape = Cone(base_radius=2, height=3).set_color(ORANGE)

            shape.move_to([4, 3, y_pos])
            shapes.add(shape)

        for i in range(8):
            y_pos = i * vertical_spacing2 - 19
            shape_type = i % 3

            if shape_type == 0:
                shape = Sphere(radius=2).set_color(ORANGE).scale(1.5)
            elif shape_type == 1:
                shape = Cube(side_length=3).set_color(BLUE_E).scale(1.5)
            else:
                shape = Cone(base_radius=2, height=3).set_color(TEAL).scale(1.5)

            shape.move_to([-4, 5, y_pos])
            shapes.add(shape)

        for i in range(8):
            y_pos = i * vertical_spacing2 - 19
            shape_type = i % 3

            if shape_type == 0:
                shape = Sphere(radius=2).set_color(TEAL).scale(1.5)
            elif shape_type == 1:
                shape = Cube(side_length=3).set_color(ORANGE).scale(1.5)
            else:
                shape = Cone(base_radius=2, height=3).set_color(BLUE_E).scale(1.5)

            shape.move_to([4, -3, y_pos])
            shapes.add(shape)

        self.add(shapes)

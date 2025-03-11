from manim import *

class Derivative(Scene):
    def construct(self):
        # Define axes
        axes = Axes(
            x_range=[-3, 3, 1],  
            y_range=[-2, 10, 2],  
            axis_config={"color": WHITE}
        ).add_coordinates()

        # Define function f(x) = x^2 - x + 2
        def func(x):
            return x**2 - x + 2

        graph = axes.plot(func, color=BLUE, use_smoothing=False)

       
        x_tracker = ValueTracker(-2)  

       
        dot = always_redraw(lambda: Dot(color=YELLOW).move_to(axes.c2p(x_tracker.get_value(), func(x_tracker.get_value()))))

      
        tangent_line = always_redraw(lambda: self.get_tangent_line(x_tracker.get_value(), axes, func))

      
        derivative_text = always_redraw(lambda: self.get_derivative_text(x_tracker.get_value(), axes))

    
        self.play(Create(axes), Create(graph))
        self.add(dot, tangent_line, derivative_text)

    
        self.play(x_tracker.animate.set_value(2), run_time=3, rate_func=smooth)  

        self.wait()

    def get_tangent_line(self, x_val, axes, func):
        """ Returns the tangent line at a given x value with minimal calculation. """
        slope = 2 * x_val - 1
        y_intercept = func(x_val) - slope * x_val
        return axes.plot(
            lambda x: slope * x + y_intercept, 
            color=RED, 
            x_range=[x_val - 2, x_val + 2],
            use_smoothing=False
        )

    def get_derivative_text(self, x_val, axes):
        """ Returns a text label showing the derivative value. """
        derivative_value = 2 * x_val - 1  # f'(x)
        text = MathTex(f"f'({x_val:.2f}) = {derivative_value:.2f}")
        text.next_to(axes.c2p(x_val, 0), UP, buff=0.5)
        return text

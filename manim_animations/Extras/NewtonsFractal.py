from mandelbrot import Mandelbrot
import matplotlib.pyplot as plt

mand = Mandelbrot(maxiter = 5000, rgb_thetas = [.29, .02, 0.9], ncycle = 8,
                  step_s = 10,
                  coord = [-1.9854527029227764,
                           -1.9854527027615938,
                           0.00019009159314173224,
                           0.00019009168379912058])
mand.draw('pow.png')
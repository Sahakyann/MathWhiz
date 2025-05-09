# MathWhiz

**MathWhiz** is an interactive educational platform that brings math concepts to life through animations, calculators, and hands-on learning tools. Built with React, ASP.NET Core, ManimCE, and Three.js, this project helps students visualize complex ideas in calculus, linear algebra, probability, and more.

## Features

-  **Interactive Visualizations** — Powered by Manim and Three.js for real-time animations of calculus, linear algebra, probability, and statistics.
-  **Concept Explainers** — Includes AI-driven explanations for selected math topics to help mathematical understanding.
-  **Math Tools** — Offers visual calculators for integrals, derivatives, matrix operations, and more.
-  **Lesson Modules** — Each topic includes a structured lesson with KaTeX-rendered formulas and interactive quizzes.

## Frameworks Utilized

| Frontend        | Backend         | Math Engine     |
|----------------|----------------|------------------|
| React | ASP.NET Core   | Python + ManimCE |
| Plotly.js       | RESTful APIs    | SymPy, NumPy     |

## Setup Instructions

## 1. Clone the Repository

```bash
git clone https://github.com/Sahakyann/MathWhiz.git
cd MathWhiz
```

## 2. Set Up the Backend (ASP.NET Core)

Navigate to the backend project directory:

```bash
cd mathwhiz
```

Restore dependencies and run the server:

```bash
dotnet restore
dotnet build
dotnet run
```
This will start the API on https://localhost:(SomePort) by default.


## 3. Set Up the Frontend (React)
Navigate to the frontend directory:

```bash
cd client
```
Install frontend dependencies:
```bash
npm install
```
Start the development server:
``` bash
npm start
```
The front-end server will then run on http://localhost:3000 


## 4. Python Environment for Manim Animations

To enable animation generation:

1. Install [Python 3.10+](https://www.python.org/downloads/).
2. Follow the official [Manim Community Edition installation guide](https://docs.manim.community/en/stable/installation.html) to set up ManimCE.

Once installed, you can render a sample animation like this:

```bash
manim -pql manim_animations/Vector_transformations.py CreateTransform
```
## 5. Required Modification to ManimCE for JSON Input Support

This project uses a custom `--json-file` flag for dynamic parameterization of Manim animations. To support this, you must manually modify the Manim source code.

### File 1: `manim/_config/utils.py`

Locate and edit this file:
**Changes to apply:**

1. In the class where `_d` is defined, add this line to the constructor:

```python
self._d["json_file"] = None
```

2. Add the following property and setter:

```python
@property
def json_file(self) -> str | None:
    return self._d.get("json_file", None)

@json_file.setter
def json_file(self, value: str) -> None:
    self._d["json_file"] = value
```

3. In the digest_args method (usually near the bottom), add:

```python
if hasattr(args, "json_file") and args.json_file:
    self["json_file"] = args.json_file
```

### File 2: manim/cli/render/render_options.py
Locate and edit:

``` bash
C:\Python310\Lib\site-packages\manim\cli\render\render_options.py
```

## Changes to apply:

In the render_options = option_group(... list, add the following option definition (anywhere before the final closing bracket):

``` python
option(
    "--json-file",
    type=str,
    help="Path to the JSON file containing function parameters",
    default=None,
),
```
This will enable Manim to accept the --json-file flag during rendering.

Once these edits are applied, you can render animations with custom JSON input like so:

``` bash
manim -pql your_scene.py YourSceneName --json-file input.json
```
Note: These changes are required because the official ManimCE does not currently support arbitrary JSON input. If the library updates in the future with built-in support, this step may become obsolete.

# Current Math Visualizations Supported

- Definite Integrals
- Derivatives and Tangent Lines
- Taylor Series and Approximation
- Matrix Multiplication
- Linear Transformations
- Eigenvectors and Eigenvalues
- Gradient Descent
- Central Limit Theorem
- Law of Large Numbers
- Newton's Method

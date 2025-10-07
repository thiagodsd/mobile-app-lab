from manim import *
import numpy as np

class MeanCalculation(Scene):
    def construct(self):
        # White background for minimalist style
        self.camera.background_color = WHITE

        # Sample numbers
        numbers = [3, 7, 5, 9, 2, 8, 4, 6]

        # Formula setup (at the top)
        mu_symbol = MathTex(r"\mu", font_size=44)
        mu_symbol.set_color(BLACK)

        equals1 = MathTex("=", font_size=40)
        equals1.set_color(BLACK)

        fraction = MathTex(r"\frac{1}{n}", font_size=40)
        fraction.set_color(BLACK)

        sum_symbol = MathTex(r"\sum", font_size=50)
        sum_symbol.set_color(BLACK)

        x_i = MathTex("x_i", font_size=40)
        x_i.set_color(BLACK)

        # Arrange formula horizontally at the top
        formula_group = VGroup(mu_symbol, equals1, fraction, sum_symbol, x_i)
        formula_group.arrange(RIGHT, buff=0.3)
        formula_group.shift(UP * 2.5)

        # Display the numbers below formula
        numbers_tex = VGroup()
        for i, num in enumerate(numbers):
            num_obj = MathTex(str(num), font_size=40)
            num_obj.set_color(BLACK)
            numbers_tex.add(num_obj)

        numbers_tex.arrange(RIGHT, buff=0.5)
        numbers_tex.shift(UP * 0.8)

        # Show formula and numbers
        self.play(Write(formula_group), run_time=1)
        self.wait(0.3)
        self.play(LaggedStart(*[FadeIn(num, shift=DOWN*0.3) for num in numbers_tex], lag_ratio=0.1), run_time=1.2)
        self.wait(0.5)

        # Calculate step by step (below the numbers)
        # First show n
        n_value = len(numbers)
        n_text = MathTex(f"n = {n_value}", font_size=36)
        n_text.set_color(BLACK)
        n_text.shift(DOWN * 0.5)

        self.play(Write(n_text), run_time=0.5)
        self.wait(0.3)

        # Show sum calculation
        sum_text = MathTex(r"\sum x_i = ", font_size=36)
        sum_text.set_color(BLACK)
        sum_text.next_to(n_text, DOWN, buff=0.4)

        # Build sum animation
        sum_parts = [MathTex(str(num), font_size=32).set_color(BLACK) for num in numbers]
        plus_signs = [MathTex("+", font_size=32).set_color(BLACK) for _ in range(len(numbers)-1)]

        sum_expression = VGroup(sum_text)
        for i, num_tex in enumerate(sum_parts):
            sum_expression.add(num_tex)
            if i < len(plus_signs):
                sum_expression.add(plus_signs[i])

        sum_expression.arrange(RIGHT, buff=0.15)
        sum_expression.move_to(sum_text.get_center(), aligned_edge=LEFT)

        # Animate adding numbers one by one
        self.play(Write(sum_text), run_time=0.4)

        running_sum = 0
        for i, num in enumerate(numbers):
            # Highlight current number
            self.play(
                numbers_tex[i].animate.set_color(BLUE),
                run_time=0.2
            )

            # Add to sum
            if i == 0:
                self.play(Write(sum_parts[i]), run_time=0.3)
            else:
                self.play(
                    Write(plus_signs[i-1]),
                    Write(sum_parts[i]),
                    run_time=0.3
                )

            # Fade back to black
            self.play(numbers_tex[i].animate.set_color(BLACK), run_time=0.2)

        self.wait(0.4)

        # Show sum result
        total = sum(numbers)
        sum_result = MathTex(f"= {total}", font_size=36)
        sum_result.set_color(BLUE)
        sum_result.next_to(sum_expression, RIGHT, buff=0.3)

        self.play(Write(sum_result), run_time=0.5)
        self.wait(0.5)

        # Calculate mean
        mean_calc = MathTex(r"\mu = \frac{" + str(total) + "}{" + str(n_value) + "}", font_size=40)
        mean_calc.set_color(BLACK)
        mean_calc.next_to(sum_text, DOWN, buff=0.6)

        self.play(Write(mean_calc), run_time=0.6)
        self.wait(0.4)

        # Final result
        mean_value = total / n_value
        final_result = MathTex(f"\\mu = {mean_value}", font_size=48)
        final_result.set_color(BLUE)
        final_result.next_to(mean_calc, DOWN, buff=0.6)

        # Create box around result
        result_box = SurroundingRectangle(final_result, color=BLUE, buff=0.3, stroke_width=3)

        self.play(
            Write(final_result),
            Create(result_box),
            run_time=0.8
        )
        self.wait(1.5)

        # Fade everything except the final result
        self.play(
            FadeOut(numbers_tex),
            FadeOut(formula_group),
            FadeOut(n_text),
            FadeOut(sum_expression),
            FadeOut(sum_result),
            FadeOut(mean_calc),
            final_result.animate.scale(1.2).move_to(ORIGIN),
            result_box.animate.scale(1.2).move_to(ORIGIN),
            run_time=1
        )
        self.wait(1)

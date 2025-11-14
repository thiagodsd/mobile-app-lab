from manim import *
import numpy as np

class SimpleNormalDistribution(Scene):
    def construct(self):
        self.camera.background_color = WHITE

        mu = 0
        sigma = 1
        total_samples = 2000
        samples_per_update = 5
        n_bins = 30
        samples = np.random.normal(mu, sigma, total_samples)

        max_y_visual = 8
        max_count_esperado = 130

        axes = Axes(
            x_range=[-3.5, 3.5, 1],
            y_range=[0, max_y_visual, 2],
            x_length=7,
            y_length=5.5,
            axis_config={"include_tip": False, "stroke_width": 2},
        ).shift(RIGHT * 2 + DOWN * 0.3)
        axes.set_color(BLACK)

        fx_label = MathTex("f(x").shift(LEFT * 5 + UP * 0.5)
        fx_label.set_color(BLACK)

        equals_sign = MathTex("=").next_to(fx_label, RIGHT, buff=0.1)
        equals_sign.set_color(BLACK)

        x_value = DecimalNumber(0, num_decimal_places=2, font_size=36).next_to(equals_sign, RIGHT, buff=0.1)
        x_value.set_color(BLACK)

        close_paren = MathTex(")").next_to(x_value, RIGHT, buff=0.1)
        close_paren.set_color(BLACK)

        equals_sign2 = MathTex("=").next_to(close_paren, RIGHT, buff=0.15)
        equals_sign2.set_color(BLACK)

        fx_value = DecimalNumber(0, num_decimal_places=4, font_size=32).next_to(equals_sign2, RIGHT, buff=0.15)
        fx_value.set_color(BLACK)

        self.add(axes, fx_label, equals_sign, x_value, close_paren, equals_sign2, fx_value)
        self.wait(0.3)

        def normal_pdf(x, mu=0, sigma=1):
            return (1 / (sigma * np.sqrt(2 * np.pi))) * np.exp(-0.5 * ((x - mu) / sigma) ** 2)

        bin_edges = np.linspace(-3.5, 3.5, n_bins + 1)
        bars = {}

        for i in range(n_bins):
            bin_center = (bin_edges[i] + bin_edges[i + 1]) / 2
            bin_width = bin_edges[1] - bin_edges[0]
            bar = Rectangle(
                width=axes.x_axis.unit_size * bin_width * 0.9,
                height=0.01,
                fill_color=BLUE,
                fill_opacity=0.7,
                stroke_color=BLUE_D,
                stroke_width=0.5,
            )
            bar.move_to(axes.c2p(bin_center, 0)).align_to(axes.c2p(bin_center, 0), DOWN)
            bars[i] = bar
            self.add(bar)

        current_counts = np.zeros(n_bins)

        for idx in range(0, total_samples, samples_per_update):
            end_idx = min(idx + samples_per_update, total_samples)
            new_samples = samples[idx:end_idx]

            last_value = new_samples[-1]
            fx_result = normal_pdf(last_value, mu=0, sigma=1)

            new_x_value = DecimalNumber(last_value, num_decimal_places=2, font_size=36)
            new_x_value.set_color(BLACK)
            new_x_value.move_to(x_value.get_center())

            new_fx_value = DecimalNumber(fx_result, num_decimal_places=4, font_size=32)
            new_fx_value.set_color(BLACK)
            new_fx_value.move_to(fx_value.get_center())

            for sample in new_samples:
                bin_idx = np.digitize(sample, bin_edges) - 1
                if 0 <= bin_idx < n_bins:
                    current_counts[bin_idx] += 1

            animations = [
                Transform(x_value, new_x_value),
                Transform(fx_value, new_fx_value)
            ]

            for i in range(n_bins):
                if current_counts[i] > 0:
                    bin_center = (bin_edges[i] + bin_edges[i + 1]) / 2
                    bin_width = bin_edges[1] - bin_edges[0]
                    count = current_counts[i]
                    y_value = (count / max_count_esperado) * max_y_visual
                    new_height = axes.y_axis.unit_size * (y_value / 2)

                    new_bar = Rectangle(
                        width=axes.x_axis.unit_size * bin_width * 0.9,
                        height=new_height,
                        fill_color=BLUE,
                        fill_opacity=0.7,
                        stroke_color=BLUE_D,
                        stroke_width=0.5,
                    )
                    bottom_point = axes.c2p(bin_center, 0)
                    new_bar.move_to(bottom_point).shift(UP * new_height / 2)
                    animations.append(Transform(bars[i], new_bar))

            self.play(*animations, run_time=0.08)

            max_current_count = np.max(current_counts)
            max_y_reached = (max_current_count / max_count_esperado) * max_y_visual
            if max_y_reached >= max_y_visual * 0.9:
                break

        self.wait(2)

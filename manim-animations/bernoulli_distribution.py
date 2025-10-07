from manim import *
import numpy as np

class BernoulliDistribution(Scene):
    def construct(self):
        self.camera.background_color = WHITE

        p = 0.5  # probability of heads
        total_samples = 400
        samples_per_update = 2

        max_y_visual = 8
        max_count_esperado = 250

        # Create axes - only x-axis, no y-axis
        axes = Axes(
            x_range=[-0.5, 1.5, 1],
            y_range=[0, max_y_visual, 2],
            x_length=4,
            y_length=5.5,
            axis_config={"include_tip": False, "stroke_width": 2},
        ).shift(RIGHT * 2 + DOWN * 0.3)

        # Only show x-axis
        x_axis = axes.x_axis
        x_axis.set_color(BLACK)

        # Label showing current flip result
        flip_value = MathTex(r"\text{Cara}", font_size=48).shift(LEFT * 4.5 + UP * 0.5)
        flip_value.set_color(BLACK)

        # X-axis labels (Cara and Coroa)
        cara_label = MathTex(r"\text{Cara}", font_size=28).set_color(BLACK)
        cara_label.next_to(axes.c2p(0, 0), DOWN, buff=0.5)

        coroa_label = MathTex(r"\text{Coroa}", font_size=28).set_color(BLACK)
        coroa_label.next_to(axes.c2p(1, 0), DOWN, buff=0.5)

        self.add(x_axis, flip_value, cara_label, coroa_label)
        self.wait(0.3)

        # Generate Bernoulli samples
        samples = np.random.binomial(1, p, total_samples)

        # Initialize bars for 0 and 1
        bars = {}

        # Bar for outcome 0
        bar_0 = Rectangle(
            width=axes.x_axis.unit_size * 0.6,
            height=0.01,
            fill_color=BLUE,
            fill_opacity=0.7,
            stroke_color=BLUE_D,
            stroke_width=0.5,
        )
        bar_0.move_to(axes.c2p(0, 0)).align_to(axes.c2p(0, 0), DOWN)
        bars[0] = bar_0
        self.add(bar_0)

        # Bar for outcome 1
        bar_1 = Rectangle(
            width=axes.x_axis.unit_size * 0.6,
            height=0.01,
            fill_color=BLUE,
            fill_opacity=0.7,
            stroke_color=BLUE_D,
            stroke_width=0.5,
        )
        bar_1.move_to(axes.c2p(1, 0)).align_to(axes.c2p(1, 0), DOWN)
        bars[1] = bar_1
        self.add(bar_1)

        current_counts = np.array([0, 0])

        for idx in range(0, total_samples, samples_per_update):
            end_idx = min(idx + samples_per_update, total_samples)
            new_samples = samples[idx:end_idx]

            last_value = new_samples[-1]

            # Update flip label (Cara = 0, Coroa = 1)
            flip_text = r"\text{Cara}" if last_value == 0 else r"\text{Coroa}"
            new_flip_value = MathTex(flip_text, font_size=48)
            new_flip_value.set_color(BLACK)
            new_flip_value.move_to(flip_value.get_center())

            # Update counts
            for sample in new_samples:
                current_counts[int(sample)] += 1

            animations = [
                Transform(flip_value, new_flip_value)
            ]

            # Update bars
            for outcome in [0, 1]:
                if current_counts[outcome] > 0:
                    count = current_counts[outcome]
                    y_value = (count / max_count_esperado) * max_y_visual
                    new_height = axes.y_axis.unit_size * (y_value / 2)

                    new_bar = Rectangle(
                        width=axes.x_axis.unit_size * 0.6,
                        height=new_height,
                        fill_color=BLUE,
                        fill_opacity=0.7,
                        stroke_color=BLUE_D,
                        stroke_width=0.5,
                    )
                    bottom_point = axes.c2p(outcome, 0)
                    new_bar.move_to(bottom_point).shift(UP * new_height / 2)
                    animations.append(Transform(bars[outcome], new_bar))

            self.play(*animations, run_time=0.08)

            max_current_count = np.max(current_counts)
            max_y_reached = (max_current_count / max_count_esperado) * max_y_visual
            if max_y_reached >= max_y_visual * 0.9:
                break

        self.wait(2)

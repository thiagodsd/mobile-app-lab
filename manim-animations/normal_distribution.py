from manim import *
import numpy as np
from scipy.stats import norm

class NormalDistributionHistogram(Scene):
    def construct(self):
        # Configurações
        mu = 0  # média
        sigma = 1  # desvio padrão
        n_samples = 1000  # número total de amostras
        n_bins = 30  # número de bins do histograma

        # Criar eixos
        axes = Axes(
            x_range=[-4, 4, 1],
            y_range=[0, 0.5, 0.1],
            x_length=10,
            y_length=6,
            axis_config={"include_tip": False},
            x_axis_config={"numbers_to_include": np.arange(-4, 5, 1)},
            y_axis_config={"numbers_to_include": np.arange(0, 0.6, 0.1)},
        )

        # Labels dos eixos
        x_label = axes.get_x_axis_label("x")
        y_label = axes.get_y_axis_label("f(x)", edge=LEFT, direction=LEFT)

        # Título
        title = Text("Distribuição Normal", font_size=40).to_edge(UP)

        # Mostrar setup inicial
        self.play(Create(axes), Write(x_label), Write(y_label), Write(title))
        self.wait(0.5)

        # Gerar amostras aleatórias
        samples = np.random.normal(mu, sigma, n_samples)

        # Criar histograma inicial vazio
        hist_data, bin_edges = np.histogram(samples[:0], bins=n_bins, range=(-4, 4), density=True)
        bars = self.create_histogram_bars(axes, bin_edges, hist_data)

        # Curva teórica da distribuição normal
        x_curve = np.linspace(-4, 4, 200)
        y_curve = norm.pdf(x_curve, mu, sigma)
        normal_curve = axes.plot_line_graph(
            x_values=x_curve,
            y_values=y_curve,
            line_color=RED,
            stroke_width=3,
        )

        # Animação: adicionar amostras gradualmente
        samples_per_frame = 20  # amostras adicionadas por frame
        frames = n_samples // samples_per_frame

        for i in range(1, frames + 1):
            n_current = i * samples_per_frame

            # Calcular histograma com amostras atuais
            hist_data, _ = np.histogram(samples[:n_current], bins=n_bins, range=(-4, 4), density=True)
            new_bars = self.create_histogram_bars(axes, bin_edges, hist_data)

            # Atualizar barras
            if i == 1:
                self.play(Create(bars), run_time=0.1)
            else:
                self.play(Transform(bars, new_bars), run_time=0.1)

        # Mostrar curva teórica
        self.play(Create(normal_curve), run_time=1)

        # Texto explicativo
        formula = MathTex(
            r"f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}",
            font_size=30
        ).next_to(axes, DOWN)

        params = MathTex(
            r"\mu = " + str(mu) + r", \sigma = " + str(sigma),
            font_size=30
        ).next_to(formula, DOWN)

        self.play(Write(formula), Write(params))
        self.wait(2)

    def create_histogram_bars(self, axes, bin_edges, hist_data):
        bars = VGroup()
        bin_width = bin_edges[1] - bin_edges[0]

        for i, height in enumerate(hist_data):
            bin_center = (bin_edges[i] + bin_edges[i + 1]) / 2

            # Criar retângulo para cada bin
            bar = Rectangle(
                width=axes.x_axis.unit_size * bin_width * 0.9,
                height=axes.y_axis.unit_size * height,
                fill_color=BLUE,
                fill_opacity=0.6,
                stroke_color=BLUE,
                stroke_width=1,
            )

            # Posicionar barra
            bar.move_to(axes.c2p(bin_center, height / 2))
            bars.add(bar)

        return bars


class NormalDistributionAnimated(Scene):
    """Versão alternativa com animação mais suave e visual aprimorado"""

    def construct(self):
        # Configurações
        mu = 0
        sigma = 1
        n_samples = 2000
        n_bins = 40

        # Criar eixos
        axes = Axes(
            x_range=[-4, 4, 1],
            y_range=[0, 0.5, 0.1],
            x_length=11,
            y_length=6,
            axis_config={"include_tip": False, "color": GRAY},
        )

        labels = axes.get_axis_labels(x_label="x", y_label="Densidade")

        # Título e subtítulo
        title = Text("Gerando Números Aleatórios", font_size=36).to_edge(UP)
        subtitle = Text("Distribuição Normal (μ=0, σ=1)", font_size=24).next_to(title, DOWN)

        self.play(Write(title), Write(subtitle))
        self.wait(0.5)
        self.play(Create(axes), Write(labels))

        # Gerar todas as amostras
        samples = np.random.normal(mu, sigma, n_samples)

        # Animação progressiva
        update_intervals = [50, 100, 200, 500, 1000, 1500, 2000]
        bars = None

        for n in update_intervals:
            hist_data, bin_edges = np.histogram(samples[:n], bins=n_bins, range=(-4, 4), density=True)
            new_bars = self.create_bars(axes, bin_edges, hist_data)

            # Counter
            counter = Text(f"n = {n}", font_size=28).to_corner(UR)

            if bars is None:
                self.play(Create(new_bars), Write(counter), run_time=0.5)
                bars = new_bars
            else:
                old_counter = self.mobjects[-1]  # último counter
                self.play(
                    Transform(bars, new_bars),
                    Transform(old_counter, counter),
                    run_time=0.5
                )

        self.wait(0.5)

        # Adicionar curva teórica
        x_vals = np.linspace(-4, 4, 300)
        y_vals = norm.pdf(x_vals, mu, sigma)
        curve = axes.plot_line_graph(x_vals, y_vals, line_color=RED, stroke_width=4)

        curve_label = Text("Curva Teórica", font_size=20, color=RED).next_to(axes, DOWN)

        self.play(Create(curve), Write(curve_label), run_time=1.5)
        self.wait(2)

    def create_bars(self, axes, bin_edges, hist_data):
        bars = VGroup()
        bin_width = bin_edges[1] - bin_edges[0]

        for i, height in enumerate(hist_data):
            if height > 0:
                bin_center = (bin_edges[i] + bin_edges[i + 1]) / 2

                bar = Rectangle(
                    width=axes.x_axis.unit_size * bin_width * 0.95,
                    height=axes.y_axis.unit_size * height,
                    fill_color=BLUE,
                    fill_opacity=0.7,
                    stroke_color=WHITE,
                    stroke_width=0.5,
                )

                bar.move_to(axes.c2p(bin_center, height / 2))
                bars.add(bar)

        return bars

# Animações Manim - Distribuições de Probabilidade

Este diretório contém scripts Python para gerar animações educacionais sobre distribuições de probabilidade usando Manim (Mathematical Animation Engine).

## Instalação

1. **Instalar Manim e dependências:**

```bash
cd manim-animations
pip install -r requirements.txt
```

**Nota:** Manim requer algumas dependências do sistema. Se você encontrar erros, consulte a [documentação oficial de instalação do Manim](https://docs.manim.community/en/stable/installation.html).

Para Ubuntu/Debian:
```bash
sudo apt update
sudo apt install libcairo2-dev libpango1.0-dev ffmpeg
```

## Gerando as Animações

### 1. Animação Básica (NormalDistributionHistogram)

Gera uma animação mostrando números aleatórios sendo gerados e formando um histograma de distribuição normal:

```bash
manim -pql normal_distribution.py NormalDistributionHistogram
```

### 2. Animação Aprimorada (NormalDistributionAnimated)

Versão com visual mais polido e animação em etapas:

```bash
manim -pql normal_distribution.py NormalDistributionAnimated
```

## Opções de Qualidade

- **Baixa qualidade (rápido para testes):**
  ```bash
  manim -pql normal_distribution.py NormalDistributionAnimated
  ```

- **Média qualidade:**
  ```bash
  manim -pqm normal_distribution.py NormalDistributionAnimated
  ```

- **Alta qualidade (para produção):**
  ```bash
  manim -pqh normal_distribution.py NormalDistributionAnimated
  ```

- **4K (melhor qualidade):**
  ```bash
  manim -pqk normal_distribution.py NormalDistributionAnimated
  ```

## Formatos de Saída

### Vídeo MP4 (padrão)
```bash
manim -pqh normal_distribution.py NormalDistributionAnimated
```
Saída: `media/videos/normal_distribution/1080p60/NormalDistributionAnimated.mp4`

### GIF
```bash
manim -pqh --format gif normal_distribution.py NormalDistributionAnimated
```
Saída: `media/videos/normal_distribution/1080p60/NormalDistributionAnimated.gif`

### Transparente (WebM)
```bash
manim -pqh --format webm --transparent normal_distribution.py NormalDistributionAnimated
```

## Personalização

Você pode editar os parâmetros no arquivo `normal_distribution.py`:

- `mu`: média da distribuição (padrão: 0)
- `sigma`: desvio padrão (padrão: 1)
- `n_samples`: número total de amostras (padrão: 2000)
- `n_bins`: número de bins do histograma (padrão: 40)

## Integrando no Projeto Next.js

1. Gere a animação em alta qualidade
2. Copie o vídeo para o diretório public:

```bash
# Gerar animação
manim -pqh normal_distribution.py NormalDistributionAnimated

# Copiar para o projeto
cp media/videos/normal_distribution/1080p60/NormalDistributionAnimated.mp4 ../public/animations/
```

3. Use no componente React:

```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  className="w-full rounded-xl"
>
  <source src="/animations/NormalDistributionAnimated.mp4" type="video/mp4" />
</video>
```

## Cenas Disponíveis

### NormalDistributionHistogram
- Animação básica e contínua
- Mostra todas as amostras sendo adicionadas gradualmente
- Inclui fórmula matemática

### NormalDistributionAnimated
- Animação em etapas (50, 100, 200, 500, 1000, 1500, 2000 amostras)
- Visual mais polido
- Contador de amostras
- Melhor para fins educacionais

## Recursos

- [Documentação Manim](https://docs.manim.community/)
- [Galeria de Exemplos](https://docs.manim.community/en/stable/examples.html)
- [Canal do 3Blue1Brown](https://www.youtube.com/c/3blue1brown)

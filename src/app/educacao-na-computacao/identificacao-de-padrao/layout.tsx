import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Identificação de Padrões | Educação na Computação',
  description: 'Aprenda a identificar e prever distribuições de probabilidade através de dados reais da turma. Explore Normal, Uniforme, Exponencial, Binomial, Poisson e Bernoulli.',
  keywords: 'distribuições de probabilidade, identificação de padrões, estatística, educação em computação, análise de dados, aprendizado de máquina',
  openGraph: {
    title: 'Identificação de Padrões | Educação na Computação',
    description: 'Preveja as distribuições que descrevem os dados da turma',
    type: 'website',
  },
};

export default function IdentificacaoDePadraoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
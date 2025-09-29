import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teoria: Distribuições de Probabilidade | Educação na Computação",
  description: "Introdução visual e divertida sobre distribuições de probabilidade com estilo XKCD. Aprenda sobre distribuições Normal, Uniforme e Exponencial de forma intuitiva.",
  keywords: ["distribuições de probabilidade", "estatística", "educação", "normal", "uniforme", "exponencial", "gaussiana", "teoria", "matemática"],
  authors: [{ name: "Educação na Computação" }],
  openGraph: {
    title: "Teoria: Distribuições de Probabilidade",
    description: "Guia visual sobre distribuições de probabilidade com gráficos no estilo XKCD",
    type: "article",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teoria: Distribuições de Probabilidade",
    description: "Aprenda sobre distribuições de probabilidade de forma visual e divertida",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TeoriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
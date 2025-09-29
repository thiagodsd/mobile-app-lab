import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avaliação de Conhecimento Prévio | Educação na Computação",
  description: "Questionário rápido (15min) para avaliar conhecimento prévio em estatística. Ferramenta de avaliação para disciplinas de Educação na Computação.",
  keywords: ["avaliação", "educação na computação", "estatística", "conhecimento prévio", "questionário educacional", "métodos de ensino"],
  authors: [{ name: "Educação na Computação" }],
  openGraph: {
    title: "Avaliação de Conhecimento Prévio | Educação na Computação",
    description: "Questionário rápido para avaliar conhecimento prévio em estatística - Aula de 15 minutos",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avaliação de Conhecimento Prévio",
    description: "Questionário para avaliação em disciplinas de Educação na Computação",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ConhecimentoPrevioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
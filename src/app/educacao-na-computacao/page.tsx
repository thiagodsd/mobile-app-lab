import Link from 'next/link';

export default function EducacaoNaComputacaoPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-black space-y-4 text-xl font-light">
        <div>
          <Link
            href="/educacao-na-computacao/conhecimento-previo"
            className="hover:underline"
          >
            Parte 1
          </Link>
        </div>
        <div>
          <Link
            href="/educacao-na-computacao/conhecimento-previo/resultados"
            className="hover:underline"
          >
            Parte 2
          </Link>
        </div>
        <div>
          <Link
            href="/educacao-na-computacao/teoria"
            className="hover:underline"
          >
            Parte 3
          </Link>
        </div>
        <div>
          <Link
            href="/educacao-na-computacao/teoria/reconhecimento-padrao"
            className="hover:underline"
          >
            Parte 4
          </Link>
        </div>
        <div>
          <Link
            href="/educacao-na-computacao/identificacao-de-padrao"
            className="hover:underline"
          >
            Parte 5
          </Link>
        </div>
      </div>
    </div>
  );
}

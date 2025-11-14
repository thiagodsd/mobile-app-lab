// Componente de carta simplificado para visualização
const MiniCard = ({ rank, suit = '♠' }: { rank: string; suit?: string }) => {
    const isRed = suit === '♥' || suit === '♦';
    return (
        <div className="w-16 h-24 bg-white border-2 border-gray-800 rounded relative">
            <div className={`absolute top-0.5 left-1 text-lg leading-none ${isRed ? 'text-red-600' : 'text-black'}`}>
                {suit}
            </div>
            <div className={`absolute bottom-0.5 right-1 text-4xl leading-none font-light ${isRed ? 'text-red-600' : 'text-black'}`}>
                {rank}
            </div>
        </div>
    );
};

export default function Slide1c() {
    return (
        <section className="flex flex-col gap-6 items-center justify-center min-h-screen">
            {/* Título */}
            <div className="text-center">
                <h3 className="text-3xl mb-4">Probabilidade Condicional</h3>
                <p style={{ fontSize: '0.66em' }} className="text-xl">Como a probabilidade muda quando <strong>sabemos</strong> algo?</p>
            </div>

            <div className="fragment fade-in mb-10">
                {/* Pesquisa Guiada - Fontes Sugeridas */}
                <div className="fragment fade-in w-full">
                    <p style={{ fontSize: '0.66em' }} className="text-center text-lg mb-3">
                        📚 <strong>Vamos pesquisar!</strong>
                    </p>
                    <div className="flex gap-4 justify-center items-center">
                        <a
                            href="https://www.ime.usp.br/~leorolla/probabilidade/Ch2.S1.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border rounded"
                            style={{ fontSize: '0.6em' }}
                        >
                            📐 Prof. Leonardo T. Rolla: Curso de Probabilidade
                        </a>
                        <a
                            href="https://www.youtube.com/watch?v=_IgyaD7vOOA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border rounded"
                            style={{ fontSize: '0.6em' }}
                        >
                            🎥 StatQuest with Josh Starmer: Conditional Probabilities
                        </a>
                        <a
                            href="https://pt.wikipedia.org/wiki/Probabilidade_condicionada"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border rounded"
                            style={{ fontSize: '0.6em' }}
                        >
                            📖 Wikipedia: Probabilidade Condicional
                        </a>
                    </div>
                </div>
            </div>

            {/* Equação formal de probabilidade condicional com diagramas de Venn */}
            <div className="fragment fade-in">
                <div className="flex gap-8 items-center justify-center">
                    <p style={{ fontSize: '0.75em' }}>
                        {'$$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$$'}
                    </p>

                    <div className="flex gap-6 items-center">
                        {/* Diagrama do Numerador: A ∩ B */}
                        <div className="flex flex-col items-center gap-1">
                            <svg width="180" height="120" viewBox="0 0 120 80">
                                {/* Círculo B */}
                                <circle cx="45" cy="40" r="30" fill="none" stroke="#000" strokeWidth="2" />
                                {/* Círculo A */}
                                <circle cx="75" cy="40" r="30" fill="none" stroke="#000" strokeWidth="2" />
                                {/* Interseção A ∩ B (destacada com hachura) */}
                                <defs>
                                    <pattern id="hatch" width="4" height="4" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                                        <line x1="0" y1="0" x2="0" y2="4" stroke="#000" strokeWidth="1" />
                                    </pattern>
                                </defs>
                                <path d="M 60 15 A 30 30 0 0 1 60 65 A 30 30 0 0 1 60 15 Z" fill="url(#hatch)" stroke="#000" strokeWidth="2" />
                                {/* Labels */}
                                <text x="35" y="25" fill="#000" fontSize="14" fontWeight="bold">B</text>
                                <text x="85" y="25" fill="#000" fontSize="14" fontWeight="bold">A</text>
                                {/* <text x="54" y="43" fill="#000" fontSize="12" fontWeight="bold">A∩B</text> */}
                            </svg>
                            <p style={{ fontSize: '0.5em' }} className="text-gray-600">Numerador: A ∩ B</p>
                        </div>

                        {/* Diagrama do Denominador: B */}
                        <div className="flex flex-col items-center gap-1">
                            <svg width="180" height="120" viewBox="0 0 120 80">
                                {/* Círculo B completo (preenchido) */}
                                <circle cx="45" cy="40" r="30" fill="#ccc" stroke="#000" strokeWidth="3" />
                                {/* Círculo A (tracejado) */}
                                <circle cx="75" cy="40" r="30" fill="none" stroke="#666" strokeWidth="1" strokeDasharray="4,2" />
                                {/* Labels */}
                                <text x="35" y="43" fill="#000" fontSize="16" fontWeight="bold">B</text>
                                <text x="85" y="25" fill="#666" fontSize="12">A</text>
                            </svg>
                            <p style={{ fontSize: '0.5em' }} className="text-gray-600">Denominador: B</p>
                        </div>
                    </div>
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                    Lê-se: &quot;Probabilidade de A <strong>dado que</strong> B aconteceu&quot;
                </p>
            </div>

            {/* Rodadas em 3 colunas */}
            <div className="w-full">
                <div className="grid grid-cols-3 gap-4">
                    {/* Rodada 1 */}
                    <div className="fragment fade-in bg-blue-50 border-2 border-blue-600 rounded p-4">
                        <p className="text-[0.66em]">Rodada 1</p>

                        <div className="flex flex-col gap-2 items-center mb-3">
                            <MiniCard rank="7" suit="♥" />
                        </div>

                        <p style={{ fontSize: '0.66em' }} className="mb-1">
                            Baralho: <strong>51</strong> cartas, Três restantes: <strong>4</strong>
                        </p>

                        <p style={{ fontSize: '0.66em' }}>
                            {'$$P = \\frac{4}{51} \\approx 7.84\\%$$'}
                        </p>
                        <p style={{ fontSize: '0.50em' }} className="text-gray-700">
                            <strong>↑</strong> Aumentou de 7.69%
                        </p>
                    </div>

                    {/* Rodada 2 */}
                    <div className="fragment fade-in bg-green-50 border-2 border-green-600 rounded p-4">
                        <p className="text-[0.66em]">Rodada 2</p>

                        <div className="flex flex-col gap-2 items-center mb-3">
                            <div className="flex gap-1">
                                <MiniCard rank="7" suit="♥" />
                                <MiniCard rank="K" suit="♠" />
                            </div>
                        </div>

                        <p style={{ fontSize: '0.66em' }} className="mb-1">
                            Baralho: <strong>50</strong> cartas, Três restantes: <strong>4</strong>
                        </p>

                        <p style={{ fontSize: '0.66em' }}>
                            {'$$P = \\frac{4}{50} = 8\\%$$'}
                        </p>
                        <p style={{ fontSize: '0.50em' }} className="text-gray-700">
                            <strong>↑</strong> Continua aumentando
                        </p>
                    </div>

                    {/* Rodada 3 */}
                    <div className="fragment fade-in bg-red-50 border-2 border-red-600 rounded p-4">
                        <p className="text-[0.66em]">Rodada 3</p>

                        <div className="flex flex-col gap-2 items-center mb-3">
                            <div className="flex gap-1">
                                <MiniCard rank="7" suit="♥" />
                                <MiniCard rank="K" suit="♠" />
                                <MiniCard rank="3" suit="♦" />
                            </div>
                        </div>

                        <p style={{ fontSize: '0.66em' }} className="mb-1">
                            Baralho: <strong>49</strong> cartas, Três restantes: <strong>3</strong>
                        </p>

                        <p style={{ fontSize: '0.66em' }}>
                            {'$$P = \\frac{3}{49} \\approx 6.12\\%$$'}
                        </p>
                        <p style={{ fontSize: '0.50em' }} className="text-gray-700">
                            <strong>↓</strong> Diminuiu!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

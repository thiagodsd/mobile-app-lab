// Componente de carta simplificado para visualização
const MiniCard = ({ rank, suit = '♠' }: { rank: string; suit?: string }) => {
    const isRed = suit === '♥' || suit === '♦';
    return (
        <div className="w-16 h-20 bg-white border-2 border-gray-800 rounded relative">
            <div className={`absolute top-0.5 left-1 text-lg leading-none ${isRed ? 'text-red-600' : 'text-black'}`}>
                {suit}
            </div>
            <div className={`absolute bottom-0.5 right-1 text-4xl leading-none font-light ${isRed ? 'text-red-600' : 'text-black'}`}>
                {rank}
            </div>
        </div>
    );
};

export default function Slide4d() {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-col items-start mb-10">
                <h3>
                    Estratégia Hi-Lo Simplificada
                </h3>
            </div>

            {/* Visualização das cartas em 3 colunas */}
            <div className="flex flex-row gap-12 items-start justify-center mb-8">
                {/* Coluna +1 */}
                <div className="flex flex-col items-center gap-3">
                    <div className="text-2xl font-bold text-green-600">+1</div>
                    <div className="flex flex-row gap-2">
                        <MiniCard rank="2" />
                        <MiniCard rank="3" />
                        <MiniCard rank="4" />
                        <MiniCard rank="5" />
                        <MiniCard rank="6" />
                    </div>
                </div>

                {/* Coluna 0 */}
                <div className="flex flex-col items-center gap-3">
                    <div className="text-2xl font-bold text-gray-600">0</div>
                    <div className="flex flex-row gap-2">
                        <MiniCard rank="7" />
                        <MiniCard rank="8" />
                        <MiniCard rank="9" />
                    </div>
                </div>

                {/* Coluna -1 */}
                <div className="flex flex-col items-center gap-3">
                    <div className="text-2xl font-bold text-red-600">-1</div>
                    <div className="flex flex-row gap-2">
                        <MiniCard rank="10" />
                        <MiniCard rank="J" />
                        <MiniCard rank="Q" />
                        <MiniCard rank="K" />
                        <MiniCard rank="A" />
                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-8 items-start">
                <article className="flex flex-col gap-4 text-left flex-1">
                    <div>
                        <h4>Sistema de Contagem Hi-Lo</h4>
                        <p className="text-[0.66em]">Sistema de contagem mais popular:</p>
                        <ul className="flex flex-col text-[0.66em] list-disc list-inside">
                            <li><strong>2 a 6:</strong> +1</li>
                            <li><strong>7 a 9:</strong> 0</li>
                            <li><strong>10 a A:</strong> -1</li>
                        </ul>
                    </div>

                    <div>
                        <h4>Como Usar</h4>
                        <ul className="flex flex-col text-[0.66em] list-disc list-inside">
                            <li>Contagem positiva = vantagem do jogador &rarr; aposte mais</li>
                            <li>Contagem negativa = vantagem da casa &rarr; aposte mínimo</li>
                        </ul>
                    </div>
                </article>

                <article className="flex flex-col gap-4 text-left flex-1">
                    <div>
                        <h4>Exemplo em Ação</h4>
                        <p className="text-[0.66em]">Conte todas as cartas visíveis na mesa:</p>
                        <ul className="flex flex-col text-[0.66em] list-disc list-inside">
                            <li><strong>Rodada 1:</strong> 5♠ K♥ 3♦ 9♣ → +1 - 1 + 1 + 0 = <strong>+1</strong></li>
                            <li><strong>Rodada 2:</strong> A♠ 2♥ Q♦ 4♣ → -1 + 1 - 1 + 1 = <strong>0</strong></li>
                            <li><strong>Rodada 3:</strong> 6♥ 2♠ 5♣ 3♦ → +1 + 1 + 1 + 1 = <strong>+4</strong></li>
                        </ul>
                    </div>

                    <div>
                        <h4>Resultado</h4>
                        <ul className="flex flex-col text-[0.66em] list-disc list-inside">
                            <li><strong>Contagem Total:</strong> +5</li>
                            <li>Contagem positiva &rarr; vantagem do jogador &rarr; aumente a aposta</li>
                        </ul>
                    </div>
                </article>
            </div>
        </section>
    );
}

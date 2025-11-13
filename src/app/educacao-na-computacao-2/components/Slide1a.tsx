// Componente de carta simplificado para visualização
const MiniCard = ({ rank, suit = '♠' }: { rank: string; suit?: string }) => {
    const isRed = suit === '♥' || suit === '♦';
    return (
        <div className="w-24 h-32 bg-white border-2 border-gray-800 rounded relative">
            <div className={`absolute top-1 left-1.5 text-2xl leading-none ${isRed ? 'text-red-600' : 'text-black'}`}>
                {suit}
            </div>
            <div className={`absolute bottom-1 right-1.5 text-[64px] leading-none font-light ${isRed ? 'text-red-600' : 'text-black'}`}>
                {rank}
            </div>
        </div>
    );
};

export default function Slide1a() {
    return (
        <section className="flex flex-col gap-8 items-center justify-center min-h-screen">
            {/* Duas cartas */}
            <div className="flex flex-row gap-8 items-center justify-center">
                <MiniCard rank="7" suit="♥" />
                <MiniCard rank="3" suit="♠" />
            </div>

            {/* Pergunta */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-2xl text-center">Qual a probabilidade de tirar <strong>aleatoriamente</strong> um 3?</p>
                <p style={{ fontSize: '0.75em' }}>{'$$P(\\text{carta} = 3) = \\, ?$$'}</p>

                {/* Resposta - Fragment 1: Fração com raciocínio */}
                <div className="fragment fade-in">
                    <p style={{ fontSize: '0.75em' }}>{'$$P(\\text{carta} = 3) = \\frac{\\text{número de cartas 3}}{\\text{número total de cartas}} = \\frac{1}{2}$$'}</p>
                </div>

                {/* Resposta - Fragment 2: Decimal */}
                <div className="fragment fade-in">
                    <p style={{ fontSize: '0.75em' }}>{'$$P(\\text{carta} = 3) = 50\\%$$'}</p>
                </div>
            </div>
        </section>
    );
}

// Componente de carta simplificado para visualização
const MiniCard = ({ rank, suit = '♠' }: { rank: string; suit?: string }) => {
    const isRed = suit === '♥' || suit === '♦';
    return (
        <div className="w-20 h-28 bg-white border-2 border-gray-800 rounded relative">
            <div className={`absolute top-1 left-1.5 text-xl leading-none ${isRed ? 'text-red-600' : 'text-black'}`}>
                {suit}
            </div>
            <div className={`absolute bottom-1 right-1.5 text-5xl leading-none font-light ${isRed ? 'text-red-600' : 'text-black'}`}>
                {rank}
            </div>
        </div>
    );
};

export default function Slide2a() {
    return (
        <section className="flex flex-col gap-8 items-center justify-center min-h-screen">
            {/* Título */}
            <div className="flex flex-col items-center justify-center text-center mb-10 w-full">
                <h3 className="text-4xl">Probabilidade Condicional 🤝 Blackjack</h3>
                {/* Conclusão */}
                <div className="text-center max-w-3xl flex flex-col items-center justify-center w-full">
                    <p className="text-lg">
                        💡 <strong>Saber quais cartas saíram</strong> muda a probabilidade das próximas cartas!
                        <br />
                        <span className="text-base text-gray-600">
                            Essa é a base da <em>contagem de cartas</em> no Blackjack.
                        </span>
                    </p>
                </div>
            </div>
        </section>
    );
}

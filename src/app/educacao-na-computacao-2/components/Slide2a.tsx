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

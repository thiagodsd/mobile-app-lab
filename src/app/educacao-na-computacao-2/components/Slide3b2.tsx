export default function Slide3b2() {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-col items-start mb-10">
                <h3>
                    Cálculos
                </h3>
            </div>

            <div className="flex flex-col">
                <div className="flex flex-row gap-8 items-start justify-center mb-10">
                    <article className="flex flex-col text-left flex-1">
                        <h4>Caso 1: Ás &rarr; 10</h4>
                        <p className="text-[0.66em]">
                            Primeiro, tiramos um Ás, depois uma carta de valor 10.
                        </p>
                        <figure className="flex flex-col items-start">
                            <p style={{ fontSize: '0.75em' }}>{'$P(\\text{Ás} \\cap \\text{10}) = P(\\text{Ás}) \\times P(\\text{10} \\mid \\text{Ás})$'}</p>
                            <p style={{ fontSize: '0.75em' }}>{'$P = \\frac{4}{52} \\times \\frac{16}{51} = \\frac{64}{2652}$'}</p>
                        </figure>
                    </article>

                    <article className="flex flex-col text-left flex-1">
                        <h4>Caso 2: 10 &rarr; Ás</h4>
                        <p className="text-[0.66em]">
                            Primeiro, tiramos uma carta de valor 10, depois um Ás.
                        </p>
                        <figure className="flex flex-col items-start">
                            <p style={{ fontSize: '0.75em' }}>{'$P(\\text{10} \\cap \\text{Ás}) = P(\\text{10}) \\times P(\\text{Ás} \\mid \\text{10})$'}</p>
                            <p style={{ fontSize: '0.75em' }}>{'$P = \\frac{16}{52} \\times \\frac{4}{51} = \\frac{64}{2652}$'}</p>
                        </figure>
                    </article>
                </div>

                <div className="flex flex-col gap-2 items-center mt-10">
                    <p style={{ fontSize: '0.66em' }}>{'$P(\\text{Blackjack}) = P(\\text{Ás} \\cap \\text{10}) + P(\\text{10} \\cap \\text{Ás})$'}</p>
                    <p style={{ fontSize: '0.66em' }}>{'$P(\\text{Blackjack}) = \\frac{64}{2652} + \\frac{64}{2652} = \\frac{128}{2652} = \\frac{32}{663}$'}</p>

                    <p style={{ fontSize: '0.75em' }}>{'$\\boxed{P(\\text{Blackjack Natural}) \\approx 4.83\\%}$'}</p>
                </div>
            </div>
        </section>
    );
}

export default function Slide3b() {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-col items-start mb-10">
                <h3>
                    Pré-Requisitos: Conceitos e Ferramentas
                </h3>
            </div>

            <div className="flex flex-col">
                <div className="flex flex-row gap-8 items-start justify-center">
                    <article className="flex flex-col text-left flex-1">
                        <p>Probabilidade Conjunta</p>
                        <figure className="flex flex-col items-center">
                            <p style={{ fontSize: '0.75em' }}>{'$P(A \\cap B) = P(A) \\times P(B \\mid A)$'}</p>
                            <svg width="180" height="150" viewBox="0 0 120 100">
                                <circle cx="45" cy="50" r="30" fill="none" stroke="#333" strokeWidth="2" />
                                <circle cx="75" cy="50" r="30" fill="none" stroke="#333" strokeWidth="2" />
                                <text x="60" y="55" textAnchor="middle" fontSize="12" fill="#333">A&cap;B</text>
                            </svg>
                        </figure>
                        <p>
                            <em>Ex: Lançar dois dados e ambos serem pares</em>
                        </p>
                        <p style={{ fontSize: '0.66em' }}>{'$P(D_1 \\text{ par} \\cap D_2 \\text{ par}) = P(D_1 \\text{ par}) \\times P(D_2 \\text{ par})$'}</p>
                    </article>

                    <article className="flex flex-col text-left flex-1">
                        <p>Eventos Mutuamente Exclusivos</p>
                        <figure className="flex flex-col items-center">
                            <p style={{ fontSize: '0.75em' }}>{'$P(A \\cup B) = P(A) + P(B)$'}</p>
                            <svg width="225" height="150" viewBox="0 0 150 100">
                                <circle cx="40" cy="50" r="30" fill="none" stroke="#333" strokeWidth="2" />
                                <circle cx="110" cy="50" r="30" fill="none" stroke="#333" strokeWidth="2" />
                                <text x="40" y="55" textAnchor="middle" fontSize="12" fill="#333">A</text>
                                <text x="110" y="55" textAnchor="middle" fontSize="12" fill="#333">B</text>
                            </svg>
                        </figure>
                        <p><em>Ex: A soma dos dados ser 7 ou 11</em></p>
                        <p style={{ fontSize: '0.66em' }}>{'$P(\\text{soma} = 7 \\cup \\text{soma} = 11) = P(\\text{soma} = 7) + P(\\text{soma} = 11)$'}</p>
                    </article>
                </div>
            </div>
        </section>
    );
}

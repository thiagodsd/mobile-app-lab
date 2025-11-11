export default function Slide3d() {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-col items-start mb-10">
                <h3>
                    Valor Esperado no Blackjack &quot;Flat Betting&quot;
                </h3>
            </div>

            <div className="flex flex-col">
                <div className="flex flex-row gap-6 items-start justify-center mb-10">
                    <article className="flex flex-col text-left flex-1">
                        <p>Definição</p>
                        <figure className="flex flex-col items-start">
                            <p style={{ fontSize: '0.75em' }}>{'$X \\in \\{-V, 0, +V\\}$'}</p>
                            <p style={{ fontSize: '0.75em' }}>{'$E[X] = \\sum_{x \\in X} x \\cdot P(X = x)$'}</p>
                        </figure>
                    </article>

                    <article className="flex flex-col text-left flex-1">
                        <p>Nosso Problema</p>
                        <figure className="flex flex-col items-start">
                            <p style={{ fontSize: '0.75em' }}>{'$E[X] = p_v \\cdot V + p_d \\cdot (-V) + p_e \\cdot 0$'}</p>
                            <p style={{ fontSize: '0.75em' }}>{'$\\boxed{E[X] = V(p_v - p_d)}$'}</p>
                        </figure>
                    </article>

                    <article className="flex flex-col text-left flex-1">
                        <p>Probabilidades Reais com Estratégia Básica, em função do valor V</p>
                        <figure className="flex flex-col items-start">
                            <ul className="flex flex-col gap-1">
                                <li>
                                    <strong>Vitória:</strong> <span style={{ fontSize: '0.75em' }}>{'$+V$'}</span> (p<sub>v</sub> = 42.22%)
                                </li>
                                <li>
                                    <strong>Derrota:</strong> <span style={{ fontSize: '0.75em' }}>{'$-V$'}</span> (p<sub>d</sub> = 49.10%)
                                </li>
                                <li>
                                    <strong>Empate:</strong> <span style={{ fontSize: '0.75em' }}>{'$0$'}</span> (p<sub>e</sub> = 8.48%)
                                </li>
                            </ul>
                        </figure>
                    </article>
                </div>

                <div className="flex flex-col gap-8 items-center justify-center">
                    <article className="flex flex-col text-center flex-1">
                        <p style={{ fontSize: '0.75em' }}>
                            {`
                                \\[
                                    \\begin{aligned}
                                        E[X] &= V(p_v - p_d) \\\\
                                        &= V(0.4222 - 0.4910) \\\\
                                        &= V(-0.0688) \\\\
                                        &\\approx \\boxed{-6.9\\% \\cdot V}
                                    \\end{aligned}
                                \\]
                            `}
                        </p>
                        <p>Perda média de 6.9% por aposta no longo prazo.</p>
                    </article>
                </div>

                <div className="flex flex-col text-left text-sm">
                    <strong>Fontes:</strong>
                    <ul>
                        <li>
                            Wizard of Odds:{' '}
                            <a href="https://wizardofodds.com/ask-the-wizard/blackjack/probability/" target="_blank" rel="noopener noreferrer">
                                wizardofodds.com/ask-the-wizard/blackjack/probability/
                            </a>
                        </li>
                        <li>
                            Casino.us:{' '}
                            <a href="https://www.casino.us/blackjack/odds/" target="_blank" rel="noopener noreferrer">
                                casino.us/blackjack/odds/
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

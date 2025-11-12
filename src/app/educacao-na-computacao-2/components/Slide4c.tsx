import Image from 'next/image';

export default function Slide4c() {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-col items-start mb-10">
                <h3>
                    A Favorable Strategy for Twenty-One
                </h3>
            </div>

            <div className="flex flex-row gap-8 items-start">
                <div>
                    <Image
                        src="/img-01-cover.png"
                        alt="A Favorable Strategy for Twenty-One by Edward Thorp"
                        width={450}
                        height={450}
                    />
                </div>
                <article className="flex flex-col gap-4 text-left flex-1">
                    <div>
                        <h4>Contexto Histórico (1961)</h4>
                        <p className="text-[0.66em]">
                            Edward Thorp, matemático do MIT, usou um computador IBM 704 para provar
                            matematicamente que o blackjack pode ser vencido através da contagem de cartas,
                            publicando seus resultados em 1961 no prestigiado periódico Proceedings of the
                            National Academy of Sciences.
                        </p>
                    </div>

                    <div>
                        <h4>Descoberta Principal</h4>
                        <p className="text-[0.66em]">
                            Thorp descobriu que quando certas cartas saem do baralho, o jogador
                            ganha <strong>vantagem matemática</strong> sobre o cassino:
                        </p>
                        <ul className="flex flex-col text-[0.66em] list-disc list-inside">
                            <li>Sem 5s no baralho: <strong>+3.29%</strong> de vantagem</li>
                            <li>Muitas cartas 10: <strong>+3.94%</strong> de vantagem</li>
                            <li>Rastreando cartas &quot;tens&quot;: vantagem em <strong>~50%</strong> das situações</li>
                        </ul>
                    </div>

                </article>
            </div>
        </section>
    );
}

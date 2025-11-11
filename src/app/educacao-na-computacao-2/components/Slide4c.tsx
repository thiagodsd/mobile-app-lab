export default function Slide4c() {
  return (
    <section className="flex flex-col gap-4">
      <h2>Contagem de Cartas: Contexto Histórico</h2>

      <div className="flex flex-row gap-8 items-start">
        <figure className="flex justify-center">
          <img
            src="/img-01-cover.png"
            alt="A Favorable Strategy for Twenty-One by Edward Thorp"
            width="400"
            height="520"
            loading="lazy"
          />
        </figure>

        <article className="flex flex-col gap-4 text-left flex-1">
          <div>
            <h3>Contexto Histórico (1961)</h3>
          <p>
            Edward Thorp, matemático do MIT, usou um computador IBM 704 para provar
            matematicamente que o blackjack pode ser vencido através da contagem de cartas,
            publicando seus resultados em 1961 no prestigiado periódico Proceedings of the
            National Academy of Sciences.
          </p>
        </div>

        <div>
          <h3>Descoberta Principal</h3>
          <p>
            Thorp descobriu que quando certas cartas saem do baralho, o jogador
            ganha <strong>vantagem matemática</strong> sobre o cassino:
          </p>
          <ul>
            <li>Sem 5s no baralho: <strong>+3.29%</strong> de vantagem</li>
            <li>Muitas cartas 10: <strong>+3.94%</strong> de vantagem</li>
            <li>Rastreando cartas "tens": vantagem em <strong>~50%</strong> das situações</li>
          </ul>
        </div>

        <div>
          <h3>Estratégia Hi-Lo Simplificada</h3>
          <p>Sistema de contagem mais popular:</p>
          <dl>
            <dt><strong>2 a 6:</strong></dt>
            <dd>+1</dd>
            <dt><strong>7 a 9:</strong></dt>
            <dd>0</dd>
            <dt><strong>10 a A:</strong></dt>
            <dd>-1</dd>
          </dl>
          <ul>
            <li>Contagem positiva = vantagem do jogador &rarr; aposte mais</li>
            <li>Contagem negativa = vantagem da casa &rarr; aposte mínimo</li>
          </ul>
        </div>
        </article>
      </div>
    </section>
  );
}

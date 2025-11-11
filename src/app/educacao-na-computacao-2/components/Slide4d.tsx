export default function Slide4d() {
  return (
    <section>
      <h3>Exemplo: Sistema Hi-Lo em Ação</h3>

      <p>Conte TODAS as cartas visíveis na mesa (suas cartas + dealer + outros jogadores)</p>

      <dl>
        <dt><strong>2-6:</strong></dt>
        <dd>+1</dd>
        <dt><strong>7-9:</strong></dt>
        <dd>0</dd>
        <dt><strong>10-A:</strong></dt>
        <dd>-1</dd>
      </dl>

      <ol>
        <li>
          <p><strong>Rodada 1:</strong> (cartas visíveis na mesa)</p>
          <p>
            <span>5&spades;</span>
            <span> K&hearts;</span>
            <span> 3&diams;</span>
            <span> 9&clubs;</span>
          </p>
          <p>+1 - 1 + 1 + 0 = <strong>+1</strong></p>
        </li>

        <li>
          <p><strong>Rodada 2:</strong></p>
          <p>
            <span>A&spades;</span>
            <span> 2&hearts;</span>
            <span> Q&diams;</span>
            <span> 4&clubs;</span>
          </p>
          <p>-1 + 1 - 1 + 1 = <strong>0</strong></p>
        </li>

        <li>
          <p><strong>Rodada 3:</strong></p>
          <p>
            <span>6&hearts;</span>
            <span> 2&spades;</span>
            <span> 5&clubs;</span>
            <span> 3&diams;</span>
          </p>
          <p>+1 + 1 + 1 + 1 = <strong>+4</strong></p>
        </li>
      </ol>

      <aside>
        <p><strong>Contagem Acumulada Total:</strong></p>
        <p>+5</p>
        <p>Contagem positiva &rarr; Vantagem do jogador &rarr; Aumente a aposta</p>
      </aside>
    </section>
  );
}

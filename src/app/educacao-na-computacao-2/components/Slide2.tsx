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

export default function Slide2() {
  return (
    <section className="flex flex-col gap-4">
      <h2>Vamos jogar!</h2>
      <p>
        <a
          href="/simple-blackjack"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jogar Blackjack
        </a>
      </p>
      {/* As 3 Regras Essenciais */}
      <div className="fragment fade-in grid grid-cols-3 gap-6 w-full">
        {/* Regra 1: Objetivo */}
        <div className="border-2 border-gray-800 rounded p-6">
          <h4 className="text-xl font-semibold mb-4 text-center">1. Objetivo</h4>
          <p style={{ fontSize: '0.66em' }} className="mb-4 text-center">
            Chegar o mais próximo de <strong>21 pontos</strong> sem estourar
          </p>

          {/* Exemplo visual */}
          <div className="flex flex-col gap-3 items-center">
            <div className="flex gap-2 justify-center">
              <MiniCard rank="K" suit="♠" />
              <MiniCard rank="9" suit="♥" />
            </div>
            <div style={{ fontSize: '0.66em' }} className="text-center">
              <p className="font-semibold text-green-700">K + 9 = 19 ✅ Boa mão!</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 items-center mt-4">
            <div className="flex gap-2 justify-center">
              <MiniCard rank="K" suit="♣" />
              <MiniCard rank="Q" suit="♦" />
              <MiniCard rank="5" suit="♠" />
            </div>
            <div style={{ fontSize: '0.66em' }} className="text-center">
              <p className="font-semibold text-red-700">K + Q + 5 = 25 💥 Estourou!</p>
            </div>
          </div>
        </div>

        {/* Regra 2: Valores das Cartas */}
        <div className="border-2 border-gray-800 rounded p-6">
          <h4 className="text-xl font-semibold mb-4 text-center">2. Valores</h4>

          <div className="space-y-3">
            {/* Ás */}
            <div className="flex items-center gap-2">
              <MiniCard rank="A" suit="♥" />
              <div style={{ fontSize: '0.66em' }}>
                <p className="font-semibold">Ás = 11 ou 1</p>
                <p className="text-gray-600 text-xs">Ajusta automaticamente</p>
              </div>
            </div>

            {/* Figuras */}
            <div className="flex items-center gap-2">
              <MiniCard rank="K" suit="♦" />
              <div style={{ fontSize: '0.66em' }}>
                <p className="font-semibold">J, Q, K = 10</p>
              </div>
            </div>

            {/* Números */}
            <div className="flex items-center gap-2">
              <MiniCard rank="7" suit="♠" />
              <div style={{ fontSize: '0.66em' }}>
                <p className="font-semibold">2 a 10 = valor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Regra 3: Dealer */}
        <div className="border-2 border-gray-800 rounded p-6">
          <h4 className="text-xl font-semibold mb-4 text-center">3. Dealer</h4>
          <p style={{ fontSize: '0.66em' }} className="mb-4 text-center">
            Segue <strong>regras fixas</strong>
          </p>

          <div className="space-y-3">
            <div className="border border-gray-300 rounded p-3">
              <div className="flex gap-2 justify-center mb-2">
                <MiniCard rank="10" suit="♣" />
                <MiniCard rank="5" suit="♥" />
              </div>
              <p style={{ fontSize: '0.66em' }} className="text-center">
                10 + 5 = <strong>15</strong>
              </p>
              <p style={{ fontSize: '0.6em' }} className="text-center text-gray-600">
                {'< 17 → Obrigado a comprar'}
              </p>
            </div>

            <div className="border border-gray-300 rounded p-3">
              <div className="flex gap-2 justify-center mb-2">
                <MiniCard rank="10" suit="♦" />
                <MiniCard rank="8" suit="♠" />
              </div>
              <p style={{ fontSize: '0.66em' }} className="text-center">
                10 + 8 = <strong>18</strong>
              </p>
              <p style={{ fontSize: '0.6em' }} className="text-center text-gray-600">
                {'≥ 17 → Obrigado a parar'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}

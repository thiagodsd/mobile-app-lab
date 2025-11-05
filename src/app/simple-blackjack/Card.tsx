import { Card as CardType } from './types';

interface CardProps {
  card: CardType;
  hidden?: boolean;
}

export default function Card({ card, hidden = false }: CardProps) {
  const isRed = card.suit === '♥' || card.suit === '♦';

  if (hidden) {
    return (
      <div className="w-24 h-32 bg-gray-800 border border-gray-600 rounded flex items-center justify-center">
        <div className="text-gray-600 text-3xl">?</div>
      </div>
    );
  }

  return (
    <div className="w-24 h-32 bg-white border-2 border-gray-800 rounded relative">
      {/* Naipe no canto superior esquerdo */}
      <div className={`absolute top-1.5 left-1.5 text-3xl leading-none ${isRed ? 'text-red-600' : 'text-black'}`}>
        {card.suit}
      </div>

      {/* Número grande no canto inferior direito */}
      <div className={`absolute bottom-1 right-1 text-[64px] leading-none font-light ${isRed ? 'text-red-600' : 'text-black'}`}>
        {card.rank}
      </div>
    </div>
  );
}

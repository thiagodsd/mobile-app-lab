'use client';

import { motion } from 'framer-motion';
import { Card as CardType } from './types';

interface CardProps {
  card: CardType;
  hidden?: boolean;
  index?: number;
}

export default function Card({ card, hidden = false, index = 0 }: CardProps) {
  const isRed = card.suit === '♥' || card.suit === '♦';

  if (hidden) {
    return (
      <motion.div
        className="w-24 h-32 bg-gray-800 border border-gray-600 rounded flex items-center justify-center"
        initial={{ scale: 0, rotateY: 180 }}
        animate={{ scale: 1, rotateY: 0 }}
        transition={{
          delay: index * 0.15,
          duration: 0.5,
          type: 'spring',
          stiffness: 200,
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="text-gray-600 text-3xl">?</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-24 h-32 bg-white border-2 border-gray-800 rounded relative"
      initial={{ scale: 0, opacity: 0, y: -20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.15,
        duration: 0.4,
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      {/* Naipe no canto superior esquerdo */}
      <motion.div
        className={`absolute top-1.5 left-1.5 text-3xl leading-none font-serif ${isRed ? 'text-red-600' : 'text-black'}`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.15 + 0.3 }}
      >
        {card.suit}
      </motion.div>

      {/* Número grande no canto inferior direito */}
      <motion.div
        className={`absolute bottom-1 right-1 text-[64px] leading-none font-serif ${isRed ? 'text-red-600' : 'text-black'}`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.15 + 0.3 }}
      >
        {card.rank}
      </motion.div>
    </motion.div>
  );
}

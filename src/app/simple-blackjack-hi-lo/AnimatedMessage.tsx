'use client';

import { motion, AnimatePresence } from 'framer-motion';

export type MessageType = 'success' | 'error' | 'warning' | 'info';

interface AnimatedMessageProps {
  message: string;
  type: MessageType;
  show?: boolean;
}

const messageConfig = {
  success: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-500',
  },
  error: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-500',
  },
  warning: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-500',
  },
  info: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-500',
  },
};

const getAnimationVariant = (type: MessageType) => {
  switch (type) {
    case 'success':
      return {
        initial: { scale: 0, opacity: 0, y: 20 },
        animate: { scale: 1, opacity: 1, y: 0 },
        transition: {
          type: 'spring' as const,
          bounce: 0.6,
          duration: 0.8,
        },
        exit: { scale: 0, opacity: 0 },
      };
    case 'error':
      return {
        initial: { scale: 0, opacity: 0 },
        animate: {
          scale: 1,
          opacity: 1,
          x: [0, -10, 10, -10, 10, 0],
        },
        transition: {
          scale: { type: 'spring' as const, stiffness: 300 },
          x: { duration: 0.5, delay: 0.2 },
        },
        exit: { scale: 0, opacity: 0 },
      };
    case 'warning':
      return {
        initial: { scale: 0, opacity: 0, rotate: -5 },
        animate: { scale: 1, opacity: 1, rotate: 0 },
        transition: {
          type: 'spring' as const,
          stiffness: 200,
        },
        exit: { scale: 0, opacity: 0 },
      };
    default:
      return {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        exit: { opacity: 0, y: -10 },
      };
  }
};

export default function AnimatedMessage({ message, type, show = true }: AnimatedMessageProps) {
  const config = messageConfig[type];
  const variants = getAnimationVariant(type);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key={message}
          className={`p-6 rounded-lg border-2 ${config.bg} ${config.border} ${config.text}`}
          {...variants}
        >
          <div className="flex items-center justify-center">
            <motion.p
              className="text-xl font-light text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {message}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

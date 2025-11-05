'use client';

import { useState } from 'react';

interface NicknameInputProps {
  onSubmit: (nickname: string) => void;
}

export default function NicknameInput({ onSubmit }: NicknameInputProps) {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (nickname.trim().length < 2) {
      setError('O apelido deve ter pelo menos 2 caracteres');
      return;
    }

    if (nickname.trim().length > 20) {
      setError('O apelido deve ter menos de 20 caracteres');
      return;
    }

    onSubmit(nickname.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
        <h1 className="text-8xl font-light text-black mb-2 text-center">21</h1>
        <p className="text-gray-600 mb-8 text-center font-light">Digite seu apelido para começar</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setError('');
              }}
              placeholder="Seu apelido"
              className="w-full px-4 py-3 border-2 border-gray-800 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:border-gray-600 font-light"
            />
            {error && <p className="text-red-600 text-sm mt-2 font-light">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors font-light"
          >
            Começar a Jogar
          </button>
        </form>

        <div className="mt-8 p-4 border border-gray-300 rounded">
          <h2 className="text-sm font-medium text-black mb-2">Regras do Jogo</h2>
          <ul className="text-xs text-gray-600 space-y-1 font-light">
            <li>• Saldo inicial: $100</li>
            <li>• Máximo de 10 rodadas</li>
            <li>• Baralho único, sem embaralhar</li>
            <li>• Dealer para em 17</li>
            <li>• Blackjack paga 2:1</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConhecimentoPrevio() {
  const [selectedStats, setSelectedStats] = useState<string>('');
  const [selectedWhere, setSelectedWhere] = useState<string[]>([]);
  const [responseCount, setResponseCount] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Fetch response count from API
  const fetchResponseCount = async () => {
    try {
      const response = await fetch('/api/conhecimento-previo');
      if (response.ok) {
        const data = await response.json();
        const newCount = data.count || 0;
        if (newCount !== responseCount) {
          setResponseCount(newCount);
        }
      }
    } catch (error) {
      console.error('Error fetching response count:', error);
    }
  };

  // Initial fetch and then poll every 3 seconds for real-time updates
  useEffect(() => {
    fetchResponseCount();

    const interval = setInterval(fetchResponseCount, 3000); // Poll every 3 seconds for real-time feel

    return () => clearInterval(interval);
  }, [responseCount]);

  const toggleWhere = (option: string) => {
    setSelectedWhere(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = async () => {
    // Allow submission if selectedStats is "Não" without needing selectedWhere
    if (!selectedStats || isSubmitting) return;
    if (selectedStats !== 'Não' && selectedWhere.length === 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/conhecimento-previo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estudouEstatistica: selectedStats,
          onde: selectedStats === 'Não' ? ['N/A'] : selectedWhere,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseCount(data.newCount || responseCount + 1);
        setIsSubmitted(true);
      } else {
        const error = await response.json();
        alert(error.error || 'Erro ao salvar resposta. Tente novamente.');
      }
    } catch (error) {
      console.error('Error submitting response:', error);
      alert('Erro ao salvar resposta. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <motion.div
          className="max-w-4xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-center mb-6">
              <motion.div
                className="w-16 h-16 rounded-full bg-green-700 flex items-center justify-center flex-shrink-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <motion.div
                className="ml-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-light text-gray-800 mb-2">
                  Obrigado!
                </h2>
                <p className="text-gray-600">
                  Sua resposta foi registrada com sucesso.
                </p>
              </motion.div>
            </div>
            <motion.div
              className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pessoas que já responderam</span>
                <motion.span
                  key={responseCount}
                  className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ scale: 1.3, rotate: 5 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  {responseCount}
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <motion.div
        className="max-w-4xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-3xl font-light text-gray-800 mb-2">
              Conhecimento Prévio
            </h1>
            <div className="w-12 h-px bg-gray-200"></div>
          </motion.div>

          {/* Question 1 */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-700 mb-4">
              Você já estudou estatística antes?
            </p>
            <div className="space-y-3">
              {['Sim', 'Não', 'Alguns assuntos'].map((option, index) => (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => setSelectedStats(option)}
                  className={`w-full p-3 rounded-2xl border transition-all duration-200 text-left ${
                    selectedStats === option
                      ? 'border-blue-400 bg-blue-50 text-blue-700 font-semibold shadow-sm'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25 hover:text-blue-600 text-gray-600'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      selectedStats === option
                        ? 'border-blue-400 bg-blue-400'
                        : 'border-gray-300'
                    }`}>
                      {selectedStats === option && (
                        <motion.div
                          className="w-full h-full rounded-full bg-white scale-50"
                          initial={{ scale: 0 }}
                          animate={{ scale: 0.5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                      )}
                    </div>
                    {option}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Question 2 - Only show if first question is answered and not "Não" */}
          <AnimatePresence>
            {selectedStats && selectedStats !== 'Não' && (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-700 mb-4">
                  Onde?
                </p>
                <div className="space-y-3">
                  {['Trabalho', 'Educação', 'Hobby', 'Família'].map((option, index) => (
                    <motion.button
                      key={option}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => toggleWhere(option)}
                      className={`w-full p-3 rounded-2xl border transition-all duration-200 text-left ${
                        selectedWhere.includes(option)
                          ? 'border-green-400 bg-green-50 text-green-700 font-semibold shadow-sm'
                          : 'border-gray-200 hover:border-green-300 hover:bg-green-25 hover:text-green-600 text-gray-600'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-sm border-2 mr-3 flex items-center justify-center ${
                          selectedWhere.includes(option)
                            ? 'border-green-400 bg-green-400'
                            : 'border-gray-300'
                        }`}>
                          {selectedWhere.includes(option) && (
                            <motion.svg
                              className="w-3 h-3 text-white"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </motion.svg>
                          )}
                        </div>
                        {option}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button - Always visible but enabled based on answers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button
              onClick={handleSubmit}
              disabled={!selectedStats || isSubmitting || (selectedStats !== 'Não' && selectedWhere.length === 0)}
              className={`w-full p-4 rounded-2xl font-semibold transition-all duration-200 ${
                !selectedStats || isSubmitting || (selectedStats !== 'Não' && selectedWhere.length === 0)
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-900 hover:shadow-lg'
              }`}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Respostas'}
            </button>
          </motion.div>

          {/* Footer - Real-time counter */}
          <motion.div
            className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Pessoas que já responderam</p>
              <motion.div
                key={responseCount}
                className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ scale: 1.3, rotate: 5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {responseCount}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
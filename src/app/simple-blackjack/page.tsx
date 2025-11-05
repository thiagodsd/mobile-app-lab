'use client';

import dynamic from 'next/dynamic';

const BlackjackClient = dynamic(() => import('./BlackjackClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
        <p className="text-gray-600 font-light">Loading...</p>
      </div>
    </div>
  ),
});

export default function BlackjackPage() {
  return <BlackjackClient />;
}

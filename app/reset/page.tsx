'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ResetPage() {
  const [message, setMessage] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    if (!confirm('Biztosan törölni szeretnéd az összes választást? Ez nem vonható vissza!')) {
      return;
    }

    setIsResetting(true);
    setMessage('');

    try {
      const response = await fetch('/api/reset', {
        method: 'POST'
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Sikeres! A játék újraindult, minden választás törölve.');
      } else {
        setMessage('❌ Hiba történt: ' + data.error);
      }
    } catch (error) {
      setMessage('❌ Hiba történt a törlés során');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-green-900">
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">
              🔄 Játék Újraindítása
            </h1>
            <p className="text-lg text-red-100 drop-shadow">
              Töröld az összes választást és kezdd újra
            </p>
          </div>

          <div className="rounded-3xl bg-white/95 p-8 shadow-2xl backdrop-blur space-y-6">
            <div className="space-y-4 text-gray-700">
              <p className="text-center">
                Ez az oldal törli az összes résztvevő választását.
              </p>
              <p className="text-center font-semibold text-red-600">
                ⚠️ Ez a művelet nem vonható vissza!
              </p>
            </div>

            <button
              onClick={handleReset}
              disabled={isResetting}
              className="w-full rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 text-xl font-bold text-white shadow-lg transition-all hover:from-red-700 hover:to-red-800 hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
            >
              {isResetting ? 'Törlés... ⏳' : 'Összes Választás Törlése 🗑️'}
            </button>

            {message && (
              <div className="rounded-xl bg-gray-100 p-4 text-center">
                <p className="text-base font-medium text-gray-800">
                  {message}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <Link
                href="/"
                className="block w-full rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-8 py-4 text-xl font-bold text-white text-center shadow-lg transition-all hover:from-green-700 hover:to-green-800 hover:shadow-xl"
              >
                ← Vissza a Főoldalra
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useState } from 'react';

const PARTICIPANTS = [
  'Alice',
  'Bob',
  'Charlie',
  'Diana',
  'Eve',
  'Frank',
  'Grace',
  'Henry'
];

export default function Home() {
  const [selectedName, setSelectedName] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [pickedName, setPickedName] = useState('');
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (!selectedName) {
      alert('Kérlek, válaszd ki a neved először!');
      return;
    }

    setIsSpinning(true);
    setPickedName('');

    const availableNames = PARTICIPANTS.filter(name => name !== selectedName);
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    const picked = availableNames[randomIndex];

    const spins = 5 + Math.random() * 3;
    const newRotation = rotation + (spins * 360);
    setRotation(newRotation);

    setTimeout(() => {
      setPickedName(picked);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-green-900">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl">❄️</div>
        <div className="absolute top-20 right-20 text-6xl">⭐</div>
        <div className="absolute top-40 left-1/4 text-5xl">🎄</div>
        <div className="absolute top-60 right-1/3 text-7xl">❄️</div>
        <div className="absolute bottom-20 left-20 text-6xl">🎁</div>
        <div className="absolute bottom-40 right-10 text-8xl">⭐</div>
        <div className="absolute bottom-10 left-1/2 text-5xl">🎄</div>
      </div>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl space-y-8 text-center">
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-white drop-shadow-lg">
              👼 Titkos Jézuska 🎄
            </h1>
            <p className="text-xl text-red-100 drop-shadow">
              Pörgetesd meg a kereket, hogy megtudd, kinek ajándékozol!
            </p>
          </div>

          <div className="rounded-3xl bg-white/95 p-8 shadow-2xl backdrop-blur">
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name-select" className="block text-lg font-semibold text-red-800">
                  Válaszd ki a neved
                </label>
                <select
                  id="name-select"
                  value={selectedName}
                  onChange={(e) => setSelectedName(e.target.value)}
                  className="w-full rounded-xl border-2 border-red-300 bg-white px-4 py-3 text-lg text-gray-800 shadow-sm transition-all hover:border-red-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  disabled={isSpinning}
                >
                  <option value="">Válassz nevet...</option>
                  {PARTICIPANTS.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-center py-8">
                <div
                  className="relative h-48 w-48 transition-transform duration-3000 ease-out"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 via-green-500 to-red-600 shadow-2xl">
                    <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                      <span className="text-6xl">
                        {isSpinning ? '🎁' : pickedName ? '✨' : '👼'}
                      </span>
                    </div>
                  </div>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-4xl">
                    👼
                  </div>
                </div>
              </div>

              <button
                onClick={handleSpin}
                disabled={isSpinning || !selectedName}
                className="w-full rounded-xl bg-gradient-to-r from-red-600 to-green-600 px-8 py-4 text-xl font-bold text-white shadow-lg transition-all hover:from-red-700 hover:to-green-700 hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
              >
                {isSpinning ? 'Pörgetés... 🎄' : 'Pörgesd meg a kereket! 👼'}
              </button>

              {pickedName && !isSpinning && (
                <div className="animate-bounce space-y-2 rounded-xl bg-gradient-to-r from-green-100 to-red-100 p-6 shadow-inner">
                  <p className="text-lg font-semibold text-green-800">
                    ✨ Te neki ajándékozol:
                  </p>
                  <p className="text-4xl font-bold text-red-700">
                    {pickedName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Tartsd titokban! 🤫
                  </p>
                </div>
              )}
            </div>
          </div>

          <p className="text-sm text-red-100 drop-shadow">
            ✨ Boldog karácsonyt kívánunk! ✨
          </p>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

interface Pick {
  giver: string;
  receiver: string;
  timestamp: string;
}

interface DebugData {
  completeAssignment: Record<string, string> | null;
  actualPicks: Pick[];
}

export default function DebugPage() {
  const [data, setData] = useState<DebugData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/debug")
      .then((res) => res.json())
      .then((debugData) => {
        setData(debugData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading debug data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-gray-800">
            Loading debug data...
          </h1>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-red-600">
            Error loading debug data
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-4xl font-bold text-gray-800">Debug Information</h1>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            Complete Assignment (Generated at Build Time)
          </h2>
          {data.completeAssignment ? (
            <div className="space-y-2">
              {Object.entries(data.completeAssignment).map(
                ([giver, receiver]) => (
                  <div
                    key={giver}
                    className="flex items-center justify-between rounded border border-gray-200 p-3"
                  >
                    <span className="font-medium text-gray-800">{giver}</span>
                    <span className="text-gray-500">→</span>
                    <span className="font-medium text-green-600">
                      {receiver}
                    </span>
                  </div>
                ),
              )}
            </div>
          ) : (
            <p className="text-gray-500">No complete assignment available</p>
          )}
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            Actual Picks Made ({data.actualPicks.length})
          </h2>
          {data.actualPicks.length > 0 ? (
            <div className="space-y-2">
              {data.actualPicks.map((pick, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded border border-gray-200 p-3"
                >
                  <span className="font-medium text-gray-800">
                    {pick.giver}
                  </span>
                  <span className="text-gray-500">→</span>
                  <span className="font-medium text-blue-600">
                    {pick.receiver}
                  </span>
                  <span className="text-sm text-gray-400">
                    {new Date(pick.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No picks made yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

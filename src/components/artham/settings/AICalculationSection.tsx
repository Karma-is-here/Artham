import { useState } from "react";

export function AICalculationSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border-2 border-[#F4B400]/30 rounded-xl shadow-sm bg-gradient-to-br from-white to-[#F4B400]/5 animate-fadeIn">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F4B400"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
            </svg>
            <h3 className="text-slate-900">How Artham calculates your vaults</h3>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-checkmark"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            </svg>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-3 py-2 text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-colors"
          >
            {expanded ? (
              <>
                Hide Details
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </>
            ) : (
              <>
                Show Details
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-6 space-y-4 animate-expandDown">
          <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm space-y-3">
            <div>
              <p className="text-[#F4B400] mb-2">📥 Inputs:</p>
              <ul className="text-slate-700 space-y-1 ml-4">
                <li>• I = total monthly income</li>
                <li>• R = risk factor (10% → conservative, 20% → balanced, 40% → aggressive)</li>
                <li>• P = user preferred vault split (Spend%, Save%, Grow%, Protect%)</li>
              </ul>
            </div>

            <div>
              <p className="text-[#1C8B82] mb-2">🧮 Calculations:</p>
              <ul className="text-slate-700 space-y-1 ml-4">
                <li>• Spend = I × P.spend</li>
                <li>• Save = I × P.save</li>
                <li>• Grow = I × P.grow × (1 + R)</li>
                <li>• Protect = I × P.protect</li>
              </ul>
            </div>

            <div>
              <p className="text-green-600 mb-2">✅ Validation:</p>
              <ul className="text-slate-700 space-y-1 ml-4">
                <li>• Sum(Spend + Save + Grow + Protect) ≈ I</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 flex-shrink-0"
            >
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
            </svg>
            <p className="text-blue-900">
              Artham uses this logic to adapt to your habits — safer profiles get more
              Protect allocation, aggressive ones invest more in Grow.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg animate-scaleIn">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            </svg>
            <p className="text-green-900">
              AI calculation complete! Your personalized vaults are ready.
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes expandDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 1000px; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes checkmark {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-expandDown {
          animation: expandDown 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out 0.2s both;
        }
        .animate-checkmark {
          animation: checkmark 0.3s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
}

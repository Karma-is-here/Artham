import { useState, useEffect } from "react";

export function TransitionAnimation() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C8B82]/10 via-white to-[#F4B400]/10 flex items-center justify-center">
      <div className="max-w-md w-full mx-4 animate-scaleIn">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Animated Icon */}
          <div className="flex justify-center">
            <div className="relative animate-rotate">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1C8B82] to-[#F4B400] flex items-center justify-center animate-pulse">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  <path d="M5 3v4" />
                  <path d="M19 17v4" />
                  <path d="M3 5h4" />
                  <path d="M17 19h4" />
                </svg>
              </div>
              
              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-rotateReverse">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#F4B400] rounded-full" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1C8B82] rounded-full" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#F4B400] rounded-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#1C8B82] rounded-full" />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="text-center space-y-2">
            <h2 className="text-slate-900">Preparing Your Dashboard</h2>
            <p className="text-slate-600">
              Calculating your ArthaScore and organizing your personalized vaults...
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300 bg-gradient-to-r from-[#1C8B82] to-[#F4B400]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-slate-500">{progress}%</p>
          </div>

          {/* Loading Steps */}
          <div className="space-y-2">
            <div
              className="flex items-center gap-2 text-slate-600 transition-opacity duration-300"
              style={{ opacity: progress > 20 ? 1 : 0.3 }}
            >
              {progress > 20 ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1C8B82"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
              <span>Analyzing your financial data</span>
            </div>

            <div
              className="flex items-center gap-2 text-slate-600 transition-opacity duration-300"
              style={{ opacity: progress > 50 ? 1 : 0.3 }}
            >
              {progress > 50 ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1C8B82"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
              <span>Computing your ArthaScore</span>
            </div>

            <div
              className="flex items-center gap-2 text-slate-600 transition-opacity duration-300"
              style={{ opacity: progress > 80 ? 1 : 0.3 }}
            >
              {progress > 80 ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1C8B82"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
              <span>Setting up your personalized dashboard</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotateReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }
        .animate-rotate {
          animation: rotate 2s linear infinite;
        }
        .animate-rotateReverse {
          animation: rotateReverse 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

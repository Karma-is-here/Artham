import { useState, useEffect } from "react";

interface VaultChange {
  name: string;
  icon: string;
  currentAmount: number;
  newAmount: number;
  change: number;
  color: string;
}

interface ImpactPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  changes: VaultChange[];
  title: string;
  description: string;
  onApply?: () => void;
}

function RollingNumber({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    const startTime = Date.now();
    const startValue = 0;
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const value = startValue + (target - startValue) * easeOut;
      
      setCurrent(Math.round(value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, [target, duration]);
  
  return <span>₹{current.toLocaleString()}</span>;
}

export function ImpactPreviewModal({
  isOpen,
  onClose,
  changes,
  title,
  description,
  onApply,
}: ImpactPreviewModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsAnimating(true), 300);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] pointer-events-auto animate-scale-in overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-[#1C8B82] to-[#128173] text-white px-8 py-6 flex-shrink-0">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <h2 className="text-white">{title}</h2>
                <p className="text-white/90">{description}</p>
              </div>
              <button
                onClick={onClose}
                className="ml-4 w-8 h-8 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center flex-shrink-0"
                aria-label="Close preview"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M5 5L15 15M5 15L15 5" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Content - Scrollable */}
          <div className="p-8 space-y-6 overflow-y-auto flex-1">
            {/* Visual Comparison */}
            <div className="space-y-4">
              {changes.map((vault, index) => (
                <div
                  key={vault.name}
                  className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6 animate-slide-up"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'backwards'
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                        style={{
                          backgroundColor: `${vault.color}20`,
                        }}
                      >
                        {vault.icon}
                      </div>
                      <div>
                        <h3 className="text-slate-900">{vault.name} Vault</h3>
                        <p className="text-slate-600">
                          {vault.change > 0 ? "↑" : vault.change < 0 ? "↓" : "→"}{" "}
                          {Math.abs(vault.change)}% change
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Amount Visualization */}
                  <div className="flex items-center gap-4">
                    {/* Current Amount */}
                    <div className="flex-1 bg-white border border-slate-200 rounded-lg p-4">
                      <p className="text-slate-500 mb-1">Current</p>
                      <p className="text-slate-700">
                        ₹{vault.currentAmount.toLocaleString()}
                      </p>
                    </div>
                    
                    {/* Arrow */}
                    <div
                      className={`flex-shrink-0 text-2xl ${
                        vault.change > 0
                          ? "text-green-500"
                          : vault.change < 0
                          ? "text-orange-500"
                          : "text-slate-400"
                      }`}
                    >
                      →
                    </div>
                    
                    {/* New Amount with Rolling Animation */}
                    <div
                      className="flex-1 rounded-lg p-4"
                      style={{
                        backgroundColor: `${vault.color}10`,
                        border: `2px solid ${vault.color}40`,
                      }}
                    >
                      <p className="text-slate-500 mb-1">Projected</p>
                      <p
                        className="text-2xl transition-all duration-300"
                        style={{ color: vault.color }}
                      >
                        {isAnimating ? (
                          <RollingNumber target={vault.newAmount} duration={1800} />
                        ) : (
                          `₹${vault.currentAmount.toLocaleString()}`
                        )}
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-slate-600">
                      <span>Optimization Progress</span>
                      <span>{Math.abs(vault.change)}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isAnimating ? `${Math.abs(vault.change) * 10}%` : "0%",
                          backgroundColor: vault.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Summary Card */}
            <div className="bg-gradient-to-br from-[#1C8B82]/10 to-[#F4B400]/10 border border-[#1C8B82]/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1C8B82] to-[#F4B400] flex items-center justify-center text-white flex-shrink-0">
                  ✓
                </div>
                <div className="flex-1">
                  <h3 className="text-slate-900 mb-2">What This Means</h3>
                  <p className="text-slate-700">
                    By making these adjustments, you'll optimize your financial allocation
                    while maintaining balance across all your vaults. This is a gentle
                    shift that can help you reach your goals faster 🌱
                  </p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                Maybe Later
              </button>
              <button
                className="flex-1 px-6 py-3 rounded-full bg-gradient-to-br from-[#1C8B82] to-[#128173] text-white hover:shadow-lg transition-all"
                onClick={() => {
                  if (onApply) {
                    onApply();
                  }
                  onClose();
                }}
              >
                {onApply ? "Apply Changes ✨" : "Got it! 👍"}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 200ms ease-out;
        }
        
        .animate-scale-in {
          animation: scaleIn 300ms ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 400ms ease-out;
        }
      `}</style>
    </>
  );
}

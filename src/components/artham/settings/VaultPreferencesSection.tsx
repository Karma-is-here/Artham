import { useState } from "react";
import { VaultPreferences } from "../../../types/artham";

interface VaultPreferencesSectionProps {
  preferences: VaultPreferences;
  onUpdatePreferences: (preferences: VaultPreferences) => void;
}

const VAULT_COLORS = {
  spend: "#1C8B82",
  save: "#F4B400",
  grow: "#10b981",
  protect: "#3b82f6",
};

const VAULT_LABELS = {
  spend: "Spend 💸",
  save: "Save 💰",
  grow: "Grow 📈",
  protect: "Protect 🛡️",
};

export function VaultPreferencesSection({ preferences, onUpdatePreferences }: VaultPreferencesSectionProps) {
  const [localPrefs, setLocalPrefs] = useState(preferences);

  // Calculate total
  const total = localPrefs.spend + localPrefs.save + localPrefs.grow + localPrefs.protect;
  const isValid = total === 100;

  const handleSliderChange = (vault: keyof VaultPreferences, value: number) => {
    const newPrefs = {
      ...localPrefs,
      [vault]: value,
    };
    setLocalPrefs(newPrefs);
    
    // Only update parent if total is 100
    const newTotal = newPrefs.spend + newPrefs.save + newPrefs.grow + newPrefs.protect;
    if (newTotal === 100) {
      onUpdatePreferences(newPrefs);
    }
  };

  const chartData = [
    { name: "Spend", value: localPrefs.spend, color: VAULT_COLORS.spend },
    { name: "Save", value: localPrefs.save, color: VAULT_COLORS.save },
    { name: "Grow", value: localPrefs.grow, color: VAULT_COLORS.grow },
    { name: "Protect", value: localPrefs.protect, color: VAULT_COLORS.protect },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-slate-900">Set your spending style 🧭</h3>
      </div>
      <div className="p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Sliders */}
          <div className="space-y-6">
            {(Object.keys(localPrefs) as Array<keyof VaultPreferences>).map((vault) => {
              return (
                <div key={vault} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-slate-700">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={VAULT_COLORS[vault]}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {vault === "spend" && (
                          <>
                            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                          </>
                        )}
                        {vault === "save" && (
                          <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z" />
                        )}
                        {vault === "grow" && <path d="m22 12-4-4v3H4v2h14v3z" />}
                        {vault === "protect" && (
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                        )}
                      </svg>
                      {VAULT_LABELS[vault]}
                    </label>
                    <span className="text-slate-900">{localPrefs[vault]}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={localPrefs[vault]}
                    onChange={(e) => handleSliderChange(vault, parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${VAULT_COLORS[vault]} 0%, ${VAULT_COLORS[vault]} ${localPrefs[vault]}%, #e2e8f0 ${localPrefs[vault]}%, #e2e8f0 100%)`,
                    }}
                  />
                </div>
              );
            })}

            {/* Total Indicator */}
            <div
              className={`p-4 rounded-lg border-2 ${
                isValid
                  ? "bg-green-50 border-green-200"
                  : "bg-amber-50 border-amber-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Total Allocation</span>
                <span className={`${isValid ? "text-green-700" : "text-amber-700"}`}>
                  {total}% / 100%
                </span>
              </div>
              {!isValid && (
                <p className="text-amber-700 mt-1">
                  ⚠️ Sliders must total exactly 100%
                </p>
              )}
              {isValid && (
                <p className="text-green-700 mt-1">
                  ✓ Perfect! Your preferences are set.
                </p>
              )}
            </div>
          </div>

          {/* Pie Chart */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-sm aspect-square">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Simple pie chart */}
                {chartData.map((slice, index) => {
                  const startAngle = chartData
                    .slice(0, index)
                    .reduce((sum, s) => sum + s.value, 0) * 3.6;
                  const endAngle = startAngle + slice.value * 3.6;
                  
                  const startX = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
                  const startY = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
                  const endX = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180);
                  const endY = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180);
                  
                  const largeArcFlag = slice.value > 50 ? 1 : 0;
                  
                  return (
                    <path
                      key={index}
                      d={`M 100 100 L ${startX} ${startY} A 80 80 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                      fill={slice.color}
                      stroke="white"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
              
              {/* Legend */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {chartData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-600">
                      {item.name} {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <p className="text-slate-600 text-center mt-4 max-w-sm">
              Based on your CSV data and preferences, Artham will calculate your real vault values.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { VaultAllocation } from "../../../types/artham";

interface VaultPreviewSectionProps {
  allocation: VaultAllocation;
  onComplete: () => void;
}

const VAULTS = [
  {
    key: "spend" as keyof VaultAllocation,
    label: "Spend",
    emoji: "💸",
    description: "Daily use & bills",
    color: "from-[#1C8B82] to-[#148B7F]",
    bg: "bg-[#1C8B82]/10",
  },
  {
    key: "save" as keyof VaultAllocation,
    label: "Save",
    emoji: "💰",
    description: "Short-term savings",
    color: "from-[#F4B400] to-[#E6A800]",
    bg: "bg-[#F4B400]/10",
  },
  {
    key: "grow" as keyof VaultAllocation,
    label: "Grow",
    emoji: "📈",
    description: "Investments",
    color: "from-green-500 to-green-600",
    bg: "bg-green-100",
  },
  {
    key: "protect" as keyof VaultAllocation,
    label: "Protect",
    emoji: "🛡️",
    description: "Emergency & insurance",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-100",
  },
];

export function VaultPreviewSection({ allocation, onComplete }: VaultPreviewSectionProps) {
  return (
    <div className="bg-white border-2 border-[#1C8B82]/30 rounded-xl shadow-sm bg-gradient-to-br from-white to-[#1C8B82]/5 animate-fadeIn">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-slate-900">✨ Your Auto-Generated Vaults</h3>
      </div>
      <div className="p-6 space-y-6">
        {/* Vault Cards Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {VAULTS.map((vault, index) => {
            const value = allocation[vault.key];

            return (
              <div
                key={vault.key}
                className={`p-6 rounded-xl border-2 border-slate-200 ${vault.bg} animate-slideInLeft`}
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${vault.color}`}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {vault.key === "spend" && (
                        <>
                          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                        </>
                      )}
                      {vault.key === "save" && (
                        <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z" />
                      )}
                      {vault.key === "grow" && <path d="m22 12-4-4v3H4v2h14v3z" />}
                      {vault.key === "protect" && (
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      )}
                    </svg>
                  </div>
                  <span className="text-3xl">{vault.emoji}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-slate-900">{vault.label}</h3>
                  <p className="text-slate-600">{vault.description}</p>
                  <div className="pt-2">
                    <p className="text-3xl text-slate-900">₹{value.toFixed(2)}</p>
                    <p className="text-slate-600">per month</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Table */}
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-slate-700">Vault</th>
                <th className="px-4 py-3 text-right text-slate-700">Value</th>
                <th className="px-4 py-3 text-left text-slate-700">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {VAULTS.map((vault) => (
                <tr key={vault.key} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      {vault.emoji} {vault.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-slate-900">
                    ₹{allocation[vault.key].toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{vault.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-900 text-center">
            ✅ These values are now live on your dashboard
          </p>
        </div>

        {/* Complete Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={onComplete}
            className="px-8 py-3 rounded-lg bg-[#1C8B82] hover:bg-[#157670] text-white transition-colors flex items-center gap-2"
          >
            Go to Dashboard
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out 0.3s both;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out both;
        }
      `}</style>
    </div>
  );
}

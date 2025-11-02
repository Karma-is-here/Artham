import { RiskAppetite } from "../../../types/artham";

interface RiskAppetiteSectionProps {
  riskAppetite: RiskAppetite;
  onUpdateRisk: (risk: RiskAppetite) => void;
}

const RISK_PROFILES = [
  {
    id: "conservative" as RiskAppetite,
    label: "🐢 Conservative",
    grow: "10%",
    protect: "30%",
    description: "Prioritize safety and stability",
    color: "bg-blue-500",
  },
  {
    id: "balanced" as RiskAppetite,
    label: "⚖️ Balanced",
    grow: "20%",
    protect: "20%",
    description: "Mix of growth and protection",
    color: "bg-[#1C8B82]",
  },
  {
    id: "aggressive" as RiskAppetite,
    label: "🚀 Aggressive",
    grow: "40%",
    protect: "10%",
    description: "Focus on growth and returns",
    color: "bg-[#F4B400]",
  },
];

export function RiskAppetiteSection({ riskAppetite, onUpdateRisk }: RiskAppetiteSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-slate-900">What's your financial personality? 🎯</h3>
      </div>
      <div className="p-6">
        <div className="grid md:grid-cols-3 gap-4">
          {RISK_PROFILES.map((profile) => {
            const isSelected = riskAppetite === profile.id;

            return (
              <button
                key={profile.id}
                onClick={() => onUpdateRisk(profile.id)}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? "border-[#1C8B82] bg-[#1C8B82]/5 shadow-lg"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-lg ${profile.color} flex items-center justify-center`}>
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
                      {profile.id === "conservative" && <path d="m22 12-4-4v3H4v2h14v3z" />}
                      {profile.id === "balanced" && (
                        <>
                          <path d="m12 3 5 9H7l5-9z" />
                          <path d="m12 21-5-9h10l-5 9z" />
                        </>
                      )}
                      {profile.id === "aggressive" && <path d="m22 12-4-4v3H4v2h14v3z" />}
                    </svg>
                  </div>
                  
                  <div>
                    <h3 className="text-slate-900 mb-1">{profile.label}</h3>
                    <p className="text-slate-600">{profile.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-600">Grow</span>
                      <span className="text-slate-900">{profile.grow}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Protect</span>
                      <span className="text-slate-900">{profile.protect}</span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="pt-2">
                      <div className="bg-[#1C8B82] text-white px-3 py-1 rounded-full text-center">
                        ✓ Selected
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

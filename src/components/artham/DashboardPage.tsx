import { useState } from "react";
import { UserData, VaultPreferences } from "../../types/artham";
import { ImpactPreviewModal } from "./ImpactPreviewModal";
import { calculateTotalIncome } from "../../utils/vaultCalculations";
import { toast } from "sonner";

interface DashboardPageProps {
  userData: UserData;
  onUpdateData: (data: Partial<UserData>) => void;
  onLogout: () => void;
  onNavigateToSettings: () => void;
}

interface AISuggestion {
  id: string;
  emoji: string;
  title: string;
  description: string;
  type: "vault-reallocation" | "information";
  newPreferences?: VaultPreferences;
  scenario?: "save" | "invest" | "protect";
}

const VAULTS = [
  {
    key: "spend" as const,
    label: "Spend",
    emoji: "💸",
    description: "Daily use & bills",
    color: "from-[#1C8B82] to-[#148B7F]",
    bg: "bg-[#1C8B82]/10",
    insight: "spent on essentials this month",
  },
  {
    key: "save" as const,
    label: "Save",
    emoji: "💰",
    description: "Short-term savings",
    color: "from-[#F4B400] to-[#E6A800]",
    bg: "bg-[#F4B400]/10",
    insight: "saved for your goals",
  },
  {
    key: "grow" as const,
    label: "Grow",
    emoji: "📈",
    description: "Investments",
    color: "from-green-500 to-green-600",
    bg: "bg-green-100",
    insight: "invested for your future",
  },
  {
    key: "protect" as const,
    label: "Protect",
    emoji: "🛡️",
    description: "Emergency & insurance",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-100",
    insight: "secured as safety net",
  },
];

export function DashboardPage({
  userData,
  onLogout,
  onNavigateToSettings,
  onUpdateData,
}: DashboardPageProps) {
  const allocation = userData.vaultAllocation;
  const [showImpactPreview, setShowImpactPreview] = useState(false);
  const [currentScenario, setCurrentScenario] = useState<
    "save" | "invest" | "protect" | null
  >(null);

  // If you need totalIncome later, you can re-enable this:
  // const totalIncome = calculateTotalIncome(userData.income);

  // Generate AI suggestions based on current data
  const generateAISuggestions = (): AISuggestion[] => {
    const suggestions: AISuggestion[] = [];
    const currentPrefs = userData.vaultPreferences;
    const spendAmount = allocation?.spend || 0;
    const saveAmount = allocation?.save || 0;

    // Suggestion 1: If spending is high, suggest increasing savings
    if (currentPrefs.spend > 45) {
      suggestions.push({
        id: "increase-save",
        emoji: "💡",
        title: `Consider moving ₹${Math.round(spendAmount * 0.1)} to Save`,
        description:
          "Your spending is above average this month. Consider increasing your savings vault for better financial security.",
        type: "vault-reallocation",
        scenario: "save",
        newPreferences: {
          spend: Math.max(35, currentPrefs.spend - 10),
          save: Math.min(40, currentPrefs.save + 10),
          grow: currentPrefs.grow,
          protect: currentPrefs.protect,
        },
      });
    }

    // Suggestion 2: If grow vault is low, suggest investment
    if (currentPrefs.grow < 25) {
      suggestions.push({
        id: "investment-opportunity",
        emoji: "📈",
        title: "Investment Opportunity",
        description: `Your Grow vault has ₹${Math.round(allocation?.grow || 0)}. Explore low-risk mutual funds or SIP options for long-term wealth building.`,
        type: "vault-reallocation",
        scenario: "invest",
        newPreferences: {
          spend: Math.max(35, currentPrefs.spend - 5),
          save: currentPrefs.save,
          grow: Math.min(35, currentPrefs.grow + 5),
          protect: currentPrefs.protect,
        },
      });
    }

    // Suggestion 3: If protect vault is low, suggest emergency fund
    if (currentPrefs.protect < 15) {
      suggestions.push({
        id: "strengthen-safety",
        emoji: "🛡️",
        title: "Strengthen Your Safety Net",
        description: `Your emergency fund can cover ${Math.round(
          (allocation?.protect || 0) / (spendAmount || 1)
        )} month(s). Aim for 3-6 months for better protection.`,
        type: "information",
        scenario: "protect",
      });
    }

    return suggestions;
  };

  const aiSuggestions = generateAISuggestions();

  const handleApplySuggestion = (suggestion: AISuggestion) => {
    if (suggestion.type === "vault-reallocation" && suggestion.newPreferences) {
      onUpdateData({ vaultPreferences: suggestion.newPreferences });
      toast.success("Vault preferences updated! 🎉", {
        description: "Redirecting to settings to regenerate your vaults...",
        duration: 2000,
      });
      // Trigger recalculation by marking setup as incomplete temporarily
      setTimeout(() => {
        onNavigateToSettings();
      }, 1500);
    }
  };

  const handleLearnMore = (scenario: "save" | "invest" | "protect") => {
    setCurrentScenario(scenario);
    setShowImpactPreview(true);
  };

  const handleApplyModalChanges = () => {
    if (!currentScenario) return;

    // Find the suggestion for this scenario and apply it
    const suggestion = aiSuggestions.find((s) => s.scenario === currentScenario);
    if (suggestion && suggestion.newPreferences) {
      onUpdateData({ vaultPreferences: suggestion.newPreferences });
      toast.success("Optimization applied! ✨", {
        description: "Your vault preferences have been updated. Regenerating your vaults...",
        duration: 2000,
      });
      setTimeout(() => {
        onNavigateToSettings();
      }, 1500);
    }
  };

  const getScenarioData = (scenario: "save" | "invest" | "protect") => {
    const baseSpend = allocation?.spend || 0;
    const baseSave = allocation?.save || 0;
    const baseGrow = allocation?.grow || 0;
    const baseProtect = allocation?.protect || 0;

    const scenarios = {
      save: {
        title: "Savings Optimization 🌱",
        description: "Boost your Save vault by optimizing your spending",
        changes: [
          {
            name: "Spend",
            icon: "💳",
            currentAmount: baseSpend,
            newAmount: baseSpend * 0.9,
            change: -10,
            color: "#1C8B82",
          },
          {
            name: "Save",
            icon: "🏦",
            currentAmount: baseSave,
            newAmount: baseSave * 1.25,
            change: 10,
            color: "#F4B400",
          },
          {
            name: "Grow",
            icon: "📈",
            currentAmount: baseGrow,
            newAmount: baseGrow,
            change: 0,
            color: "#22c55e",
          },
          {
            name: "Protect",
            icon: "🛡️",
            currentAmount: baseProtect,
            newAmount: baseProtect,
            change: 0,
            color: "#3b82f6",
          },
        ],
      },
      invest: {
        title: "Growth Investment Plan 📈",
        description: "Gradually increase your Grow vault for long-term wealth",
        changes: [
          {
            name: "Spend",
            icon: "💳",
            currentAmount: baseSpend,
            newAmount: baseSpend * 0.95,
            change: -5,
            color: "#1C8B82",
          },
          {
            name: "Save",
            icon: "🏦",
            currentAmount: baseSave,
            newAmount: baseSave,
            change: 0,
            color: "#F4B400",
          },
          {
            name: "Grow",
            icon: "📈",
            currentAmount: baseGrow,
            newAmount: baseGrow * 1.2,
            change: 5,
            color: "#22c55e",
          },
          {
            name: "Protect",
            icon: "🛡️",
            currentAmount: baseProtect,
            newAmount: baseProtect,
            change: 0,
            color: "#3b82f6",
          },
        ],
      },
      protect: {
        title: "Emergency Fund Builder 🛡️",
        description: "Build your safety net to 3-6 months of expenses",
        changes: [
          {
            name: "Spend",
            icon: "💳",
            currentAmount: baseSpend,
            newAmount: baseSpend * 0.9,
            change: -10,
            color: "#1C8B82",
          },
          {
            name: "Save",
            icon: "🏦",
            currentAmount: baseSave,
            newAmount: baseSave * 0.95,
            change: -5,
            color: "#F4B400",
          },
          {
            name: "Grow",
            icon: "📈",
            currentAmount: baseGrow,
            newAmount: baseGrow,
            change: 0,
            color: "#22c55e",
          },
          {
            name: "Protect",
            icon: "🛡️",
            currentAmount: baseProtect,
            newAmount: baseProtect * 1.5,
            change: 15,
            color: "#3b82f6",
          },
        ],
      },
    };
    return scenarios[scenario];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#1C8B82] to-[#148B7F] p-2 rounded-xl">
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
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
              </div>
              <span className="text-slate-900">Artham</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onNavigateToSettings}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-colors"
              >
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
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span className="hidden sm:inline">Adjust Preferences</span>
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-colors"
              >
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
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-white border-2 border-[#1C8B82]/20 rounded-2xl p-6 bg-gradient-to-br from-white to-[#1C8B82]/5">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Profile & ArthaScore */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full bg-[#1C8B82] text-white flex items-center justify-center border-4 border-white shadow-lg">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>

                  {/* ArthaScore Ring */}
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-lg">
                    <div className="relative w-14 h-14">
                      <svg className="transform -rotate-90 w-14 h-14">
                        <circle cx="28" cy="28" r="24" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                        <circle
                          cx="28"
                          cy="28"
                          r="24"
                          stroke="#F4B400"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${(userData.profile.arthaScore / 100) * 150.8} 150.8`}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-slate-900">{userData.profile.arthaScore}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-slate-900">Hi, {userData.profile.name} 👋</h2>
                  <p className="text-slate-600">Welcome back to your financial dashboard</p>
                </div>
              </div>

              {/* Quick Metrics */}
              <div className="flex-1 flex justify-end gap-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m22 12-4-4v3H4v2h14v3z" />
                  </svg>
                  Awareness ↑12%
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                  Control ↑5%
                </span>
              </div>
            </div>
          </div>

          {/* Vaults Section */}
          <div>
            <div className="mb-4">
              <h2 className="text-slate-900">Your Financial Vaults</h2>
              <p className="text-slate-600">Your monthly allocation across four smart vaults</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {VAULTS.map((vault) => {
                const value = allocation?.[vault.key] || 0;

                return (
                  <div
                    key={vault.key}
                    className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="space-y-4">
                      {/* Icon and Emoji */}
                      <div className="flex items-start justify-between">
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
                              <>
                                <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z" />
                              </>
                            )}
                            {vault.key === "grow" && <path d="m22 12-4-4v3H4v2h14v3z" />}
                            {vault.key === "protect" && (
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                            )}
                          </svg>
                        </div>
                        <span className="text-3xl">{vault.emoji}</span>
                      </div>

                      {/* Title and Description */}
                      <div>
                        <h3 className="text-slate-900 mb-1">{vault.label}</h3>
                        <p className="text-slate-600">{vault.description}</p>
                      </div>

                      {/* Value */}
                      <div className="pt-2 border-t border-slate-200">
                        <p className="text-3xl text-slate-900 mb-1">₹{value.toFixed(0)}</p>
                        <p className="text-slate-600">{vault.insight}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Insights Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Weekly Money Story */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F4B400"
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
                <h3 className="text-slate-900">Weekly Money Story</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-900 mb-2">🌱 Great progress this week!</p>
                  <p className="text-green-700">
                    You stayed within your spending limit and saved ₹2,000 more than last month.
                    Your financial awareness is improving.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Spending vs Budget</span>
                    <span className="text-green-600">-8% under</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: "92%" }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Savings Goal Progress</span>
                    <span className="text-blue-600">65% complete</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: "65%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1C8B82"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
                <h3 className="text-slate-900">AI Recommendations</h3>
              </div>

              <div className="space-y-3">
                {aiSuggestions.length === 0 ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-900 mb-1">✨ Your vaults are well-balanced!</p>
                    <p className="text-green-700">
                      Keep up the great work. Your current allocation is optimized for your financial goals.
                    </p>
                  </div>
                ) : (
                  aiSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className={`p-4 rounded-lg border ${
                        suggestion.type === "vault-reallocation"
                          ? suggestion.id === "increase-save"
                            ? "bg-[#1C8B82]/5 border-[#1C8B82]/20"
                            : "bg-[#F4B400]/5 border-[#F4B400]/20"
                          : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <p className="text-slate-900 mb-2">
                        {suggestion.emoji} {suggestion.title}
                      </p>
                      <p className="text-slate-600 mb-3">{suggestion.description}</p>
                      {suggestion.type === "vault-reallocation" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApplySuggestion(suggestion)}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              suggestion.id === "increase-save"
                                ? "bg-[#1C8B82] hover:bg-[#157670] text-white"
                                : "bg-[#F4B400] hover:bg-[#E5A500] text-white"
                            }`}
                          >
                            Apply Suggestion
                          </button>
                          {suggestion.scenario && (
                            <button
                              onClick={() => handleLearnMore(suggestion.scenario!)}
                              className={`px-4 py-2 rounded-lg border transition-colors ${
                                suggestion.id === "increase-save"
                                  ? "border-[#1C8B82] text-[#1C8B82] hover:bg-[#1C8B82]/10"
                                  : "border-[#F4B400] text-[#F4B400] hover:bg-[#F4B400]/10"
                              }`}
                            >
                              Learn More
                            </button>
                          )}
                        </div>
                      ) : suggestion.scenario ? (
                        <button
                          onClick={() => handleLearnMore(suggestion.scenario!)}
                          className="px-4 py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          Learn More
                        </button>
                      ) : null}
                    </div>
                  ))
                )}

                {/* Static examples (kept for demonstration) */}
                <div className="p-4 bg-[#1C8B82]/5 border border-[#1C8B82]/20 rounded-lg">
                  <p className="text-slate-900 mb-2">💡 Consider moving ₹500 to Save</p>
                  <p className="text-slate-600 mb-3">
                    Your spending is below average this month. Consider increasing your savings vault.
                  </p>
                  <button className="px-4 py-2 bg-[#1C8B82] hover:bg-[#157670] text-white rounded-lg transition-colors">
                    Apply Suggestion
                  </button>
                </div>

                <div className="p-4 bg-[#F4B400]/5 border border-[#F4B400]/20 rounded-lg">
                  <p className="text-slate-900 mb-2">📈 Investment Opportunity</p>
                  <p className="text-slate-600 mb-3">Your Grow vault has enough for a new SIP. Explore low-risk mutual funds.</p>
                  <button className="px-4 py-2 border border-[#F4B400] text-[#F4B400] hover:bg-[#F4B400]/10 rounded-lg transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Reminder */}
          {!userData.csvUploaded && (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <div className="flex-1">
                  <h3 className="text-slate-900 mb-1">Upload a statement to unlock deeper insights</h3>
                  <p className="text-slate-600">Get personalized recommendations based on your real spending patterns</p>
                </div>
                <button className="px-6 py-3 bg-[#1C8B82] hover:bg-[#157670] text-white rounded-lg transition-colors">
                  Upload Now
                </button>
              </div>
            </div>
          )}

          {/* Quick Goals */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-slate-900 mb-4">Quick Goals Progress</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-700">Emergency Fund</span>
                  <span className="text-slate-600">₹30,000 / ₹75,000</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: "40%" }} />
                </div>
                <p className="text-slate-600">40% complete</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-700">Travel Fund</span>
                  <span className="text-slate-600">₹10,000 / ₹50,000</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-[#F4B400] h-2 rounded-full transition-all duration-500" style={{ width: "20%" }} />
                </div>
                <p className="text-slate-600">20% complete</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-600">
              Need help understanding your ArthaScore?{" "}
              <a href="#" className="text-[#1C8B82] hover:underline">
                Visit Money Labs
              </a>
            </p>
            <p className="text-slate-500">Powered by Artham AI</p>
          </div>
        </div>
      </footer>

      {/* Impact Preview Modal */}
      {currentScenario && (
        <ImpactPreviewModal
          isOpen={showImpactPreview}
          onClose={() => {
            setShowImpactPreview(false);
            setCurrentScenario(null);
          }}
          onApply={handleApplyModalChanges}
          {...getScenarioData(currentScenario)}
        />
      )}
    </div>
  );
}

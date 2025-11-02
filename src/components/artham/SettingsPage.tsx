import { useState } from "react";
import { UserData } from "../../types/artham";
import { ProfileCard } from "./settings/ProfileCard";
import { IncomeSection } from "./settings/IncomeSection";
import { BankStatementSection } from "./settings/BankStatementSection";
import { RiskAppetiteSection } from "./settings/RiskAppetiteSection";
import { VaultPreferencesSection } from "./settings/VaultPreferencesSection";
import { AICalculationSection } from "./settings/AICalculationSection";
import { VaultPreviewSection } from "./settings/VaultPreviewSection";
import { TransitionAnimation } from "./settings/TransitionAnimation";
import { calculateVaultAllocation, calculateArthaScore, calculateTotalIncome } from "../../utils/vaultCalculations";

interface SettingsPageProps {
  userData: UserData;
  onUpdateData: (data: Partial<UserData>) => void;
  onComplete: (userData: UserData) => void;
  onBackToDashboard?: () => void;
}

export function SettingsPage({ userData, onUpdateData, onComplete, onBackToDashboard }: SettingsPageProps) {
  const [showCalculation, setShowCalculation] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const handleGenerateVaults = () => {
    // Calculate total income from all sources
    const totalIncome = calculateTotalIncome(userData.income);
    
    // Calculate vault allocation
    const allocation = calculateVaultAllocation(
      totalIncome,
      userData.riskAppetite,
      userData.vaultPreferences
    );

    // Calculate ArthaScore
    const arthaScore = calculateArthaScore(
      allocation,
      totalIncome,
      userData.csvUploaded
    );

    // Update user data
    const updatedData: UserData = {
      ...userData,
      vaultAllocation: allocation,
      profile: {
        ...userData.profile,
        arthaScore,
      },
    };

    onUpdateData({ 
      vaultAllocation: allocation,
      profile: updatedData.profile,
    });

    setShowCalculation(true);
  };

  const handleComplete = () => {
    setShowTransition(true);
    
    // Pass updated data to parent after 3 seconds
    setTimeout(() => {
      onComplete(userData);
    }, 3000);
  };

  if (showTransition) {
    return <TransitionAnimation />;
  }

  const totalIncome = calculateTotalIncome(userData.income);
  const canGenerate = totalIncome > 0 && userData.csvUploaded;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            {userData.setupComplete && onBackToDashboard && (
              <button 
                onClick={onBackToDashboard}
                className="px-3 py-2 text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-colors"
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
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                Back to Dashboard
              </button>
            )}
            <div>
              <h1>Financial Setup</h1>
              <p className="text-slate-600">Tell us about your finances</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Profile Card */}
          <ProfileCard
            profile={userData.profile}
            setupComplete={showCalculation && !!userData.vaultAllocation}
            onUpdateProfile={(profile) => onUpdateData({ profile })}
          />

          {/* Section 1: Income */}
          <IncomeSection
            income={userData.income}
            onUpdateIncome={(income) => onUpdateData({ income })}
          />

          {/* Section 2: Bank Statement Upload */}
          <BankStatementSection
            csvUploaded={userData.csvUploaded}
            onUpload={() => {
              onUpdateData({ 
                csvUploaded: true,
              });
            }}
          />

          {/* Section 3: Risk Appetite */}
          <RiskAppetiteSection
            riskAppetite={userData.riskAppetite}
            onUpdateRisk={(riskAppetite) => onUpdateData({ riskAppetite })}
          />

          {/* Section 4: Vault Preferences */}
          <VaultPreferencesSection
            preferences={userData.vaultPreferences}
            onUpdatePreferences={(vaultPreferences) => onUpdateData({ vaultPreferences })}
          />

          {/* Generate Button */}
          {!showCalculation && (
            <div className="flex justify-center pt-4">
              <button
                onClick={handleGenerateVaults}
                disabled={!canGenerate}
                className={`px-8 py-3 rounded-lg text-white transition-all flex items-center gap-2 ${
                  canGenerate
                    ? "bg-[#1C8B82] hover:bg-[#157670] cursor-pointer"
                    : "bg-slate-300 cursor-not-allowed"
                }`}
              >
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
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  <path d="M5 3v4" />
                  <path d="M19 17v4" />
                  <path d="M3 5h4" />
                  <path d="M17 19h4" />
                </svg>
                Generate My Vaults
              </button>
            </div>
          )}

          {!canGenerate && !showCalculation && (
            <p className="text-center text-slate-600">
              ⚠️ Please enter your income and upload a bank statement to continue
            </p>
          )}

          {/* Section 5: AI Calculation (shows after generation) */}
          {showCalculation && <AICalculationSection />}

          {/* Section 6: Vault Preview (shows after generation) */}
          {showCalculation && userData.vaultAllocation && (
            <VaultPreviewSection
              allocation={userData.vaultAllocation}
              onComplete={handleComplete}
            />
          )}
        </div>
      </main>
    </div>
  );
}

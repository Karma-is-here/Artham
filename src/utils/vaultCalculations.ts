import { RiskAppetite, VaultPreferences, VaultAllocation, Income } from "../types/artham";

export function calculateTotalIncome(income: Income): number {
  const sideIncomesTotal = income.sideIncomes.reduce((sum, side) => sum + side.amount, 0);
  
  if (income.isVariable) {
    return income.averageMonthly;
  }
  
  return income.primaryIncome + sideIncomesTotal;
}

export function getRiskFactor(riskAppetite: RiskAppetite): number {
  switch (riskAppetite) {
    case "conservative":
      return 0.1;
    case "balanced":
      return 0.2;
    case "aggressive":
      return 0.4;
    default:
      return 0.2;
  }
}

export function calculateVaultAllocation(
  monthlyIncome: number,
  riskAppetite: RiskAppetite,
  preferences: VaultPreferences
): VaultAllocation {
  // I = total monthly income
  const I = monthlyIncome;
  
  // R = risk factor
  const R = getRiskFactor(riskAppetite);
  
  // P = user preferred vault split (as decimals)
  const P = {
    spend: preferences.spend / 100,
    save: preferences.save / 100,
    grow: preferences.grow / 100,
    protect: preferences.protect / 100,
  };
  
  // Calculate allocations based on preferences and risk
  const spend = I * P.spend;
  const save = I * P.save;
  const grow = I * P.grow * (1 + R); // Risk factor increases grow allocation
  const protect = I * P.protect;
  
  // Calculate total and normalize if needed
  const total = spend + save + grow + protect;
  
  let allocation: VaultAllocation;
  
  if (total === 0) {
    // Default allocation if no income
    allocation = {
      spend: 0,
      save: 0,
      grow: 0,
      protect: 0,
    };
  } else {
    // Normalize to ensure total equals income
    const normalizationFactor = I / total;
    
    allocation = {
      spend: spend * normalizationFactor,
      save: save * normalizationFactor,
      grow: grow * normalizationFactor,
      protect: protect * normalizationFactor,
    };
  }
  
  return allocation;
}

export function calculateArthaScore(
  vaultAllocation: VaultAllocation | undefined,
  monthlyIncome: number,
  csvUploaded: boolean
): number {
  if (!vaultAllocation || monthlyIncome === 0) return 50;
  
  // Score based on financial health indicators
  const saveRatio = vaultAllocation.save / monthlyIncome;
  const growRatio = vaultAllocation.grow / monthlyIncome;
  const protectRatio = vaultAllocation.protect / monthlyIncome;
  const spendRatio = vaultAllocation.spend / monthlyIncome;
  
  // Base score
  let score = 50;
  
  // Bonus for CSV upload (better data = higher score potential)
  if (csvUploaded) {
    score += 5;
  }
  
  // Saving score (max +15)
  score += saveRatio * 60;
  
  // Growth score (max +15)
  score += growRatio * 50;
  
  // Protection score (max +10)
  score += protectRatio * 40;
  
  // Penalty for overspending (max -10)
  if (spendRatio > 0.7) {
    score -= (spendRatio - 0.7) * 30;
  }
  
  // Bonus for balanced allocation
  const isBalanced = saveRatio > 0.15 && growRatio > 0.1 && protectRatio > 0.1;
  if (isBalanced) {
    score += 5;
  }
  
  return Math.min(100, Math.max(0, Math.round(score)));
}

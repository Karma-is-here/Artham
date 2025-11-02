export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  photo?: string;
  arthaScore: number;
}

export type RiskAppetite = "conservative" | "balanced" | "aggressive";

export interface VaultPreferences {
  spend: number;
  save: number;
  grow: number;
  protect: number;
}

export interface VaultAllocation {
  spend: number;
  save: number;
  grow: number;
  protect: number;
}

export interface SideIncome {
  label: string;
  amount: number;
}

export interface Income {
  primaryIncome: number;
  sideIncomes: SideIncome[];
  isVariable: boolean;
  averageMonthly: number;
}

export interface UserData {
  profile: UserProfile;
  income: Income;
  riskAppetite: RiskAppetite;
  vaultPreferences: VaultPreferences;
  vaultAllocation?: VaultAllocation;
  csvUploaded: boolean;
  setupComplete: boolean;
}

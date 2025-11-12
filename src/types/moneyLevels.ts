export type LevelKey = 'security' | 'vitality' | 'independence' | 'freedom' | 'absoluteFreedom';

export interface Income {
  label: string;
  annual: number;
}

export interface AssetBucket {
  label: string;
  balance: number;
  yieldPct?: number;
}

export interface ExpenseCategory {
  label: string;
  monthly: number;
}

export interface LevelPlan {
  expenses: ExpenseCategory[];
  passiveIncome: Income[];
  notes?: string;
}

export interface Profile {
  age?: number;
  householdSize?: number;
  location?: string;
  taxBracketPct?: number;
  inflationPct?: number;
  withdrawalRatePct: number;
  expectedReturnPct?: number;
  mode: 'simple' | 'advanced';
}

export interface UserState {
  profile: Profile;
  incomes: Income[];
  assets: AssetBucket[];
  levels: Record<LevelKey, LevelPlan>;
  monthlyContribution?: number;
}

export const LEVEL_INFO: Record<LevelKey, { title: string; description: string }> = {
  security: {
    title: 'Security',
    description: 'Essentials only - housing, utilities, groceries, basic transport, insurance, minimum debt payments'
  },
  vitality: {
    title: 'Vitality',
    description: 'Security + health/wellness, modest dining out, small buffer'
  },
  independence: {
    title: 'Independence',
    description: 'Covers current lifestyle in full - typical monthly spend'
  },
  freedom: {
    title: 'Freedom',
    description: 'Independence + upgrades - better travel, higher-quality choices, time leverage'
  },
  absoluteFreedom: {
    title: 'Absolute Freedom',
    description: 'Dream lifestyle - luxury travel, philanthropy goals, stretch comforts'
  }
};

export const DEFAULT_EXPENSE_CATEGORIES = [
  'Housing',
  'Utilities',
  'Food',
  'Transport',
  'Insurance/Healthcare',
  'Debt Payments',
  'Subscriptions',
  'Discretionary',
  'Travel',
  'Giving',
  'Other'
];

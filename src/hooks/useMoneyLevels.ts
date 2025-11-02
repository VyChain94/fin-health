import { useState, useEffect } from 'react';
import { UserState, LevelKey, LevelPlan, Profile } from '@/types/moneyLevels';

const STORAGE_KEY = 'money-levels-data';

const defaultProfile: Profile = {
  withdrawalRatePct: 4,
  expectedReturnPct: 7,
  inflationPct: 3,
  mode: 'simple'
};

const defaultLevelPlan: LevelPlan = {
  expenses: [],
  passiveIncome: [],
  notes: ''
};

const initialState: UserState = {
  profile: defaultProfile,
  incomes: [],
  assets: [],
  levels: {
    security: { ...defaultLevelPlan },
    vitality: { ...defaultLevelPlan },
    independence: { ...defaultLevelPlan },
    freedom: { ...defaultLevelPlan },
    absoluteFreedom: { ...defaultLevelPlan }
  }
};

export function useMoneyLevels() {
  const [state, setState] = useState<UserState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateProfile = (updates: Partial<Profile>) => {
    setState(prev => ({ ...prev, profile: { ...prev.profile, ...updates } }));
  };

  const updateLevel = (level: LevelKey, updates: Partial<LevelPlan>) => {
    setState(prev => ({
      ...prev,
      levels: {
        ...prev.levels,
        [level]: { ...prev.levels[level], ...updates }
      }
    }));
  };

  const calculateLevelMetrics = (level: LevelKey) => {
    const levelData = state.levels[level];
    const annualExpenses = levelData.expenses.reduce((sum, e) => sum + e.monthly, 0) * 12;
    const annualPassiveIncome = levelData.passiveIncome.reduce((sum, i) => sum + i.annual, 0);
    const annualGap = Math.max(0, annualExpenses - annualPassiveIncome);

    let targetAssets = 0;
    const withdrawalRate = state.profile.withdrawalRatePct / 100;

    if (state.profile.mode === 'simple') {
      targetAssets = annualGap / withdrawalRate;
    } else {
      const totalAssets = state.assets.reduce((sum, a) => sum + a.balance, 0);
      const weightedYield = totalAssets > 0
        ? state.assets.reduce((sum, a) => sum + a.balance * (a.yieldPct || 4) / 100, 0) / totalAssets
        : 0.04;
      targetAssets = weightedYield > 0 ? annualGap / weightedYield : annualGap / 0.04;
    }

    const currentAssets = state.assets.reduce((sum, a) => sum + a.balance, 0);
    const progress = targetAssets > 0 ? Math.min(currentAssets / targetAssets, 1) : 0;

    // Time to target calculation
    let yearsToTarget: number | null = null;
    if (state.monthlyContribution && state.profile.expectedReturnPct && currentAssets < targetAssets) {
      const r = state.profile.expectedReturnPct / 100;
      const contrib = state.monthlyContribution;
      const P = currentAssets;
      const T = targetAssets;
      
      if (r > 0 && contrib > 0) {
        const numerator = Math.log((contrib + r * P) / (contrib + r * T));
        const denominator = 12 * Math.log(1 + r / 12);
        yearsToTarget = Math.abs(numerator / denominator);
      }
    }

    return {
      annualExpenses,
      annualPassiveIncome,
      annualGap,
      targetAssets,
      currentAssets,
      progress,
      yearsToTarget
    };
  };

  const copyFromPreviousLevel = (targetLevel: LevelKey) => {
    const levels: LevelKey[] = ['security', 'vitality', 'independence', 'freedom', 'absoluteFreedom'];
    const currentIndex = levels.indexOf(targetLevel);
    if (currentIndex > 0) {
      const previousLevel = levels[currentIndex - 1];
      const previousData = state.levels[previousLevel];
      updateLevel(targetLevel, {
        expenses: [...previousData.expenses],
        passiveIncome: [...previousData.passiveIncome]
      });
    }
  };

  const resetData = () => {
    setState(initialState);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `money-levels-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return {
    state,
    setState,
    updateProfile,
    updateLevel,
    calculateLevelMetrics,
    copyFromPreviousLevel,
    resetData,
    exportData
  };
}

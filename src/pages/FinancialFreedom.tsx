import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home } from "lucide-react";
import FinancialFreedomTracker from "@/components/dashboard/FinancialFreedomTracker";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { LevelKey } from "@/types/moneyLevels";
import { FinancialData } from "@/types/financial";
import { useFinancialReports } from "@/hooks/useFinancialReports";

export default function FinancialFreedom() {
  const { latestReport } = useFinancialReports();
  const [customLevelTargets, setCustomLevelTargets] = useState<Record<LevelKey, number> | null>(null);
  
  const financialData = latestReport || {
    income: {
      earned1: 0,
      earned2: 0,
      realEstate: 0,
      business: 0,
      interest: 0,
      dividends: 0,
      other: 0,
    },
    expenses: {
      homeLoan: 0,
      homeMaintenance: 0,
      homeUtilities: 0,
      carTravel: 0,
      cellPhones: 0,
      investments: 0,
      otherExpenses: 0,
      carLoans: 0,
      creditCards: 0,
      schoolLoans: 0,
      personalCare: 0,
      subscriptions: 0,
      shopping: 0,
      travelVacation: 0,
      medicalExpenses: 0,
      medicalInsurance: 0,
      taxes: 0,
    },
    assets: {
      bankAccounts: 0,
      preciousMetals: 0,
      retirement: 0,
      stocks: 0,
      otherAssets: 0,
      business: 0,
      realEstate: 0,
      doodadsHome: 0,
      doodadsCar: 0,
      doodadsOther: 0,
    },
    liabilities: {
      creditCards: 0,
      carLoans: 0,
      homeMortgage: 0,
      personalLoans: 0,
      schoolLoans: 0,
      otherDebt: 0,
    },
  };

  useEffect(() => {
    const saved = localStorage.getItem("customLevelTargets");
    if (saved) {
      setCustomLevelTargets(JSON.parse(saved));
    }
  }, []);

  const handleUpdateLevelTarget = (level: LevelKey, target: number) => {
    const newTargets = {
      ...customLevelTargets,
      [level]: target,
    } as Record<LevelKey, number>;
    setCustomLevelTargets(newTargets);
    localStorage.setItem("customLevelTargets", JSON.stringify(newTargets));
  };

  const totalAssets = 
    financialData.assets.bankAccounts +
    financialData.assets.preciousMetals +
    financialData.assets.retirement +
    financialData.assets.stocks +
    financialData.assets.otherAssets +
    financialData.assets.business +
    financialData.assets.realEstate;

  const totalLiabilities =
    financialData.liabilities.creditCards +
    financialData.liabilities.carLoans +
    financialData.liabilities.homeMortgage +
    financialData.liabilities.personalLoans +
    financialData.liabilities.schoolLoans +
    financialData.liabilities.otherDebt;

  const totalIncome =
    financialData.income.earned1 +
    financialData.income.earned2 +
    financialData.income.realEstate +
    financialData.income.business +
    financialData.income.interest +
    financialData.income.dividends +
    financialData.income.other;

  const totalExpenses =
    financialData.expenses.homeLoan +
    financialData.expenses.homeMaintenance +
    financialData.expenses.homeUtilities +
    financialData.expenses.carTravel +
    financialData.expenses.cellPhones +
    financialData.expenses.investments +
    financialData.expenses.otherExpenses +
    financialData.expenses.carLoans +
    financialData.expenses.creditCards +
    financialData.expenses.schoolLoans +
    financialData.expenses.personalCare +
    financialData.expenses.subscriptions +
    financialData.expenses.shopping +
    financialData.expenses.travelVacation +
    financialData.expenses.medicalExpenses +
    financialData.expenses.medicalInsurance +
    financialData.expenses.taxes;

  const totalPassive = 
    financialData.income.realEstate +
    financialData.income.business;

  const totalPortfolio = 
    financialData.income.interest +
    financialData.income.dividends +
    financialData.income.other;

  const netMonthlyCashFlow = totalIncome - totalExpenses;

  const levelTargets = customLevelTargets || {
    security: totalExpenses * 0.3,
    vitality: totalExpenses * 0.5,
    independence: totalExpenses,
    freedom: totalExpenses * 1.5,
    absoluteFreedom: totalExpenses * 2,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <FinancialFreedomTracker 
          currentAssets={totalAssets}
          netMonthlyCashFlow={netMonthlyCashFlow}
          totalExpenses={totalExpenses}
          totalPassive={totalPassive}
          totalPortfolio={totalPortfolio}
          levelTargets={levelTargets}
          onUpdateLevelTarget={handleUpdateLevelTarget}
        />
      </div>
    </div>
  );
}

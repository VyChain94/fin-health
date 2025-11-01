import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import IncomeSection from "@/components/dashboard/IncomeSection";
import ExpenseSection from "@/components/dashboard/ExpenseSection";
import AssetsSection from "@/components/dashboard/AssetsSection";
import LiabilitiesSection from "@/components/dashboard/LiabilitiesSection";
import AnalysisSection from "@/components/dashboard/AnalysisSection";

export interface FinancialData {
  income: {
    earned1: number;
    earned2: number;
    realEstate: number;
    business: number;
    interest: number;
    dividends: number;
    other: number;
  };
  expenses: {
    homeLoan: number;
    homeMaintenance: number;
    homeUtilities: number;
    carTravel: number;
    cellPhones: number;
    investments: number;
    otherExpenses: number;
    carLoans: number;
    creditCards: number;
    schoolLoans: number;
    personalCare: number;
    subscriptions: number;
    shopping: number;
    travelVacation: number;
    medicalExpenses: number;
    medicalInsurance: number;
    taxes: number;
  };
  assets: {
    bankAccounts: number;
    preciousMetals: number;
    retirement: number;
    stocks: number;
    otherAssets: number;
    business: number;
    realEstate: number;
    doodadsHome: number;
    doodadsCar: number;
    doodadsOther: number;
  };
  liabilities: {
    creditCards: number;
    carLoans: number;
    homeMortgage: number;
    personalLoans: number;
    schoolLoans: number;
    otherDebt: number;
  };
}

const Index = () => {
  const [financialData, setFinancialData] = useState<FinancialData>(() => {
    const saved = localStorage.getItem("financialData");
    return saved
      ? JSON.parse(saved)
      : {
          income: {
            earned1: 7224.38,
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
            medicalInsurance: 214.56,
            taxes: 447.09,
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
  });

  useEffect(() => {
    localStorage.setItem("financialData", JSON.stringify(financialData));
  }, [financialData]);

  const updateIncome = (field: keyof FinancialData["income"], value: number) => {
    setFinancialData((prev) => ({
      ...prev,
      income: { ...prev.income, [field]: value },
    }));
  };

  const updateExpenses = (field: keyof FinancialData["expenses"], value: number) => {
    setFinancialData((prev) => ({
      ...prev,
      expenses: { ...prev.expenses, [field]: value },
    }));
  };

  const updateAssets = (field: keyof FinancialData["assets"], value: number) => {
    setFinancialData((prev) => ({
      ...prev,
      assets: { ...prev.assets, [field]: value },
    }));
  };

  const updateLiabilities = (field: keyof FinancialData["liabilities"], value: number) => {
    setFinancialData((prev) => ({
      ...prev,
      liabilities: { ...prev.liabilities, [field]: value },
    }));
  };

  const totalEarned =
    financialData.income.earned1 + financialData.income.earned2;
  const totalPassive =
    financialData.income.realEstate + financialData.income.business;
  const totalPortfolio =
    financialData.income.interest +
    financialData.income.dividends +
    financialData.income.other;
  const totalIncome = totalEarned + totalPassive + totalPortfolio;

  const totalExpenses = Object.values(financialData.expenses).reduce(
    (sum, val) => sum + val,
    0
  );
  const netMonthlyCashFlow = totalIncome - totalExpenses;

  const totalAssets = Object.values(financialData.assets).reduce(
    (sum, val) => sum + val,
    0
  );
  const totalDoodads =
    financialData.assets.doodadsHome +
    financialData.assets.doodadsCar +
    financialData.assets.doodadsOther;

  const totalLiabilities = Object.values(financialData.liabilities).reduce(
    (sum, val) => sum + val,
    0
  );

  const netWorthBanker = totalAssets - totalLiabilities;
  const netWorthRichDad = totalAssets - totalDoodads - totalLiabilities;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Financial Freedom Tracker
          </h1>
          <p className="text-muted-foreground">
            Monitor your path to financial independence
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <IncomeSection
            income={financialData.income}
            updateIncome={updateIncome}
            totalEarned={totalEarned}
            totalPassive={totalPassive}
            totalPortfolio={totalPortfolio}
            totalIncome={totalIncome}
          />

          <AnalysisSection
            totalIncome={totalIncome}
            netMonthlyCashFlow={netMonthlyCashFlow}
            totalExpenses={totalExpenses}
            totalPassive={totalPassive}
            totalPortfolio={totalPortfolio}
            totalAssets={totalAssets}
            totalDoodads={totalDoodads}
            netWorthRichDad={netWorthRichDad}
          />
        </div>

        <div className="mb-6">
          <ExpenseSection
            expenses={financialData.expenses}
            updateExpenses={updateExpenses}
            totalExpenses={totalExpenses}
            netMonthlyCashFlow={netMonthlyCashFlow}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AssetsSection
            assets={financialData.assets}
            updateAssets={updateAssets}
            totalAssets={totalAssets}
            totalDoodads={totalDoodads}
            netWorthBanker={netWorthBanker}
            netWorthRichDad={netWorthRichDad}
          />

          <LiabilitiesSection
            liabilities={financialData.liabilities}
            updateLiabilities={updateLiabilities}
            totalLiabilities={totalLiabilities}
            netWorthBanker={netWorthBanker}
            netWorthRichDad={netWorthRichDad}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;

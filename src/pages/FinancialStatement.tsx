import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import IncomeSection from "@/components/dashboard/IncomeSection";
import ExpenseSection from "@/components/dashboard/ExpenseSection";
import AssetsSection from "@/components/dashboard/AssetsSection";
import LiabilitiesSection from "@/components/dashboard/LiabilitiesSection";
import AnalysisSection from "@/components/dashboard/AnalysisSection";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { DataSource } from "@/components/dashboard/DataSourceDropdown";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LevelKey } from "@/types/moneyLevels";
import { FinancialData } from "@/types/financial";
import { GuidedTourButton } from "@/components/ui/GuidedTourButton";
import { WhyToolsMatterSection } from "@/components/dashboard/WhyToolsMatterSection";

const FinancialStatement = () => {
  const {
    user,
    loading
  } = useAuth();
  const {
    toast
  } = useToast();
  const [reportName, setReportName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [customLevelTargets, setCustomLevelTargets] = useState<Record<LevelKey, number> | null>(null);
  const [financialData, setFinancialData] = useState<FinancialData>({
    income: {
      earned1: 0,
      earned2: 0,
      realEstate: 0,
      business: 0,
      interest: 0,
      dividends: 0,
      other: 0
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
      taxes: 0
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
      doodadsOther: 0
    },
    liabilities: {
      creditCards: 0,
      carLoans: 0,
      homeMortgage: 0,
      personalLoans: 0,
      schoolLoans: 0,
      otherDebt: 0
    }
  });
  const [dataSources, setDataSources] = useState<{
    income: DataSource[];
    expenses: DataSource[];
    assets: DataSource[];
    liabilities: DataSource[];
  }>({
    income: [],
    expenses: [],
    assets: [],
    liabilities: []
  });
  const updateIncome = (field: keyof FinancialData["income"], value: number) => {
    setFinancialData(prev => ({
      ...prev,
      income: {
        ...prev.income,
        [field]: value
      }
    }));
  };
  const updateExpenses = (field: keyof FinancialData["expenses"], value: number) => {
    setFinancialData(prev => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        [field]: value
      }
    }));
  };
  const updateAssets = (field: keyof FinancialData["assets"], value: number) => {
    setFinancialData(prev => ({
      ...prev,
      assets: {
        ...prev.assets,
        [field]: value
      }
    }));
  };
  const updateLiabilities = (field: keyof FinancialData["liabilities"], value: number) => {
    setFinancialData(prev => ({
      ...prev,
      liabilities: {
        ...prev.liabilities,
        [field]: value
      }
    }));
  };
  const addDataSource = (section: keyof typeof dataSources, source: Omit<DataSource, "id">) => {
    const newSource = {
      ...source,
      id: crypto.randomUUID()
    };
    setDataSources(prev => ({
      ...prev,
      [section]: [...prev[section], newSource]
    }));
  };
  const removeDataSource = (section: keyof typeof dataSources, id: string) => {
    setDataSources(prev => ({
      ...prev,
      [section]: prev[section].filter(s => s.id !== id)
    }));
  };
  const totalEarned = financialData.income.earned1 + financialData.income.earned2;
  const totalPassive = financialData.income.realEstate + financialData.income.business;
  const totalPortfolio = financialData.income.interest + financialData.income.dividends + financialData.income.other;
  const totalIncome = totalEarned + totalPassive + totalPortfolio;
  const totalExpenses = Object.values(financialData.expenses).reduce((sum, val) => sum + val, 0);
  const netMonthlyCashFlow = totalIncome - totalExpenses;
  const totalDoodads = financialData.assets.doodadsHome + financialData.assets.doodadsCar + financialData.assets.doodadsOther;
  const totalAssets = financialData.assets.bankAccounts + financialData.assets.preciousMetals + financialData.assets.retirement + financialData.assets.stocks + financialData.assets.otherAssets + financialData.assets.business + financialData.assets.realEstate;
  const totalLiabilities = Object.values(financialData.liabilities).reduce((sum, val) => sum + val, 0);
  const netWorthBanker = totalAssets + totalDoodads - totalLiabilities;
  const netWorthRichDad = totalAssets - totalLiabilities;

  // Calculate Money Levels targets using annual expenses and 4% rule
  const annualExpenses = totalExpenses * 12;
  const withdrawalRate = 0.04; // 4% rule

  const levelTargets: Record<LevelKey, number> = {
    security: customLevelTargets?.security ?? (annualExpenses > 0 ? annualExpenses * 0.5 / withdrawalRate : 0),
    vitality: customLevelTargets?.vitality ?? (annualExpenses > 0 ? annualExpenses * 0.7 / withdrawalRate : 0),
    independence: customLevelTargets?.independence ?? (annualExpenses > 0 ? annualExpenses / withdrawalRate : 0),
    freedom: customLevelTargets?.freedom ?? (annualExpenses > 0 ? annualExpenses * 1.5 / withdrawalRate : 0),
    absoluteFreedom: customLevelTargets?.absoluteFreedom ?? (annualExpenses > 0 ? annualExpenses * 2.5 / withdrawalRate : 0)
  };
  const handleUpdateLevelTarget = (level: LevelKey, newTarget: number) => {
    setCustomLevelTargets(prev => ({
      ...prev,
      [level]: newTarget
    }));
  };

  const handleSaveReport = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const {
        error
      } = await supabase.from("reports").insert({
        user_id: user.id,
        report_name: reportName || `Report ${new Date().toLocaleDateString()}`,
        report_date: new Date().toISOString(),
        income_data: financialData.income as any,
        assets_data: financialData.assets as any,
        expenses_data: financialData.expenses as any,
        liabilities_data: financialData.liabilities as any,
        data_sources: dataSources as any,
        is_archived: true
      } as any);
      if (error) throw error;
      toast({
        title: "Report Saved!",
        description: "Your financial report has been saved to archives."
      });
      setReportName("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  const handleMonthYearChange = (month: string, year: string) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };
  const loadReport = (report: any) => {
    setFinancialData({
      income: report.income_data || {},
      expenses: report.expenses_data || {},
      assets: report.assets_data || {},
      liabilities: report.liabilities_data || {}
    });
    setDataSources(report.data_sources || {
      income: [],
      expenses: [],
      assets: [],
      liabilities: []
    });
    toast({
      title: "Report Loaded",
      description: `Loaded: ${report.report_name}`
    });
  };
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>;
  }
  if (!user) {
    return <AuthForm />;
  }
  return <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <DashboardHeader onMonthYearChange={handleMonthYearChange} onLoadReport={loadReport} />
      <GuidedTourButton />
      <div className="container mx-auto px-4 py-8">
        <WhyToolsMatterSection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-8">
          <IncomeSection income={financialData.income} updateIncome={updateIncome} totalEarned={totalEarned} totalPassive={totalPassive} totalPortfolio={totalPortfolio} totalIncome={totalIncome} dataSources={dataSources.income} onAddSource={source => addDataSource("income", source)} onRemoveSource={id => removeDataSource("income", id)} />

          <AnalysisSection totalIncome={totalIncome} netMonthlyCashFlow={netMonthlyCashFlow} totalExpenses={totalExpenses} totalPassive={totalPassive} totalPortfolio={totalPortfolio} totalAssets={totalAssets} totalDoodads={totalDoodads} netWorthRichDad={netWorthRichDad} taxes={financialData.expenses.taxes} housingExpenses={financialData.expenses.homeLoan + financialData.expenses.homeMaintenance + financialData.expenses.homeUtilities} />
        </div>

        <div className="mb-6">
          <ExpenseSection expenses={financialData.expenses} updateExpenses={updateExpenses} totalExpenses={totalExpenses} netMonthlyCashFlow={netMonthlyCashFlow} dataSources={dataSources.expenses} onAddSource={source => addDataSource("expenses", source)} onRemoveSource={id => removeDataSource("expenses", id)} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AssetsSection assets={financialData.assets} updateAssets={updateAssets} totalAssets={totalAssets} totalDoodads={totalDoodads} netWorthBanker={netWorthBanker} netWorthRichDad={netWorthRichDad} dataSources={dataSources.assets} onAddSource={source => addDataSource("assets", source)} onRemoveSource={id => removeDataSource("assets", id)} />

          <LiabilitiesSection liabilities={financialData.liabilities} updateLiabilities={updateLiabilities} totalLiabilities={totalLiabilities} netWorthBanker={netWorthBanker} netWorthRichDad={netWorthRichDad} dataSources={dataSources.liabilities} onAddSource={source => addDataSource("liabilities", source)} onRemoveSource={id => removeDataSource("liabilities", id)} />
        </div>

        <div className="mt-8 mb-6 flex justify-center">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Submit Monthly Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="reportName">Report Name (Optional)</Label>
                <Input id="reportName" placeholder={`Report ${new Date().toLocaleDateString()}`} value={reportName} onChange={e => setReportName(e.target.value)} />
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full" size="lg" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Submit Monthly Report to Archives"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will save your current financial report to the archives. You can review it later by selecting the month and year from the header.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSaveReport}>
                      Yes, Submit Report
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};
export default FinancialStatement;
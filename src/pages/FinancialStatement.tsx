import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, AlertTriangle, CheckCircle } from "lucide-react";
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
import { format, addMonths, startOfMonth, isBefore } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Helper to determine the statement month based on current date
// Before the 7th: show previous month
// On or after the 7th: show current month
const getStatementMonth = (): Date => {
  const now = new Date();
  const dayOfMonth = now.getDate();
  
  if (dayOfMonth < 7) {
    // Before 7th, show previous month
    return startOfMonth(addMonths(now, -1));
  }
  // On or after 7th, show current month
  return startOfMonth(now);
};

const getEditableUntilDate = (statementMonth: Date): Date => {
  // Editable until the 7th of the next month
  const nextMonth = addMonths(statementMonth, 1);
  return new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 7);
};

const FinancialStatement = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  
  // Calculate statement month
  const statementMonth = useMemo(() => getStatementMonth(), []);
  const editableUntil = useMemo(() => getEditableUntilDate(statementMonth), [statementMonth]);
  
  const currentMonthLabel = `${format(statementMonth, "MMMM yyyy")} Statement`;
  const editableUntilLabel = `Editable until ${format(editableUntil, "MMMM d, yyyy")}`;
  
  const [currentReportId, setCurrentReportId] = useState<string | null>(null);
  const [reportName, setReportName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [existingReportConflict, setExistingReportConflict] = useState<string | null>(null);
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

  // Load existing report for the current statement month
  useEffect(() => {
    const loadCurrentMonthReport = async () => {
      if (!user) return;
      
      // Get start and end of statement month
      const monthStart = startOfMonth(statementMonth);
      const monthEnd = startOfMonth(addMonths(statementMonth, 1));
      
      try {
        const { data, error } = await supabase
          .from("reports")
          .select("*")
          .eq("user_id", user.id)
          .gte("report_date", monthStart.toISOString())
          .lt("report_date", monthEnd.toISOString())
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (error) throw error;
        
        if (data) {
          setCurrentReportId(data.id);
          setReportName(data.report_name || "");
          setFinancialData({
            income: data.income_data as any || {},
            expenses: data.expenses_data as any || {},
            assets: data.assets_data as any || {},
            liabilities: data.liabilities_data as any || {}
          });
          setDataSources(data.data_sources as any || {
            income: [],
            expenses: [],
            assets: [],
            liabilities: []
          });
        }
      } catch (error: any) {
        console.error("Error loading current month report:", error);
      }
    };
    
    loadCurrentMonthReport();
  }, [user, statementMonth]);

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

  // Check for existing report before showing save dialog
  const handleSaveClick = async () => {
    if (!user) return;
    
    // Check if still editable
    const now = new Date();
    if (!isBefore(now, editableUntil)) {
      toast({
        title: "Cannot Save",
        description: "The editing period for this statement has ended.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if a report already exists for this month
    const monthStart = startOfMonth(statementMonth);
    const monthEnd = startOfMonth(addMonths(statementMonth, 1));
    
    const { data: existingReport } = await supabase
      .from("reports")
      .select("id")
      .eq("user_id", user.id)
      .gte("report_date", monthStart.toISOString())
      .lt("report_date", monthEnd.toISOString())
      .maybeSingle();
    
    if (existingReport && existingReport.id !== currentReportId) {
      // Conflict! A different report exists for this month
      setExistingReportConflict(existingReport.id);
    } else {
      setExistingReportConflict(null);
    }
    
    setShowSaveDialog(true);
  };

  const handleLoadExistingReport = async () => {
    if (!existingReportConflict || !user) return;
    
    try {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("id", existingReportConflict)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setCurrentReportId(data.id);
        setReportName(data.report_name || "");
        setFinancialData({
          income: data.income_data as any || {},
          expenses: data.expenses_data as any || {},
          assets: data.assets_data as any || {},
          liabilities: data.liabilities_data as any || {}
        });
        setDataSources(data.data_sources as any || {
          income: [],
          expenses: [],
          assets: [],
          liabilities: []
        });
        toast({
          title: "Existing Statement Loaded",
          description: `Loaded your existing ${format(statementMonth, "MMMM yyyy")} statement for editing.`
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
    
    setShowSaveDialog(false);
    setExistingReportConflict(null);
  };

  const handleSaveReport = async () => {
    if (!user) return;
    
    setShowSaveDialog(false);
    setIsSaving(true);
    
    try {
      const reportData = {
        user_id: user.id,
        report_name: reportName || `${format(statementMonth, "MMMM yyyy")} Statement`,
        report_date: statementMonth.toISOString(),
        income_data: financialData.income as any,
        assets_data: financialData.assets as any,
        expenses_data: financialData.expenses as any,
        liabilities_data: financialData.liabilities as any,
        data_sources: dataSources as any,
        is_archived: true
      };
      
      if (currentReportId) {
        // Update existing report
        const { error } = await supabase
          .from("reports")
          .update(reportData)
          .eq("id", currentReportId);
        
        if (error) throw error;
      } else {
        // Create new report
        const { data, error } = await supabase
          .from("reports")
          .insert(reportData as any)
          .select()
          .single();
        
        if (error) throw error;
        setCurrentReportId(data.id);
      }
      
      toast({
        title: "Statement Saved!",
        description: `Your ${format(statementMonth, "MMMM yyyy")} statement has been saved and added to Past Statements.`
      });
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

  const loadReport = (report: any) => {
    setCurrentReportId(report.id);
    setReportName(report.report_name || "");
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
      title: "Statement Loaded",
      description: `Loaded: ${report.report_name}`
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }
  
  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <DashboardHeader 
        onLoadReport={loadReport}
        currentMonthLabel={currentMonthLabel}
        editableUntilLabel={editableUntilLabel}
      />
      <GuidedTourButton />
      <div className="container mx-auto px-4 py-8">
        <WhyToolsMatterSection />

        {/* Save Report Section */}
        <div className="mt-8 mb-6">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-1">
                  <Label htmlFor="reportName">Statement Name (Optional)</Label>
                  <Input
                    id="reportName"
                    placeholder={`${format(statementMonth, "MMMM yyyy")} Statement`}
                    value={reportName}
                    onChange={e => setReportName(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleSaveClick} 
                  disabled={isSaving}
                  className="w-full sm:w-auto"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Statement"}
                </Button>
                
                {/* Save Verification Dialog */}
                <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      {existingReportConflict ? (
                        <>
                          <div className="flex items-center gap-2 text-destructive">
                            <AlertTriangle className="h-5 w-5" />
                            <AlertDialogTitle>Statement Already Exists</AlertDialogTitle>
                          </div>
                          <AlertDialogDescription className="text-left">
                            A statement for <strong>{format(statementMonth, "MMMM yyyy")}</strong> already exists. 
                            Only one statement per month is allowed.
                            <br /><br />
                            Would you like to load and edit the existing statement instead?
                          </AlertDialogDescription>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 text-primary">
                            <CheckCircle className="h-5 w-5" />
                            <AlertDialogTitle>Verify Statement</AlertDialogTitle>
                          </div>
                          <AlertDialogDescription className="text-left">
                            You are saving your <strong>{format(statementMonth, "MMMM yyyy")}</strong> statement.
                            <br /><br />
                            This will be added to your Past Statements. Only one statement per month is allowed.
                          </AlertDialogDescription>
                        </>
                      )}
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      {existingReportConflict ? (
                        <AlertDialogAction onClick={handleLoadExistingReport}>
                          Load Existing Statement
                        </AlertDialogAction>
                      ) : (
                        <AlertDialogAction onClick={handleSaveReport}>
                          Confirm & Save
                        </AlertDialogAction>
                      )}
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <IncomeSection
            income={financialData.income}
            updateIncome={updateIncome}
            totalEarned={totalEarned}
            totalPassive={totalPassive}
            totalPortfolio={totalPortfolio}
            totalIncome={totalIncome}
            dataSources={dataSources.income}
            onAddSource={source => addDataSource("income", source)}
            onRemoveSource={id => removeDataSource("income", id)}
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
            taxes={financialData.expenses.taxes}
            housingExpenses={financialData.expenses.homeLoan + financialData.expenses.homeMaintenance + financialData.expenses.homeUtilities}
          />
        </div>

        <div className="mb-6">
          <ExpenseSection
            expenses={financialData.expenses}
            updateExpenses={updateExpenses}
            totalExpenses={totalExpenses}
            netMonthlyCashFlow={netMonthlyCashFlow}
            dataSources={dataSources.expenses}
            onAddSource={source => addDataSource("expenses", source)}
            onRemoveSource={id => removeDataSource("expenses", id)}
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
            dataSources={dataSources.assets}
            onAddSource={source => addDataSource("assets", source)}
            onRemoveSource={id => removeDataSource("assets", id)}
          />

          <LiabilitiesSection
            liabilities={financialData.liabilities}
            updateLiabilities={updateLiabilities}
            totalLiabilities={totalLiabilities}
            netWorthBanker={netWorthBanker}
            netWorthRichDad={netWorthRichDad}
            dataSources={dataSources.liabilities}
            onAddSource={source => addDataSource("liabilities", source)}
            onRemoveSource={id => removeDataSource("liabilities", id)}
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialStatement;
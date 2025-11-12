import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Download, RotateCcw, Home } from "lucide-react";
import { useMoneyLevels } from "@/hooks/useMoneyLevels";
import { ProfileStep } from "@/components/money-levels/ProfileStep";
import { IncomeAssetsStep } from "@/components/money-levels/IncomeAssetsStep";
import { ExpensesStep } from "@/components/money-levels/ExpensesStep";
import { ResultsStep } from "@/components/money-levels/ResultsStep";
import { LevelKey } from "@/types/moneyLevels";
import { Link, useNavigate } from "react-router-dom";

const LEVELS: LevelKey[] = ['security', 'vitality', 'independence', 'freedom', 'absoluteFreedom'];

export default function MoneyLevels() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const navigate = useNavigate();
  
  const {
    state,
    setState,
    updateProfile,
    updateLevel,
    calculateLevelMetrics,
    copyFromPreviousLevel,
    resetData,
    exportData
  } = useMoneyLevels();

  // Steps: 0 = Profile, 1 = Income/Assets, 2-6 = Levels, 7 = Results
  const totalSteps = 2 + LEVELS.length + 1;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const handleNext = () => {
    if (isLastStep) {
      // On last step, finish and return to dashboard
      navigate('/');
      return;
    }
    
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      if (currentStep >= 2 && currentStep < 2 + LEVELS.length - 1) {
        setCurrentLevelIndex(currentLevelIndex + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (currentStep > 2 && currentStep <= 2 + LEVELS.length) {
        setCurrentLevelIndex(currentLevelIndex - 1);
      }
    }
  };

  const renderStep = () => {
    if (currentStep === 0) {
      return <ProfileStep profile={state.profile} onUpdate={updateProfile} />;
    }
    
    if (currentStep === 1) {
      return (
        <IncomeAssetsStep
          incomes={state.incomes}
          assets={state.assets}
          monthlyContribution={state.monthlyContribution}
          mode={state.profile.mode}
          onUpdateIncomes={(incomes) => setState({ ...state, incomes })}
          onUpdateAssets={(assets) => setState({ ...state, assets })}
          onUpdateContribution={(amount) => setState({ ...state, monthlyContribution: amount })}
        />
      );
    }

    if (currentStep >= 2 && currentStep < 2 + LEVELS.length) {
      const level = LEVELS[currentLevelIndex];
      return (
        <ExpensesStep
          level={level}
          data={state.levels[level]}
          onUpdate={(updates) => updateLevel(level, updates)}
          onCopyFromPrevious={() => copyFromPreviousLevel(level)}
          canCopyFromPrevious={currentLevelIndex > 0}
        />
      );
    }

    if (currentStep === totalSteps - 1) {
      return (
        <ResultsStep
          calculateMetrics={calculateLevelMetrics}
          withdrawalRate={state.profile.withdrawalRatePct}
          onWithdrawalRateChange={(rate) => updateProfile({ withdrawalRatePct: rate })}
        />
      );
    }

    return null;
  };

  const getStepTitle = () => {
    if (currentStep === 0) return "Profile & Baseline";
    if (currentStep === 1) return "Income & Assets";
    if (currentStep >= 2 && currentStep < 2 + LEVELS.length) {
      return `Level ${currentLevelIndex + 1}: ${LEVELS[currentLevelIndex]}`;
    }
    if (currentStep === totalSteps - 1) return "Results & Plan";
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-primary text-primary-foreground">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">Money Levels Calculator</h1>
              <Link to="/">
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
            <p className="text-primary-foreground/80">
              Tony Robbins' 5 Levels of Financial Freedom
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-foreground transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium">
                {currentStep + 1}/{totalSteps}
              </span>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{getStepTitle()}</h2>
            <div className="flex gap-2">
              <Button onClick={resetData} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={exportData} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {renderStep()}

          <div className="flex justify-between pt-4">
            <Button
              onClick={handleBack}
              disabled={isFirstStep}
              variant="outline"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
            >
              {isLastStep ? "Finish" : "Next"}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

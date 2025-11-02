import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { LevelKey, LEVEL_INFO } from "@/types/moneyLevels";
import { useState } from "react";
import { TrendingUp } from "lucide-react";

interface LevelMetrics {
  annualExpenses: number;
  annualPassiveIncome: number;
  annualGap: number;
  targetAssets: number;
  currentAssets: number;
  progress: number;
  yearsToTarget: number | null;
}

interface ResultsStepProps {
  calculateMetrics: (level: LevelKey) => LevelMetrics;
  withdrawalRate: number;
  onWithdrawalRateChange: (rate: number) => void;
}

const LEVELS: LevelKey[] = ['security', 'vitality', 'independence', 'freedom', 'absoluteFreedom'];

export function ResultsStep({ calculateMetrics, withdrawalRate, onWithdrawalRateChange }: ResultsStepProps) {
  const [sensitivityRate, setSensitivityRate] = useState(withdrawalRate);

  const handleSensitivityChange = (value: number[]) => {
    setSensitivityRate(value[0]);
  };

  const applyRate = () => {
    onWithdrawalRateChange(sensitivityRate);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sensitivity Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Withdrawal Rate: {sensitivityRate.toFixed(1)}%</Label>
              <button onClick={applyRate} className="text-sm text-primary hover:underline">
                Apply to calculation
              </button>
            </div>
            <Slider
              value={[sensitivityRate]}
              onValueChange={handleSensitivityChange}
              min={3}
              max={5.5}
              step={0.1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {LEVELS.map((level) => {
        const metrics = calculateMetrics(level);
        const levelInfo = LEVEL_INFO[level];

        return (
          <Card key={level} className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{levelInfo.title}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {(metrics.progress * 100).toFixed(0)}% Complete
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Annual Expenses</div>
                  <div className="text-lg font-semibold">${metrics.annualExpenses.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Passive Income</div>
                  <div className="text-lg font-semibold">${metrics.annualPassiveIncome.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Annual Gap</div>
                  <div className="text-lg font-semibold text-orange-600">
                    ${metrics.annualGap.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Target Assets</span>
                  <span className="font-semibold">${metrics.targetAssets.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <Progress value={metrics.progress * 100} className="h-3" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Current: ${metrics.currentAssets.toLocaleString()}</span>
                  {metrics.yearsToTarget !== null && metrics.yearsToTarget > 0 && (
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      ~{metrics.yearsToTarget.toFixed(1)} years
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

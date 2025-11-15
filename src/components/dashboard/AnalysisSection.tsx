import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface AnalysisSectionProps {
  totalIncome: number;
  netMonthlyCashFlow: number;
  totalExpenses: number;
  totalPassive: number;
  totalPortfolio: number;
  totalAssets: number;
  totalDoodads: number;
  netWorthRichDad: number;
  taxes: number;
  housingExpenses: number;
}

const AnalysisSection = ({
  totalIncome,
  netMonthlyCashFlow,
  totalExpenses,
  totalPassive,
  totalPortfolio,
  totalAssets,
  totalDoodads,
  netWorthRichDad,
  taxes,
  housingExpenses,
}: AnalysisSectionProps) => {
  const cashFlowPercentage = totalIncome > 0 ? (netMonthlyCashFlow / totalIncome) * 100 : 0;
  const passiveIncomePercentage = totalIncome > 0 ? ((totalPassive + totalPortfolio) / totalIncome) * 100 : 0;
  const taxPercentage = totalIncome > 0 ? (taxes / totalIncome) * 100 : 0;
  const housingPercentage = totalIncome > 0 ? (housingExpenses / totalIncome) * 100 : 0;
  const doodadPercentage = totalAssets > 0 ? (totalDoodads / totalAssets) * 100 : 0;
  const returnOnAssets = netWorthRichDad > 0 ? (((totalPassive + totalPortfolio) * 12) / netWorthRichDad) * 100 : 0;
  const richDadRatio = totalExpenses > 0 ? netWorthRichDad / totalExpenses : 0;

  const MetricCard = ({ 
    title, 
    value, 
    target, 
    isGood 
  }: { 
    title: string; 
    value: string; 
    target: string; 
    isGood: boolean;
  }) => (
    <div className="p-4 rounded-lg bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-sm">{title}</h4>
        {isGood ? (
          <TrendingUp className="w-4 h-4 text-green-500" />
        ) : (
          <TrendingDown className="w-4 h-4 text-amber-500" />
        )}
      </div>
      <div className="text-2xl font-bold text-primary mb-1">{value}</div>
      <div className="text-xs text-muted-foreground">{target}</div>
    </div>
  );

  return (
    <Card className="shadow-lg border-primary/10 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-2xl">Analysis</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <MetricCard
          title="How Much Do You Keep?"
          value={`${cashFlowPercentage.toFixed(2)}%`}
          target="Should be increasing"
          isGood={cashFlowPercentage > 50}
        />
        
        <MetricCard
          title="Does Your Money Work For You?"
          value={`${passiveIncomePercentage.toFixed(2)}%`}
          target="Should be increasing"
          isGood={passiveIncomePercentage > 20}
        />
        
        <MetricCard
          title="How Much Do You Pay In Taxes?"
          value={`${taxPercentage.toFixed(2)}%`}
          target="Taxes/Total Income"
          isGood={taxPercentage < 25}
        />
        
        <MetricCard
          title="How Much Goes to Housing?"
          value={`${housingPercentage.toFixed(2)}%`}
          target="Keep under 33 percent"
          isGood={housingPercentage < 33}
        />
        
        <MetricCard
          title="Asset Column Doodads?"
          value={totalAssets > 0 ? `${doodadPercentage.toFixed(2)}%` : "#DIV/0!"}
          target="Should be decreasing"
          isGood={doodadPercentage < 10}
        />
        
        <MetricCard
          title="Return On Assets?"
          value={returnOnAssets > 0 ? `${returnOnAssets.toFixed(2)}%` : "#DIV/0!"}
          target="Should be increasing"
          isGood={returnOnAssets > 5}
        />
        
        <MetricCard
          title="How Wealthy Are You?"
          value={richDadRatio.toFixed(1)}
          target="Measured in months"
          isGood={richDadRatio > 12}
        />
      </CardContent>
    </Card>
  );
};

export default AnalysisSection;

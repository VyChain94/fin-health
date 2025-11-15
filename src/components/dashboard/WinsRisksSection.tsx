import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, AlertTriangle } from "lucide-react";
import { FinancialData } from "@/types/financial";

interface WinsRisksSectionProps {
  latestReport: FinancialData | null;
  previousReport: FinancialData | null;
}

interface Insight {
  text: string;
  type: "win" | "risk";
}

export const WinsRisksSection = ({ latestReport, previousReport }: WinsRisksSectionProps) => {
  if (!latestReport || !previousReport) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>This Month's Wins vs Risks to Watch</CardTitle>
          <CardDescription>Submit at least two reports to see performance analysis</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const calculateInsights = (): { wins: string[]; risks: string[] } => {
    const wins: string[] = [];
    const risks: string[] = [];

    // Calculate totals for both periods
    const latestIncome = Object.values(latestReport.income).reduce((sum, val) => sum + val, 0);
    const previousIncome = Object.values(previousReport.income).reduce((sum, val) => sum + val, 0);
    
    const latestExpenses = Object.values(latestReport.expenses).reduce((sum, val) => sum + val, 0);
    const previousExpenses = Object.values(previousReport.expenses).reduce((sum, val) => sum + val, 0);
    
    const latestAssets = Object.values(latestReport.assets).reduce((sum, val) => sum + val, 0);
    const previousAssets = Object.values(previousReport.assets).reduce((sum, val) => sum + val, 0);
    
    const latestLiabilities = Object.values(latestReport.liabilities).reduce((sum, val) => sum + val, 0);
    const previousLiabilities = Object.values(previousReport.liabilities).reduce((sum, val) => sum + val, 0);

    const latestNetWorth = latestAssets - latestLiabilities;
    const previousNetWorth = previousAssets - previousLiabilities;
    
    const latestSavingsRate = latestIncome > 0 ? ((latestIncome - latestExpenses) / latestIncome) * 100 : 0;
    const previousSavingsRate = previousIncome > 0 ? ((previousIncome - previousExpenses) / previousIncome) * 100 : 0;

    // Savings rate analysis
    if (latestSavingsRate > previousSavingsRate && Math.abs(latestSavingsRate - previousSavingsRate) > 1) {
      wins.push(`Savings rate increased from ${previousSavingsRate.toFixed(1)}% → ${latestSavingsRate.toFixed(1)}%`);
    } else if (latestSavingsRate < previousSavingsRate && Math.abs(latestSavingsRate - previousSavingsRate) > 1) {
      risks.push(`Savings rate decreased from ${previousSavingsRate.toFixed(1)}% → ${latestSavingsRate.toFixed(1)}%`);
    }

    // Housing expense analysis
    const latestHousing = latestReport.expenses.homeLoan + latestReport.expenses.homeMaintenance + latestReport.expenses.homeUtilities;
    const previousHousing = previousReport.expenses.homeLoan + previousReport.expenses.homeMaintenance + previousReport.expenses.homeUtilities;
    const latestHousingPercent = latestIncome > 0 ? (latestHousing / latestIncome) * 100 : 0;
    const previousHousingPercent = previousIncome > 0 ? (previousHousing / previousIncome) * 100 : 0;
    
    if (latestHousingPercent < previousHousingPercent && Math.abs(latestHousingPercent - previousHousingPercent) > 2) {
      wins.push(`Housing dropped from ${previousHousingPercent.toFixed(0)}% → ${latestHousingPercent.toFixed(0)}% of take-home`);
    } else if (latestHousingPercent > 30) {
      risks.push(`Housing expenses at ${latestHousingPercent.toFixed(0)}% of income (target: <30%)`);
    }

    // Investment accounts growth
    const latestInvestments = latestReport.assets.stocks + latestReport.assets.retirement;
    const previousInvestments = previousReport.assets.stocks + previousReport.assets.retirement;
    const investmentGrowth = latestInvestments - previousInvestments;
    
    if (investmentGrowth > 0) {
      wins.push(`You added $${investmentGrowth.toLocaleString()} to investment accounts`);
    } else if (investmentGrowth < -500) {
      risks.push(`Investment accounts decreased by $${Math.abs(investmentGrowth).toLocaleString()}`);
    }

    // Discretionary spending analysis
    const latestDiscretionary = latestReport.expenses.shopping + latestReport.expenses.travelVacation + latestReport.expenses.subscriptions;
    const previousDiscretionary = previousReport.expenses.shopping + previousReport.expenses.travelVacation + previousReport.expenses.subscriptions;
    const discretionaryChange = previousDiscretionary > 0 ? ((latestDiscretionary - previousDiscretionary) / previousDiscretionary) * 100 : 0;
    
    if (discretionaryChange > 15) {
      risks.push(`Discretionary spending +${discretionaryChange.toFixed(0)}% vs last month`);
    } else if (discretionaryChange < -15) {
      wins.push(`Discretionary spending reduced by ${Math.abs(discretionaryChange).toFixed(0)}%`);
    }

    // Net worth growth
    const netWorthGrowth = previousNetWorth > 0 ? ((latestNetWorth - previousNetWorth) / previousNetWorth) * 100 : 0;
    const previousNetWorthGrowth = 1.8; // Mock previous growth rate
    
    if (netWorthGrowth > 0 && netWorthGrowth < 1) {
      risks.push(`Net worth growth slowed to ${netWorthGrowth.toFixed(1)}%`);
    } else if (netWorthGrowth > 2) {
      wins.push(`Strong net worth growth of ${netWorthGrowth.toFixed(1)}%`);
    }

    // Debt payment analysis
    const latestDebtPayments = latestReport.expenses.carLoans + latestReport.expenses.creditCards + latestReport.expenses.schoolLoans;
    const debtPaymentPercent = latestIncome > 0 ? (latestDebtPayments / latestIncome) * 100 : 0;
    
    if (debtPaymentPercent > 20) {
      risks.push(`Debt payments > 20% of income (${debtPaymentPercent.toFixed(0)}%)`);
    } else if (latestLiabilities < previousLiabilities) {
      const debtReduction = previousLiabilities - latestLiabilities;
      wins.push(`Total debt reduced by $${debtReduction.toLocaleString()}`);
    }

    return { wins, risks };
  };

  const { wins, risks } = calculateInsights();

  return (
    <Card>
      <CardHeader>
        <CardTitle>This Month's Wins vs Risks to Watch</CardTitle>
        <CardDescription>Performance analysis comparing your latest reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">This Month's Wins</h3>
            </div>
            {wins.length > 0 ? (
              <ul className="space-y-3">
                {wins.map((win, index) => (
                  <li key={index} className="text-sm text-muted-foreground p-3 rounded-lg bg-primary/5 border-l-2 border-primary">
                    {win}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground italic">No significant improvements detected this period.</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <h3 className="font-semibold text-foreground">Risks to Watch</h3>
            </div>
            {risks.length > 0 ? (
              <ul className="space-y-3">
                {risks.map((risk, index) => (
                  <li key={index} className="text-sm text-muted-foreground p-3 rounded-lg bg-destructive/5 border-l-2 border-destructive">
                    {risk}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground italic">No significant risks detected. Keep up the good work.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

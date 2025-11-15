import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialData } from "@/types/financial";

interface MilestonesSectionProps {
  latestReport: FinancialData | null;
  annualIncome: number;
}

interface Milestone {
  id: string;
  category: "liquidity" | "debt" | "wealth";
  title: string;
  progress: number;
  message: string;
}

export const MilestonesSection = ({ latestReport, annualIncome }: MilestonesSectionProps) => {
  if (!latestReport) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Milestones & Achievements</CardTitle>
          <CardDescription>Submit your first financial statement to track progress</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const calculateMilestones = (): Milestone[] => {
    const totalIncome = Object.values(latestReport.income).reduce((sum, val) => sum + val, 0);
    const totalExpenses = Object.values(latestReport.expenses).reduce((sum, val) => sum + val, 0);
    const monthlyExpenses = totalExpenses;
    
    const totalAssets = Object.values(latestReport.assets).reduce((sum, val) => sum + val, 0);
    const totalLiabilities = Object.values(latestReport.liabilities).reduce((sum, val) => sum + val, 0);
    const netWorth = totalAssets - totalLiabilities;
    
    const liquidAssets = latestReport.assets.bankAccounts + latestReport.assets.stocks + latestReport.assets.retirement;
    
    const highInterestDebt = latestReport.liabilities.creditCards + latestReport.liabilities.personalLoans;
    const consumerDebt = highInterestDebt + latestReport.liabilities.carLoans;
    const debtToIncomeRatio = totalIncome > 0 ? (totalLiabilities / (totalIncome * 12)) * 100 : 0;

    const milestones: Milestone[] = [];

    // Liquidity Milestones
    const oneMonthProgress = Math.min((liquidAssets / monthlyExpenses) * 100, 100);
    const oneMonthRemaining = Math.max(monthlyExpenses - liquidAssets, 0);
    milestones.push({
      id: "1month",
      category: "liquidity",
      title: "1 Month of Expenses Saved",
      progress: oneMonthProgress,
      message: oneMonthProgress >= 100 
        ? "Milestone achieved" 
        : `You're $${oneMonthRemaining.toLocaleString()} away from '1 Month of Expenses Saved'.`
    });

    const threeMonthProgress = Math.min((liquidAssets / (monthlyExpenses * 3)) * 100, 100);
    const threeMonthRemaining = Math.max(monthlyExpenses * 3 - liquidAssets, 0);
    milestones.push({
      id: "3months",
      category: "liquidity",
      title: "3 Months of Expenses Saved",
      progress: threeMonthProgress,
      message: threeMonthProgress >= 100 
        ? "Milestone achieved" 
        : `You're $${threeMonthRemaining.toLocaleString()} away from '3 Months of Expenses Saved'.`
    });

    const sixMonthProgress = Math.min((liquidAssets / (monthlyExpenses * 6)) * 100, 100);
    const sixMonthRemaining = Math.max(monthlyExpenses * 6 - liquidAssets, 0);
    milestones.push({
      id: "6months",
      category: "liquidity",
      title: "6 Months – Emergency Fund Secured",
      progress: sixMonthProgress,
      message: sixMonthProgress >= 100 
        ? "Emergency fund secured" 
        : `You're $${sixMonthRemaining.toLocaleString()} away from 'Emergency Fund Secured'.`
    });

    // Debt Milestones
    const highInterestProgress = highInterestDebt === 0 ? 100 : 0;
    milestones.push({
      id: "highinterest",
      category: "debt",
      title: "High-Interest Debt Cleared",
      progress: highInterestProgress,
      message: highInterestProgress >= 100 
        ? "High-interest debt cleared" 
        : `$${highInterestDebt.toLocaleString()} in high-interest debt remaining.`
    });

    const debtToIncomeProgress = debtToIncomeRatio <= 20 ? 100 : Math.max(100 - (debtToIncomeRatio - 20) * 5, 0);
    milestones.push({
      id: "debtincome",
      category: "debt",
      title: "Debt-to-Income Below 20%",
      progress: debtToIncomeProgress,
      message: debtToIncomeProgress >= 100 
        ? "Debt-to-income ratio healthy" 
        : `Current ratio: ${debtToIncomeRatio.toFixed(1)}%. Target: Below 20%.`
    });

    const consumerDebtProgress = consumerDebt === 0 ? 100 : 0;
    milestones.push({
      id: "consumerfree",
      category: "debt",
      title: "Consumer Debt-Free",
      progress: consumerDebtProgress,
      message: consumerDebtProgress >= 100 
        ? "Consumer debt eliminated" 
        : `$${consumerDebt.toLocaleString()} in consumer debt remaining.`
    });

    // Wealth Milestones
    const tenKProgress = Math.min((netWorth / 10000) * 100, 100);
    const tenKRemaining = Math.max(10000 - netWorth, 0);
    milestones.push({
      id: "10k",
      category: "wealth",
      title: "First $10k Net Worth",
      progress: tenKProgress,
      message: tenKProgress >= 100 
        ? "First $10k achieved" 
        : `$${tenKRemaining.toLocaleString()} away from first $10k net worth.`
    });

    const hundredKProgress = Math.min((netWorth / 100000) * 100, 100);
    const hundredKRemaining = Math.max(100000 - netWorth, 0);
    milestones.push({
      id: "100k",
      category: "wealth",
      title: "First $100k Net Worth",
      progress: hundredKProgress,
      message: hundredKProgress >= 100 
        ? "First $100k achieved" 
        : `$${hundredKRemaining.toLocaleString()} away from first $100k net worth.`
    });

    const oneXIncomeProgress = annualIncome > 0 ? Math.min((netWorth / annualIncome) * 100, 100) : 0;
    const oneXRemaining = Math.max(annualIncome - netWorth, 0);
    milestones.push({
      id: "1xincome",
      category: "wealth",
      title: "Net Worth 1x Annual Income",
      progress: oneXIncomeProgress,
      message: oneXIncomeProgress >= 100 
        ? "Net worth exceeds annual income" 
        : `$${oneXRemaining.toLocaleString()} away from 1x annual income.`
    });

    const fiveXIncomeProgress = annualIncome > 0 ? Math.min((netWorth / (annualIncome * 5)) * 100, 100) : 0;
    const fiveXRemaining = Math.max(annualIncome * 5 - netWorth, 0);
    milestones.push({
      id: "5xincome",
      category: "wealth",
      title: "Net Worth 5x Annual Income",
      progress: fiveXIncomeProgress,
      message: fiveXIncomeProgress >= 100 
        ? "Net worth exceeds 5x annual income" 
        : `$${fiveXRemaining.toLocaleString()} away from 5x annual income.`
    });

    return milestones;
  };

  const milestones = calculateMilestones();
  const liquidityMilestones = milestones.filter(m => m.category === "liquidity");
  const debtMilestones = milestones.filter(m => m.category === "debt");
  const wealthMilestones = milestones.filter(m => m.category === "wealth");

  const MilestoneCard = ({ milestone }: { milestone: Milestone }) => (
    <div className="space-y-3 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm">{milestone.title}</h4>
        <span className="text-xs font-semibold text-muted-foreground">
          {milestone.progress.toFixed(0)}%
        </span>
      </div>
      <Progress value={milestone.progress} className="h-2" />
      <p className="text-xs text-muted-foreground leading-relaxed">{milestone.message}</p>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Milestones & Achievements</CardTitle>
        <CardDescription>Professional benchmarks tracking your financial progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold mb-3 text-foreground">Liquidity Milestones</h3>
          <div className="grid gap-3 md:grid-cols-3">
            {liquidityMilestones.map(milestone => (
              <MilestoneCard key={milestone.id} milestone={milestone} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3 text-foreground">Debt Milestones</h3>
          <div className="grid gap-3 md:grid-cols-3">
            {debtMilestones.map(milestone => (
              <MilestoneCard key={milestone.id} milestone={milestone} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3 text-foreground">Wealth Milestones</h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {wealthMilestones.map(milestone => (
              <MilestoneCard key={milestone.id} milestone={milestone} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

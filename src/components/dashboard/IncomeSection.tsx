import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FinancialData } from "@/pages/Index";

interface IncomeSectionProps {
  income: FinancialData["income"];
  updateIncome: (field: keyof FinancialData["income"], value: number) => void;
  totalEarned: number;
  totalPassive: number;
  totalPortfolio: number;
  totalIncome: number;
}

const IncomeSection = ({
  income,
  updateIncome,
  totalEarned,
  totalPassive,
  totalPortfolio,
  totalIncome,
}: IncomeSectionProps) => {
  const handleChange = (field: keyof FinancialData["income"], value: string) => {
    updateIncome(field, parseFloat(value) || 0);
  };

  return (
    <Card className="shadow-lg border-primary/10 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-2xl">Income</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">A. Earned Income</h3>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Earned #1</Label>
              <Input
                type="number"
                step="0.01"
                value={income.earned1}
                onChange={(e) => handleChange("earned1", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Earned #2</Label>
              <Input
                type="number"
                step="0.01"
                value={income.earned2}
                onChange={(e) => handleChange("earned2", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
            <Label className="self-center font-semibold">Earned Total</Label>
            <div className="px-3 py-2 bg-secondary rounded-md text-right font-semibold">
              ${totalEarned.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">B. Passive Income</h3>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Real Estate (NET)</Label>
              <Input
                type="number"
                step="0.01"
                value={income.realEstate}
                onChange={(e) => handleChange("realEstate", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Business (NET)</Label>
              <Input
                type="number"
                step="0.01"
                value={income.business}
                onChange={(e) => handleChange("business", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
            <Label className="self-center font-semibold">Passive Total</Label>
            <div className="px-3 py-2 bg-secondary rounded-md text-right font-semibold">
              ${totalPassive.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">C. Portfolio Income</h3>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Interest</Label>
              <Input
                type="number"
                step="0.01"
                value={income.interest}
                onChange={(e) => handleChange("interest", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Dividends</Label>
              <Input
                type="number"
                step="0.01"
                value={income.dividends}
                onChange={(e) => handleChange("dividends", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Other</Label>
              <Input
                type="number"
                step="0.01"
                value={income.other}
                onChange={(e) => handleChange("other", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
            <Label className="self-center font-semibold">Portfolio Total</Label>
            <div className="px-3 py-2 bg-secondary rounded-md text-right font-semibold">
              ${totalPortfolio.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4 border-t-2 border-primary">
          <Label className="self-center font-bold text-lg">D. TOTAL INCOME</Label>
          <div className="px-3 py-2 bg-primary text-primary-foreground rounded-md text-right font-bold text-lg">
            ${totalIncome.toFixed(2)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeSection;

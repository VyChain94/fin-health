import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FinancialData } from "@/types/financial";
import DataSourceDropdown, { DataSource } from "./DataSourceDropdown";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";
interface IncomeSectionProps {
  income: FinancialData["income"];
  updateIncome: (field: keyof FinancialData["income"], value: number) => void;
  totalEarned: number;
  totalPassive: number;
  totalPortfolio: number;
  totalIncome: number;
  dataSources: DataSource[];
  onAddSource: (source: Omit<DataSource, "id">) => void;
  onRemoveSource: (id: string) => void;
}
const IncomeSection = ({
  income,
  updateIncome,
  totalEarned,
  totalPassive,
  totalPortfolio,
  totalIncome,
  dataSources,
  onAddSource,
  onRemoveSource
}: IncomeSectionProps) => {
  const handleChange = (field: keyof FinancialData["income"], value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      updateIncome(field, parseFloat(value) || 0);
    }
  };
  const formatCurrency = (value: number) => {
    return value === 0 ? '' : value.toString();
  };
  return <Card className="shadow-lg border-primary/10 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Income</CardTitle>
          <DataSourceDropdown sectionName="Income" dataSources={dataSources} onAddSource={onAddSource} onRemoveSource={onRemoveSource} />
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-2">
            <h3 className="font-semibold text-lg">A. Earned Income</h3>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Info className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <p className="text-sm">​Put the Gross (w/o taxes taken out) amount from your monthly pay here. If there are deductions from your paycheck, such as taxes or insurance, include those in your expenses below.</p>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Earned #1</Label>
              <Input type="text" inputMode="decimal" value={formatCurrency(income.earned1)} onChange={e => handleChange("earned1", e.target.value)} className="transition-all focus:ring-2 focus:ring-primary" placeholder="$0" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Earned #2</Label>
              <Input type="text" inputMode="decimal" value={formatCurrency(income.earned2)} onChange={e => handleChange("earned2", e.target.value)} className="transition-all focus:ring-2 focus:ring-primary" placeholder="$0" />
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
              <div className="flex items-center gap-1">
                <Label className="self-center text-sm">Real Estate (NET)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Info className="h-3 w-3" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <p className="text-sm">Write the net income (i.e. cash flow after taxes and expenses) from your real estate investment(s) here.</p>
                  </PopoverContent>
                </Popover>
              </div>
              <Input type="text" inputMode="decimal" value={formatCurrency(income.realEstate)} onChange={e => handleChange("realEstate", e.target.value)} className="transition-all focus:ring-2 focus:ring-primary" placeholder="$0" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-1">
                <Label className="self-center text-sm">Business (NET)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Info className="h-3 w-3" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <p className="text-sm">


Write the net income (i.e. cash flow after taxes and expenses) from your business(es) here.


                  </p>
                  </PopoverContent>
                </Popover>
              </div>
              <Input type="text" inputMode="decimal" value={formatCurrency(income.business)} onChange={e => handleChange("business", e.target.value)} className="transition-all focus:ring-2 focus:ring-primary" placeholder="$0" />
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
              <Input type="text" inputMode="decimal" value={formatCurrency(income.interest)} onChange={e => handleChange("interest", e.target.value)} className="transition-all focus:ring-2 focus:ring-primary" placeholder="$0" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Dividends</Label>
              <Input type="text" inputMode="decimal" value={formatCurrency(income.dividends)} onChange={e => handleChange("dividends", e.target.value)} className="transition-all focus:ring-2 focus:ring-primary" placeholder="$0" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Other</Label>
              <Input type="text" inputMode="decimal" value={formatCurrency(income.other)} onChange={e => handleChange("other", e.target.value)} className="transition-all focus:ring-2 focus:ring-primary" placeholder="$0" />
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
    </Card>;
};
export default IncomeSection;
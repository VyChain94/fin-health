import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FinancialData } from "@/types/financial";
import DataSourceDropdown, { DataSource } from "./DataSourceDropdown";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";

interface LiabilitiesSectionProps {
  liabilities: FinancialData["liabilities"];
  updateLiabilities: (field: keyof FinancialData["liabilities"], value: number) => void;
  totalLiabilities: number;
  netWorthBanker: number;
  netWorthRichDad: number;
  dataSources: DataSource[];
  onAddSource: (source: Omit<DataSource, "id">) => void;
  onRemoveSource: (id: string) => void;
}

const LiabilitiesSection = ({
  liabilities,
  updateLiabilities,
  totalLiabilities,
  netWorthBanker,
  netWorthRichDad,
  dataSources,
  onAddSource,
  onRemoveSource,
}: LiabilitiesSectionProps) => {
  const handleChange = (field: keyof FinancialData["liabilities"], value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      updateLiabilities(field, parseFloat(value) || 0);
    }
  };

  const formatCurrency = (value: number) => {
    return value === 0 ? '' : value.toString();
  };

  return (
    <Card className="shadow-lg border-primary/10 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Liabilities</CardTitle>
          <DataSourceDropdown
            sectionName="Liabilities"
            dataSources={dataSources}
            onAddSource={onAddSource}
            onRemoveSource={onRemoveSource}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-2">
            <h3 className="font-semibold text-lg">J. Liabilities</h3>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Info className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <p className="text-sm">Write the current balances of your outstanding debts in the appropriate fields.</p>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Credit Cards</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={formatCurrency(liabilities.creditCards)}
                onChange={(e) => handleChange("creditCards", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
                placeholder="$0"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Car Loans</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={formatCurrency(liabilities.carLoans)}
                onChange={(e) => handleChange("carLoans", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
                placeholder="$0"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Home Mortgage</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={formatCurrency(liabilities.homeMortgage)}
                onChange={(e) => handleChange("homeMortgage", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
                placeholder="$0"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Personal Loans</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={formatCurrency(liabilities.personalLoans)}
                onChange={(e) => handleChange("personalLoans", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
                placeholder="$0"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">School Loans</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={formatCurrency(liabilities.schoolLoans)}
                onChange={(e) => handleChange("schoolLoans", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
                placeholder="$0"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Other Debt</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={formatCurrency(liabilities.otherDebt)}
                onChange={(e) => handleChange("otherDebt", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
                placeholder="$0"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4 border-t-2 border-primary">
          <Label className="self-center font-bold text-lg">J. TOTAL LIABILITIES</Label>
          <div className="px-3 py-2 bg-primary text-primary-foreground rounded-md text-right font-bold text-lg">
            ${totalLiabilities.toFixed(2)}
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t">
          <div className="grid grid-cols-2 gap-3">
            <Label className="self-center font-bold text-blue-600 dark:text-blue-400">
              K. NET WORTH per Banker
            </Label>
            <div className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md text-right font-bold">
              ${netWorthBanker.toFixed(2)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Label className="self-center font-bold text-green-600 dark:text-green-400">
              L. NET WORTH per Rich Dad
            </Label>
            <div className="px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md text-right font-bold">
              ${netWorthRichDad.toFixed(2)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiabilitiesSection;

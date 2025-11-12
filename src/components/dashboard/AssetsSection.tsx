import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FinancialData } from "@/pages/Index";
import DataSourceDropdown, { DataSource } from "./DataSourceDropdown";
import { formatCurrency } from "@/lib/formatters";

interface AssetsSectionProps {
  assets: FinancialData["assets"];
  updateAssets: (field: keyof FinancialData["assets"], value: number) => void;
  totalAssets: number;
  totalDoodads: number;
  netWorthBanker: number;
  netWorthRichDad: number;
  dataSources: DataSource[];
  onAddSource: (source: Omit<DataSource, "id">) => void;
  onRemoveSource: (id: string) => void;
  showAmounts?: boolean;
}

const AssetsSection = ({
  assets,
  updateAssets,
  totalAssets,
  totalDoodads,
  netWorthBanker,
  netWorthRichDad,
  dataSources,
  onAddSource,
  onRemoveSource,
  showAmounts = true,
}: AssetsSectionProps) => {
  const handleChange = (field: keyof FinancialData["assets"], value: string) => {
    updateAssets(field, parseFloat(value) || 0);
  };

  return (
    <Card className="shadow-lg border-primary/10 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Assets</CardTitle>
          <DataSourceDropdown
            sectionName="Assets"
            dataSources={dataSources}
            onAddSource={onAddSource}
            onRemoveSource={onRemoveSource}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">F. Assets</h3>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Bank Accounts</Label>
              <Input
                type="number"
                step="0.01"
                value={assets.bankAccounts}
                onChange={(e) => handleChange("bankAccounts", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Precious Metals</Label>
              <Input
                type="number"
                step="0.01"
                value={assets.preciousMetals}
                onChange={(e) => handleChange("preciousMetals", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Retirement (401K, IRA)</Label>
              <Input
                type="number"
                step="0.01"
                value={assets.retirement}
                onChange={(e) => handleChange("retirement", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Stocks & Bonds</Label>
              <Input
                type="number"
                step="0.01"
                value={assets.stocks}
                onChange={(e) => handleChange("stocks", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Other</Label>
              <Input
                type="number"
                step="0.01"
                value={assets.otherAssets}
                onChange={(e) => handleChange("otherAssets", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Business (fair value less loans)</Label>
              <Input
                type="number"
                step="0.01"
                value={assets.business}
                onChange={(e) => handleChange("business", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Real Estate (fair value less mortgage)</Label>
              <Input
                type="number"
                step="0.01"
                value={assets.realEstate}
                onChange={(e) => handleChange("realEstate", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
            <Label className="self-center font-semibold">F. ASSETS SUBTOTAL</Label>
            <div className="px-3 py-2 bg-secondary rounded-md text-right font-semibold">
              {formatCurrency(totalAssets, showAmounts)}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">G. Doodads</h3>
...
          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
            <Label className="self-center font-semibold">G. DOODADS TOTAL</Label>
            <div className="px-3 py-2 bg-secondary rounded-md text-right font-semibold">
              {formatCurrency(totalDoodads, showAmounts)}
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t-2 border-primary">
          <div className="grid grid-cols-2 gap-3">
            <Label className="self-center font-bold">H. TOTAL ASSETS per Banker</Label>
            <div className="px-3 py-2 bg-primary text-primary-foreground rounded-md text-right font-bold">
              {formatCurrency(totalAssets, showAmounts)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Label className="self-center font-bold">I. TOTAL ASSETS per Rich Dad</Label>
            <div className="px-3 py-2 bg-primary text-primary-foreground rounded-md text-right font-bold">
              {formatCurrency(totalAssets - totalDoodads, showAmounts)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetsSection;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FinancialData } from "@/types/financial";
import DataSourceDropdown, { DataSource } from "./DataSourceDropdown";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";

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
}: AssetsSectionProps) => {
  const handleChange = (field: keyof FinancialData["assets"], value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      updateAssets(field, parseFloat(value) || 0);
    }
  };

  const formatCurrency = (value: number) => {
    return value === 0 ? '' : value.toString();
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
          <div className="flex items-center gap-2 border-b pb-2">
            <h3 className="font-semibold text-lg">F. Assets</h3>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Info className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <p className="text-sm">Write the approximate current value of all your assets in the appropriate fields.</p>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Bank Accounts</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={formatCurrency(assets.bankAccounts)}
                onChange={(e) => handleChange("bankAccounts", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
                placeholder="$0"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Precious Metals</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={formatCurrency(assets.preciousMetals)}
                onChange={(e) => handleChange("preciousMetals", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
                placeholder="$0"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Retirement (401K, IRA)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={formatCurrency(assets.retirement)}
                onChange={(e) => handleChange("retirement", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
                placeholder="$0"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Stocks & Bonds</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={formatCurrency(assets.stocks)}
                onChange={(e) => handleChange("stocks", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
                placeholder="$0"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Other</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={formatCurrency(assets.otherAssets)}
                onChange={(e) => handleChange("otherAssets", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
                placeholder="$0"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Business (fair value less loans)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={formatCurrency(assets.business)}
                onChange={(e) => handleChange("business", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
                placeholder="$0"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Real Estate (fair value less mortgage)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={formatCurrency(assets.realEstate)}
                onChange={(e) => handleChange("realEstate", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
                placeholder="$0"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
            <Label className="self-center font-semibold">Assets Total</Label>
            <div className="px-3 py-2 bg-secondary rounded-md text-right font-semibold">
              ${totalAssets.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-2">
            <h3 className="font-semibold text-lg">G. Doodads (cost you money)</h3>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Info className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <p className="text-sm">Doodads are valuable things that you own, but unlike real assets, they don't put money in your pocket but instead take money out of your pocket.</p>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-1">
                <Label className="self-center text-sm">Home</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Info className="h-3 w-3" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <p className="text-sm">Write the approximate current value of your home here. Your mortgage will be accounted for in the liabilities section.</p>
                  </PopoverContent>
                </Popover>
              </div>
              <Input
                type="text"
                inputMode="decimal"
                value={formatCurrency(assets.doodadsHome)}
                onChange={(e) => handleChange("doodadsHome", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
                placeholder="$0"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Car(s)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={formatCurrency(assets.doodadsCar)}
                onChange={(e) => handleChange("doodadsCar", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
                placeholder="$0"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label className="self-center text-sm">Other</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={formatCurrency(assets.doodadsOther)}
                onChange={(e) => handleChange("doodadsOther", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary"
                placeholder="$0"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
            <Label className="self-center font-semibold">G. DOODADS TOTAL</Label>
            <div className="px-3 py-2 bg-secondary rounded-md text-right font-semibold">
              ${totalDoodads.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t-2 border-primary">
          <div className="grid grid-cols-2 gap-3">
            <Label className="self-center font-bold">H. TOTAL ASSETS per Banker</Label>
            <div className="px-3 py-2 bg-primary text-primary-foreground rounded-md text-right font-bold">
              ${(totalAssets + totalDoodads).toFixed(2)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Label className="self-center font-bold">I. TOTAL ASSETS per Rich Dad</Label>
            <div className="px-3 py-2 bg-primary text-primary-foreground rounded-md text-right font-bold">
              ${totalAssets.toFixed(2)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetsSection;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, RefreshCw } from "lucide-react";
import { Income, AssetBucket } from "@/types/moneyLevels";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface IncomeAssetsStepProps {
  incomes: Income[];
  assets: AssetBucket[];
  monthlyContribution?: number;
  mode: 'simple' | 'advanced';
  onUpdateIncomes: (incomes: Income[]) => void;
  onUpdateAssets: (assets: AssetBucket[]) => void;
  onUpdateContribution: (amount: number) => void;
}

export function IncomeAssetsStep({
  incomes,
  assets,
  monthlyContribution,
  mode,
  onUpdateIncomes,
  onUpdateAssets,
  onUpdateContribution
}: IncomeAssetsStepProps) {
  const [showAssetTypeDialog, setShowAssetTypeDialog] = useState(false);
  const [loadingPrices, setLoadingPrices] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const addIncome = () => {
    onUpdateIncomes([...incomes, { label: 'New Income', annual: 0 }]);
  };

  const updateIncome = (index: number, updates: Partial<Income>) => {
    const updated = [...incomes];
    updated[index] = { ...updated[index], ...updates };
    onUpdateIncomes(updated);
  };

  const removeIncome = (index: number) => {
    onUpdateIncomes(incomes.filter((_, i) => i !== index));
  };

  const addAsset = () => {
    setShowAssetTypeDialog(true);
  };

  const addRegularAsset = () => {
    onUpdateAssets([...assets, { 
      label: 'New Asset', 
      balance: 0, 
      yieldPct: mode === 'advanced' ? 4 : undefined,
      assetType: 'regular'
    }]);
    setShowAssetTypeDialog(false);
  };

  const addStockAsset = () => {
    onUpdateAssets([...assets, { 
      label: 'Stock', 
      balance: 0,
      assetType: 'stock',
      ticker: '',
      quantity: 0,
      currentPrice: 0
    }]);
    setShowAssetTypeDialog(false);
  };

  const addCryptoAsset = () => {
    onUpdateAssets([...assets, { 
      label: 'Crypto', 
      balance: 0,
      assetType: 'crypto',
      ticker: '',
      quantity: 0,
      currentPrice: 0
    }]);
    setShowAssetTypeDialog(false);
  };

  const fetchAssetPrice = async (index: number, asset: AssetBucket) => {
    if (!asset.ticker || !asset.assetType || asset.assetType === 'regular') return;

    setLoadingPrices(prev => new Set(prev).add(index));

    try {
      const { data, error } = await supabase.functions.invoke('get-asset-price', {
        body: { assetType: asset.assetType, ticker: asset.ticker }
      });

      if (error) throw error;

      const newPrice = data.price;
      const newBalance = (asset.quantity || 0) * newPrice;

      updateAsset(index, {
        currentPrice: newPrice,
        balance: newBalance,
        lastPriceUpdate: new Date().toISOString()
      });

      toast({
        title: "Price Updated",
        description: `${asset.ticker.toUpperCase()}: $${newPrice.toFixed(2)}`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch price. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoadingPrices(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }
  };

  const addAmortizingAsset = () => {
    onUpdateAssets([...assets, { 
      label: 'Amortizing Asset', 
      balance: 0,
      isAmortizing: true,
      originalLoanAmount: 0,
      interestRate: 0,
      monthlyPayment: 0,
      remainingTerm: 0,
      startDate: new Date().toISOString().split('T')[0]
    }]);
    setShowAssetTypeDialog(false);
  };

  const updateAsset = (index: number, updates: Partial<AssetBucket>) => {
    const updated = [...assets];
    updated[index] = { ...updated[index], ...updates };
    onUpdateAssets(updated);
  };

  const removeAsset = (index: number) => {
    onUpdateAssets(assets.filter((_, i) => i !== index));
  };

  const calculateRemainingMonths = (asset: AssetBucket): number => {
    if (!asset.isAmortizing || !asset.startDate || !asset.remainingTerm) return 0;
    const start = new Date(asset.startDate);
    const now = new Date();
    const monthsElapsed = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    return Math.max(0, asset.remainingTerm - monthsElapsed);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Income Sources</CardTitle>
          <Button onClick={addIncome} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Income
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {incomes.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">No income sources added yet</p>
          ) : (
            incomes.map((income, idx) => (
              <div key={idx} className="grid grid-cols-[1fr,1fr,auto] gap-3 items-end">
                <div className="space-y-2">
                  <Label>Source</Label>
                  <Input
                    value={income.label}
                    onChange={(e) => updateIncome(idx, { label: e.target.value })}
                    placeholder="Salary, Business, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Annual Amount ($)</Label>
                  <Input
                    type="number"
                    value={income.annual}
                    onChange={(e) => updateIncome(idx, { annual: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeIncome(idx)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Current Investable Assets</CardTitle>
          <div className="flex gap-2">
            {showAssetTypeDialog ? (
              <>
                <Button onClick={addRegularAsset} size="sm" variant="outline">
                  Regular
                </Button>
                <Button onClick={addStockAsset} size="sm" variant="outline">
                  Stock
                </Button>
                <Button onClick={addCryptoAsset} size="sm" variant="outline">
                  Crypto
                </Button>
                <Button onClick={addAmortizingAsset} size="sm" variant="outline">
                  Amortizing
                </Button>
                <Button onClick={() => setShowAssetTypeDialog(false)} size="sm" variant="ghost">
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={addAsset} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Asset
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {assets.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">No assets added yet</p>
          ) : (
            assets.map((asset, idx) => (
              <div key={idx} className="space-y-3 p-4 border rounded-lg">
                {asset.isAmortizing ? (
                  <>
                    <div className="grid grid-cols-[1fr,1fr,auto] gap-3 items-end">
                      <div className="space-y-2">
                        <Label>Asset Name</Label>
                        <Input
                          value={asset.label}
                          onChange={(e) => updateAsset(idx, { label: e.target.value })}
                          placeholder="Car Loan, Mortgage, etc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Current Balance ($)</Label>
                        <Input
                          type="number"
                          value={asset.balance}
                          onChange={(e) => updateAsset(idx, { balance: parseFloat(e.target.value) || 0 })}
                        />
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeAsset(idx)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Original Loan Amount ($)</Label>
                        <Input
                          type="number"
                          value={asset.originalLoanAmount || 0}
                          onChange={(e) => updateAsset(idx, { originalLoanAmount: parseFloat(e.target.value) || 0 })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Interest Rate (%)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={asset.interestRate || 0}
                          onChange={(e) => updateAsset(idx, { interestRate: parseFloat(e.target.value) || 0 })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label>Monthly Payment ($)</Label>
                        <Input
                          type="number"
                          value={asset.monthlyPayment || 0}
                          onChange={(e) => updateAsset(idx, { monthlyPayment: parseFloat(e.target.value) || 0 })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Remaining Term (months)</Label>
                        <Input
                          type="number"
                          value={asset.remainingTerm || 0}
                          onChange={(e) => updateAsset(idx, { remainingTerm: parseFloat(e.target.value) || 0 })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          type="date"
                          value={asset.startDate || ''}
                          onChange={(e) => updateAsset(idx, { startDate: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="pt-2 border-t text-sm text-muted-foreground">
                      <p>Balance: ${asset.balance.toLocaleString()} | Months Remaining: {calculateRemainingMonths(asset)}</p>
                    </div>
                  </>
                ) : asset.assetType === 'stock' || asset.assetType === 'crypto' ? (
                  <>
                    <div className="grid grid-cols-[1fr,auto] gap-3 items-end">
                      <div className="space-y-2">
                        <Label>Asset Name</Label>
                        <Input
                          value={asset.label}
                          onChange={(e) => updateAsset(idx, { label: e.target.value })}
                          placeholder={asset.assetType === 'stock' ? 'Apple Stock' : 'Bitcoin'}
                        />
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeAsset(idx)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label>{asset.assetType === 'stock' ? 'Ticker Symbol' : 'Crypto ID'}</Label>
                        <Input
                          value={asset.ticker || ''}
                          onChange={(e) => updateAsset(idx, { ticker: e.target.value })}
                          placeholder={asset.assetType === 'stock' ? 'AAPL' : 'bitcoin'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          step="0.00000001"
                          value={asset.quantity || 0}
                          onChange={(e) => {
                            const newQuantity = parseFloat(e.target.value) || 0;
                            const newBalance = newQuantity * (asset.currentPrice || 0);
                            updateAsset(idx, { quantity: newQuantity, balance: newBalance });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Current Price</Label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            value={asset.currentPrice || 0}
                            disabled
                            className="bg-muted"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => fetchAssetPrice(idx, asset)}
                            disabled={loadingPrices.has(idx) || !asset.ticker}
                          >
                            {loadingPrices.has(idx) ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <RefreshCw className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t text-sm">
                      <p className="font-semibold">Total Value: ${asset.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                      {asset.lastPriceUpdate && (
                        <p className="text-muted-foreground text-xs">
                          Last updated: {new Date(asset.lastPriceUpdate).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className={`grid gap-3 items-end ${mode === 'advanced' ? 'grid-cols-[1fr,1fr,1fr,auto]' : 'grid-cols-[1fr,1fr,auto]'}`}>
                    <div className="space-y-2">
                      <Label>Asset Type</Label>
                      <Input
                        value={asset.label}
                        onChange={(e) => updateAsset(idx, { label: e.target.value })}
                        placeholder="Cash, Savings, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Balance ($)</Label>
                      <Input
                        type="number"
                        value={asset.balance}
                        onChange={(e) => updateAsset(idx, { balance: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    {mode === 'advanced' && (
                      <div className="space-y-2">
                        <Label>Yield (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={asset.yieldPct || 0}
                          onChange={(e) => updateAsset(idx, { yieldPct: parseFloat(e.target.value) || 0 })}
                        />
                      </div>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => removeAsset(idx)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
          
          <div className="pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="contribution">Monthly Investment Contribution ($)</Label>
              <Input
                id="contribution"
                type="number"
                value={monthlyContribution || ''}
                onChange={(e) => onUpdateContribution(parseFloat(e.target.value) || 0)}
                placeholder="1000"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

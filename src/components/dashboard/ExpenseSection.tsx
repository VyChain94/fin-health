import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FinancialData } from "@/types/financial";
import DataSourceDropdown, { DataSource } from "./DataSourceDropdown";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";

interface ExpenseSectionProps {
  expenses: FinancialData["expenses"];
  updateExpenses: (field: keyof FinancialData["expenses"], value: number) => void;
  totalExpenses: number;
  netMonthlyCashFlow: number;
  dataSources: DataSource[];
  onAddSource: (source: Omit<DataSource, "id">) => void;
  onRemoveSource: (id: string) => void;
}

const ExpenseSection = ({
  expenses,
  updateExpenses,
  totalExpenses,
  netMonthlyCashFlow,
  dataSources,
  onAddSource,
  onRemoveSource,
}: ExpenseSectionProps) => {
  const handleChange = (field: keyof FinancialData["expenses"], value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      updateExpenses(field, parseFloat(value) || 0);
    }
  };

  const formatCurrency = (value: number) => {
    return value === 0 ? '' : value.toString();
  };

  return (
    <Card className="shadow-lg border-primary/10 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Expenses</CardTitle>
          <DataSourceDropdown
            sectionName="Expenses"
            dataSources={dataSources}
            onAddSource={onAddSource}
            onRemoveSource={onRemoveSource}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="grid grid-cols-2 gap-2 items-center">
            <div className="flex items-center gap-1">
              <Label className="text-sm">Home Loan/Rent</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <Info className="h-3 w-3" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <p className="text-sm">Home Loan includes PITI (Principal, Interest, Taxes, and Insurance). As such, include your full mortgage payment, including property taxes and home insurance.</p>
                </PopoverContent>
              </Popover>
            </div>
            <Input
              type="text"
              inputMode="decimal"
              value={formatCurrency(expenses.homeLoan)}
              onChange={(e) => handleChange("homeLoan", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
              placeholder="$0"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Home Maintenance</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={formatCurrency(expenses.homeMaintenance)}
              onChange={(e) => handleChange("homeMaintenance", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
              placeholder="$0"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Home Utilities</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={formatCurrency(expenses.homeUtilities)}
              onChange={(e) => handleChange("homeUtilities", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
              placeholder="$0"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Car/Travel</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={formatCurrency(expenses.carTravel)}
              onChange={(e) => handleChange("carTravel", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
              placeholder="$0"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Cell Phones</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={formatCurrency(expenses.cellPhones)}
              onChange={(e) => handleChange("cellPhones", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
              placeholder="$0"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Investments</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={formatCurrency(expenses.investments)}
              onChange={(e) => handleChange("investments", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
              placeholder="$0"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Other</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={formatCurrency(expenses.otherExpenses)}
              onChange={(e) => handleChange("otherExpenses", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
              placeholder="$0"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Car Loans</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={formatCurrency(expenses.carLoans)}
              onChange={(e) => handleChange("carLoans", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
              placeholder="$0"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Credit Cards</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={formatCurrency(expenses.creditCards)}
              onChange={(e) => handleChange("creditCards", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
              placeholder="$0"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">School Loans</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={formatCurrency(expenses.schoolLoans)}
              onChange={(e) => handleChange("schoolLoans", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
              placeholder="$0"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Personal Care</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={formatCurrency(expenses.personalCare)}
              onChange={(e) => handleChange("personalCare", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
              placeholder="$0"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Subscriptions</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={formatCurrency(expenses.subscriptions)}
              onChange={(e) => handleChange("subscriptions", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
              placeholder="$0"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Shopping</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={formatCurrency(expenses.shopping)}
              onChange={(e) => handleChange("shopping", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
              placeholder="$0"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Travel/Vacation</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={formatCurrency(expenses.travelVacation)}
              onChange={(e) => handleChange("travelVacation", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
              placeholder="$0"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Medical Expenses</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={formatCurrency(expenses.medicalExpenses)}
              onChange={(e) => handleChange("medicalExpenses", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
              placeholder="$0"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Medical Insurance</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={formatCurrency(expenses.medicalInsurance)}
              onChange={(e) => handleChange("medicalInsurance", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
              placeholder="$0"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Taxes (Income)</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={formatCurrency(expenses.taxes)}
              onChange={(e) => handleChange("taxes", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
              placeholder="$0"
            />
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t-2 border-primary">
          <div className="grid grid-cols-2 gap-3">
            <Label className="self-center font-bold text-lg">E. TOTAL EXPENSES</Label>
            <div className="px-3 py-2 bg-primary text-primary-foreground rounded-md text-right font-bold text-lg">
              ${totalExpenses.toFixed(2)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
            <Label className="self-center font-bold text-lg text-green-600 dark:text-green-400">
              NET MONTHLY CASH FLOW
            </Label>
            <div className="px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md text-right font-bold text-lg">
              ${netMonthlyCashFlow.toFixed(2)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseSection;

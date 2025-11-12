import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FinancialData } from "@/pages/Index";
import DataSourceDropdown, { DataSource } from "./DataSourceDropdown";

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
    updateExpenses(field, parseFloat(value) || 0);
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
            <Label className="text-sm">Home Loan/Rent</Label>
            <Input
              type="number"
              step="0.01"
              value={expenses.homeLoan}
              onChange={(e) => handleChange("homeLoan", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Home Maintenance</Label>
            <Input
              type="number"
              step="0.01"
              value={expenses.homeMaintenance}
              onChange={(e) => handleChange("homeMaintenance", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Home Utilities</Label>
            <Input
              type="number"
              step="0.01"
              value={expenses.homeUtilities}
              onChange={(e) => handleChange("homeUtilities", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Car/Travel</Label>
            <Input
              type="number"
              step="0.01"
              value={expenses.carTravel}
              onChange={(e) => handleChange("carTravel", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Cell Phones</Label>
            <Input
              type="number"
              step="0.01"
              value={expenses.cellPhones}
              onChange={(e) => handleChange("cellPhones", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Investments</Label>
            <Input
              type="number"
              step="0.01"
              value={expenses.investments}
              onChange={(e) => handleChange("investments", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Other</Label>
            <Input
              type="number"
              step="0.01"
              value={expenses.otherExpenses}
              onChange={(e) => handleChange("otherExpenses", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Car Loans</Label>
            <Input
              type="number"
              step="0.01"
              value={expenses.carLoans}
              onChange={(e) => handleChange("carLoans", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Credit Cards</Label>
            <Input
              type="number"
              step="0.01"
              value={expenses.creditCards}
              onChange={(e) => handleChange("creditCards", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">School Loans</Label>
            <Input
              type="number"
              step="0.01"
              value={expenses.schoolLoans}
              onChange={(e) => handleChange("schoolLoans", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Personal Care</Label>
            <Input
              type="number"
              step="0.01"
              value={expenses.personalCare}
              onChange={(e) => handleChange("personalCare", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Subscriptions</Label>
            <Input
              type="number"
              step="0.01"
              value={expenses.subscriptions}
              onChange={(e) => handleChange("subscriptions", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Shopping</Label>
            <Input
              type="number"
              step="0.01"
              value={expenses.shopping}
              onChange={(e) => handleChange("shopping", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Travel/Vacation</Label>
            <Input
              type="number"
              step="0.01"
              value={expenses.travelVacation}
              onChange={(e) => handleChange("travelVacation", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Medical Expenses</Label>
            <Input
              type="number"
              step="0.01"
              value={expenses.medicalExpenses}
              onChange={(e) => handleChange("medicalExpenses", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Medical Insurance</Label>
            <Input
              type="number"
              step="0.01"
              value={expenses.medicalInsurance}
              onChange={(e) => handleChange("medicalInsurance", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-sm">Taxes (Income)</Label>
            <Input
              type="number"
              step="0.01"
              value={expenses.taxes}
              onChange={(e) => handleChange("taxes", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
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

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Copy } from "lucide-react";
import { LevelKey, LevelPlan, Income, ExpenseCategory, LEVEL_INFO, DEFAULT_EXPENSE_CATEGORIES } from "@/types/moneyLevels";

interface ExpensesStepProps {
  level: LevelKey;
  data: LevelPlan;
  onUpdate: (updates: Partial<LevelPlan>) => void;
  onCopyFromPrevious: () => void;
  canCopyFromPrevious: boolean;
}

export function ExpensesStep({ level, data, onUpdate, onCopyFromPrevious, canCopyFromPrevious }: ExpensesStepProps) {
  const levelInfo = LEVEL_INFO[level];

  const addExpense = (category?: string) => {
    onUpdate({
      expenses: [...data.expenses, { label: category || 'New Expense', monthly: 0 }]
    });
  };

  const updateExpense = (index: number, updates: Partial<ExpenseCategory>) => {
    const updated = [...data.expenses];
    updated[index] = { ...updated[index], ...updates };
    onUpdate({ expenses: updated });
  };

  const removeExpense = (index: number) => {
    onUpdate({ expenses: data.expenses.filter((_, i) => i !== index) });
  };

  const addPassiveIncome = () => {
    onUpdate({
      passiveIncome: [...data.passiveIncome, { label: 'New Income', annual: 0 }]
    });
  };

  const updatePassiveIncome = (index: number, updates: Partial<Income>) => {
    const updated = [...data.passiveIncome];
    updated[index] = { ...updated[index], ...updates };
    onUpdate({ passiveIncome: updated });
  };

  const removePassiveIncome = (index: number) => {
    onUpdate({ passiveIncome: data.passiveIncome.filter((_, i) => i !== index) });
  };

  const addDefaultCategories = () => {
    const newExpenses = DEFAULT_EXPENSE_CATEGORIES.map(cat => ({ label: cat, monthly: 0 }));
    onUpdate({ expenses: [...data.expenses, ...newExpenses] });
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">{levelInfo.title}</CardTitle>
          <CardDescription>{levelInfo.description}</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Monthly Expenses</CardTitle>
          <div className="flex gap-2">
            {canCopyFromPrevious && (
              <Button onClick={onCopyFromPrevious} size="sm" variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copy Previous
              </Button>
            )}
            {data.expenses.length === 0 && (
              <Button onClick={addDefaultCategories} size="sm" variant="outline">
                Add Default Categories
              </Button>
            )}
            <Button onClick={() => addExpense()} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.expenses.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">No expenses added yet</p>
          ) : (
            data.expenses.map((expense, idx) => (
              <div key={idx} className="grid grid-cols-[1fr,1fr,auto] gap-3 items-end">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    value={expense.label}
                    onChange={(e) => updateExpense(idx, { label: e.target.value })}
                    placeholder="Housing, Food, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Monthly ($)</Label>
                  <Input
                    type="number"
                    value={expense.monthly}
                    onChange={(e) => updateExpense(idx, { monthly: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeExpense(idx)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))
          )}
          <div className="pt-3 border-t font-semibold">
            Total Annual: ${(data.expenses.reduce((sum, e) => sum + e.monthly, 0) * 12).toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Passive Income (at this level)</CardTitle>
          <Button onClick={addPassiveIncome} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Income
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.passiveIncome.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">No passive income sources yet</p>
          ) : (
            data.passiveIncome.map((income, idx) => (
              <div key={idx} className="grid grid-cols-[1fr,1fr,auto] gap-3 items-end">
                <div className="space-y-2">
                  <Label>Source</Label>
                  <Input
                    value={income.label}
                    onChange={(e) => updatePassiveIncome(idx, { label: e.target.value })}
                    placeholder="Rentals, Dividends, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Annual ($)</Label>
                  <Input
                    type="number"
                    value={income.annual}
                    onChange={(e) => updatePassiveIncome(idx, { annual: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <Button variant="ghost" size="sm" onClick={() => removePassiveIncome(idx)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={data.notes || ''}
            onChange={(e) => onUpdate({ notes: e.target.value })}
            placeholder="Add any notes about this level..."
            rows={3}
          />
        </CardContent>
      </Card>
    </div>
  );
}

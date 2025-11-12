import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Pencil, HelpCircle } from "lucide-react";
import { LEVEL_INFO, LevelKey } from "@/types/moneyLevels";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LevelExpenses {
  housing: number;
  utilities: number;
  food: number;
  transportation: number;
  healthcare: number;
  insurance: number;
  entertainment: number;
  other: number;
}

interface FinancialFreedomTrackerProps {
  currentAssets: number;
  netMonthlyCashFlow: number;
  totalExpenses: number;
  levelTargets: Record<LevelKey, number>;
  onUpdateLevelTarget?: (level: LevelKey, newTarget: number) => void;
  withdrawalRate?: number;
}

const LEVELS: LevelKey[] = ['security', 'vitality', 'independence', 'freedom', 'absoluteFreedom'];

export default function FinancialFreedomTracker({ 
  currentAssets,
  netMonthlyCashFlow,
  totalExpenses,
  levelTargets, 
  onUpdateLevelTarget,
  withdrawalRate = 0.04 
}: FinancialFreedomTrackerProps) {
  const { toast } = useToast();
  const [isNumberHidden, setIsNumberHidden] = useState(false);
  const [editingLevel, setEditingLevel] = useState<LevelKey | null>(null);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [use4PercentRule, setUse4PercentRule] = useState(true);
  
  // Progress bar state - current is auto-calculated from NET MONTHLY CASH FLOW × 12
  const current = netMonthlyCashFlow * 12;
  const [goal, setGoal] = useState(600);
  const [selectedLevel, setSelectedLevel] = useState<LevelKey | 'custom'>('security');
  
  // Store expense breakdowns and 4% rule settings for each level
  const [savedExpenses, setSavedExpenses] = useState<Record<LevelKey, LevelExpenses>>({
    security: { housing: 0, utilities: 0, food: 0, transportation: 0, healthcare: 0, insurance: 0, entertainment: 0, other: 0 },
    vitality: { housing: 0, utilities: 0, food: 0, transportation: 0, healthcare: 0, insurance: 0, entertainment: 0, other: 0 },
    independence: { housing: 0, utilities: 0, food: 0, transportation: 0, healthcare: 0, insurance: 0, entertainment: 0, other: 0 },
    freedom: { housing: 0, utilities: 0, food: 0, transportation: 0, healthcare: 0, insurance: 0, entertainment: 0, other: 0 },
    absoluteFreedom: { housing: 0, utilities: 0, food: 0, transportation: 0, healthcare: 0, insurance: 0, entertainment: 0, other: 0 },
  });
  
  const [saved4PercentRule, setSaved4PercentRule] = useState<Record<LevelKey, boolean>>({
    security: true,
    vitality: true,
    independence: true,
    freedom: true,
    absoluteFreedom: true,
  });
  
  const [levelExpenses, setLevelExpenses] = useState<LevelExpenses>({
    housing: 0,
    utilities: 0,
    food: 0,
    transportation: 0,
    healthcare: 0,
    insurance: 0,
    entertainment: 0,
    other: 0,
  });
  
  // Get monthly expenses for a level from saved expenses
  const getMonthlyExpenses = (level: LevelKey): number => {
    return Object.values(savedExpenses[level]).reduce((sum, val) => sum + val, 0);
  };

  // Determine current level based on total expenses covering monthly expenses
  const getCurrentLevel = (): { level: LevelKey; index: number } | null => {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      const level = LEVELS[i];
      const monthlyExpenses = getMonthlyExpenses(level);
      if (monthlyExpenses > 0 && totalExpenses >= monthlyExpenses) {
        return { level, index: i };
      }
    }
    return null;
  };

  const currentLevel = getCurrentLevel();
  const nextLevelIndex = currentLevel ? Math.min(currentLevel.index + 1, LEVELS.length - 1) : 0;
  const nextLevel = LEVELS[nextLevelIndex];
  const nextLevelMonthlyExpenses = getMonthlyExpenses(nextLevel);
  
  // Calculate overall progress to next level based on total expenses
  const progressToNextLevel = nextLevelMonthlyExpenses > 0
    ? Math.min((totalExpenses / nextLevelMonthlyExpenses) * 100, 100)
    : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleEditClick = (level: LevelKey) => {
    setEditingLevel(level);
    // Load previously saved expenses and 4% rule setting for this level
    setLevelExpenses(savedExpenses[level]);
    setUse4PercentRule(saved4PercentRule[level]);
  };

  const handleExpenseChange = (field: keyof LevelExpenses, value: string) => {
    const numValue = parseFloat(value) || 0;
    // Validate input is positive and reasonable (max $1M per category)
    if (numValue < 0 || numValue > 1000000) return;
    
    setLevelExpenses(prev => ({
      ...prev,
      [field]: numValue,
    }));
  };

  const calculateTargetFromExpenses = () => {
    const monthlyExpenses = Object.values(levelExpenses).reduce((sum, val) => sum + val, 0);
    const annualExpenses = monthlyExpenses * 12;
    return annualExpenses / withdrawalRate;
  };

  const handleSaveExpenses = () => {
    if (!editingLevel || !onUpdateLevelTarget) return;

    const totalMonthly = Object.values(levelExpenses).reduce((sum, val) => sum + val, 0);
    
    if (totalMonthly === 0) {
      toast({
        title: "No expenses entered",
        description: "Please enter at least one expense category.",
        variant: "destructive",
      });
      return;
    }

    const newTarget = use4PercentRule 
      ? calculateTargetFromExpenses() 
      : totalMonthly * 12;

    // Save the expense breakdown and 4% rule setting for this level
    setSavedExpenses(prev => ({
      ...prev,
      [editingLevel]: levelExpenses,
    }));
    
    setSaved4PercentRule(prev => ({
      ...prev,
      [editingLevel]: use4PercentRule,
    }));

    onUpdateLevelTarget(editingLevel, newTarget);
    
    toast({
      title: "Target Updated",
      description: `${LEVEL_INFO[editingLevel].title} target set to ${formatCurrency(newTarget)}`,
    });
    
    setEditingLevel(null);
  };

  const handleCancelEdit = () => {
    setEditingLevel(null);
  };

  // Progress bar calculations
  const progressRaw = goal > 0 ? current / goal : 0;
  const progressPct = Math.round(progressRaw * 1000) / 10; // Round to 1 decimal
  const barFill = Math.min(progressPct, 100);

  // Color based on progress
  const getProgressColor = () => {
    if (progressPct < 20) return 'hsl(0 84% 60%)'; // red
    if (progressPct < 60) return 'hsl(45 93% 47%)'; // yellow
    if (progressPct < 100) return 'hsl(142 76% 36%)'; // green
    return 'hsl(217 91% 60%)'; // blue
  };

  // Handle level selection
  const handleLevelChange = (value: string) => {
    setSelectedLevel(value as LevelKey | 'custom');
    if (value !== 'custom') {
      const target = levelTargets[value as LevelKey];
      if (target > 0) {
        setGoal(target);
      }
    }
  };

  // Status text
  const getStatusText = () => {
    if (goal === 0) return 'Set a goal to start';
    const levelName = selectedLevel === 'custom' 
      ? 'Custom Goal' 
      : LEVEL_INFO[selectedLevel as LevelKey].title;
    
    if (progressPct >= 100) {
      // Calculate months and years can maintain
      const monthlyExpenses = goal / 12;
      const monthsCanMaintain = monthlyExpenses > 0 ? currentAssets / monthlyExpenses : 0;
      const years = Math.floor(monthsCanMaintain / 12);
      const months = Math.round(monthsCanMaintain % 12);
      
      return `Goal reached for ${levelName} - Can maintain: ${years} year(s), ${months} month(s)`;
    }
    
    return `Building toward ${levelName}`;
  };

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Header with Info Button */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Financial Freedom Progress</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowInfoDialog(true)}
              className="gap-2"
            >
              <HelpCircle className="h-4 w-4" />
              What's a Freedom Number?
            </Button>
          </div>

          {/* Financial Freedom Target Number */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Your Financial Freedom Number</p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-4xl font-bold text-primary">
                {isNumberHidden ? "$•••••" : formatCurrency(levelTargets.freedom || 0)}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsNumberHidden(!isNumberHidden)}
                className="h-8 w-8 p-0"
              >
                {isNumberHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Current Level Badge */}
          {currentLevel ? (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground">
                <span className="text-sm font-semibold">
                  Level {currentLevel.index + 1}: {LEVEL_INFO[currentLevel.level].title}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground">
                <span className="text-sm font-semibold">Building Towards Financial Security</span>
              </div>
            </div>
          )}

          {/* Progress Bar Section */}
          <div className="space-y-3">
            {/* Level Selector */}
            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground">Goal Level:</Label>
              <Select value={selectedLevel} onValueChange={handleLevelChange}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="vitality">Vitality</SelectItem>
                  <SelectItem value="independence">Independence</SelectItem>
                  <SelectItem value="freedom">Freedom</SelectItem>
                  <SelectItem value="absoluteFreedom">Absolute Freedom</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Current and Goal Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">CURRENT</Label>
                <Input
                  type="number"
                  min="0"
                  value={current}
                  className="text-lg font-semibold"
                  placeholder="$0"
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  Net Monthly Cash Flow × 12
                </p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">GOAL</Label>
                <Input
                  type="number"
                  min="0"
                  value={goal}
                  onChange={(e) => setGoal(parseFloat(e.target.value) || 0)}
                  className="text-lg font-semibold"
                  placeholder="$0"
                  disabled={selectedLevel !== 'custom'}
                />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  {goal > 0 ? (
                    <div className="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full transition-all"
                        style={{
                          width: `${barFill}%`,
                          backgroundColor: getProgressColor(),
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-4 w-full rounded-full bg-muted" />
                  )}
                </div>
                <span className="text-sm font-semibold min-w-[50px] text-right">
                  {goal > 0 ? `${progressPct.toFixed(1)}%` : '0.0%'}
                </span>
              </div>

              {/* Status Text */}
              <p className="text-sm text-muted-foreground text-center">
                {getStatusText()}
              </p>

              {/* Current / Goal Display */}
              {goal > 0 && (
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Current: {formatCurrency(current)}</span>
                  <span>Goal: {formatCurrency(goal)}</span>
                </div>
              )}
            </div>
          </div>

          {/* All 5 Levels - Collapsible */}
          <Accordion type="single" collapsible className="border-t pt-2">
            <AccordionItem value="levels" className="border-none">
              <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
                The 5 Levels of Financial Freedom
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-1">
                  {LEVELS.map((level, index) => {
                    const monthlyExpenses = getMonthlyExpenses(level);
                    const isAchieved = monthlyExpenses > 0 && totalExpenses >= monthlyExpenses;
                    const isCurrent = currentLevel?.level === level;
                    const target = levelTargets[level];
                    
                    return (
                      <div
                        key={level}
                        className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                          isCurrent
                            ? 'bg-primary/10 border-2 border-primary'
                            : isAchieved
                            ? 'bg-primary/5 border border-primary/30'
                            : 'bg-muted/30 border border-border'
                        }`}
                      >
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            isAchieved
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className={`font-semibold text-sm ${isAchieved ? 'text-primary' : 'text-foreground'}`}>
                                {LEVEL_INFO[level].title}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                {LEVEL_INFO[level].description}
                              </p>
                            </div>
                            {target > 0 && (
                              <div className="text-right flex-shrink-0 flex items-center gap-1">
                                <p className={`text-xs font-medium ${isAchieved ? 'text-primary' : 'text-muted-foreground'}`}>
                                  {formatCurrency(target)}
                                </p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => handleEditClick(level)}
                                >
                                  <Pencil className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>

      {/* Expense Input Modal */}
      <Dialog open={editingLevel !== null} onOpenChange={(open) => !open && handleCancelEdit()}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Set Target for {editingLevel && LEVEL_INFO[editingLevel].title}
            </DialogTitle>
            <DialogDescription>
              Enter your expected monthly expenses. Toggle the 4% rule to calculate the savings needed based on the standard 4% annual withdrawal rate in retirement.
            </DialogDescription>
          </DialogHeader>

          {/* 4% Rule Toggle */}
          <div className="flex items-center justify-between py-4 border-b">
            <div className="space-y-0.5">
              <Label htmlFor="use-4-percent" className="text-base">Apply 4% Withdrawal Rule</Label>
              <p className="text-sm text-muted-foreground">
                Standard safe withdrawal rate for retirees (4% annually from savings)
              </p>
            </div>
            <Switch
              id="use-4-percent"
              checked={use4PercentRule}
              onCheckedChange={setUse4PercentRule}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="housing">Housing (Rent/Mortgage)</Label>
              <Input
                id="housing"
                type="number"
                min="0"
                max="1000000"
                step="10"
                placeholder="$0"
                value={levelExpenses.housing || ''}
                onChange={(e) => handleExpenseChange('housing', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="utilities">Utilities (Electric, Water, Gas)</Label>
              <Input
                id="utilities"
                type="number"
                min="0"
                max="1000000"
                step="10"
                placeholder="$0"
                value={levelExpenses.utilities || ''}
                onChange={(e) => handleExpenseChange('utilities', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="food">Food & Groceries</Label>
              <Input
                id="food"
                type="number"
                min="0"
                max="1000000"
                step="10"
                placeholder="$0"
                value={levelExpenses.food || ''}
                onChange={(e) => handleExpenseChange('food', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transportation">Transportation (Car, Gas, Transit)</Label>
              <Input
                id="transportation"
                type="number"
                min="0"
                max="1000000"
                step="10"
                placeholder="$0"
                value={levelExpenses.transportation || ''}
                onChange={(e) => handleExpenseChange('transportation', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="healthcare">Healthcare & Medical</Label>
              <Input
                id="healthcare"
                type="number"
                min="0"
                max="1000000"
                step="10"
                placeholder="$0"
                value={levelExpenses.healthcare || ''}
                onChange={(e) => handleExpenseChange('healthcare', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="insurance">Insurance (Health, Life, Auto)</Label>
              <Input
                id="insurance"
                type="number"
                min="0"
                max="1000000"
                step="10"
                placeholder="$0"
                value={levelExpenses.insurance || ''}
                onChange={(e) => handleExpenseChange('insurance', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="entertainment">Entertainment & Lifestyle</Label>
              <Input
                id="entertainment"
                type="number"
                min="0"
                max="1000000"
                step="10"
                placeholder="$0"
                value={levelExpenses.entertainment || ''}
                onChange={(e) => handleExpenseChange('entertainment', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="other">Other Expenses</Label>
              <Input
                id="other"
                type="number"
                min="0"
                max="1000000"
                step="10"
                placeholder="$0"
                value={levelExpenses.other || ''}
                onChange={(e) => handleExpenseChange('other', e.target.value)}
              />
            </div>
          </div>

          {/* Summary */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Total Monthly Expenses:</span>
              <span className="font-bold">{formatCurrency(Object.values(levelExpenses).reduce((sum, val) => sum + val, 0))}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">Annual Expenses:</span>
              <span className="font-bold">{formatCurrency(Object.values(levelExpenses).reduce((sum, val) => sum + val, 0) * 12)}</span>
            </div>
            <div className="flex justify-between text-lg border-t pt-2">
              <span className="font-semibold text-primary">
                {use4PercentRule ? 'Target Savings Needed:' : 'Target Amount:'}
              </span>
              <span className="font-bold text-primary">
                {formatCurrency(use4PercentRule ? calculateTargetFromExpenses() : Object.values(levelExpenses).reduce((sum, val) => sum + val, 0) * 12)}
              </span>
            </div>
            {use4PercentRule && (
              <p className="text-xs text-muted-foreground">
                Based on {(withdrawalRate * 100).toFixed(1)}% safe annual withdrawal rate in retirement
              </p>
            )}
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button onClick={handleSaveExpenses}>
              Save Target
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Info Dialog */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>What's a Freedom Number?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm">
              Your <span className="font-semibold">Financial Freedom Number</span> = the amount of passive income (from investments, notes, real estate, dividends, etc.) you need to fully cover your living expenses — so you no longer rely on a paycheck.
            </p>
            <div className="border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded">
              <p className="text-sm font-medium italic">
                Put simply: When your money makes enough money to pay your bills, you've hit Financial Freedom.
              </p>
            </div>
            <div className="mt-4 p-3 bg-muted/50 rounded text-center">
              <p className="text-sm font-mono font-semibold">
                Freedom Number = Annual Expenses ÷ Withdrawal Rate
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowInfoDialog(false)}>
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

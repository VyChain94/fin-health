import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LEVEL_INFO, LevelKey } from "@/types/moneyLevels";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface FinancialFreedomTrackerProps {
  currentAssets: number;
  levelTargets: Record<LevelKey, number>;
}

const LEVELS: { key: LevelKey | 'custom'; label: string }[] = [
  { key: 'security', label: 'Security' },
  { key: 'vitality', label: 'Vitality' },
  { key: 'independence', label: 'Independence' },
  { key: 'freedom', label: 'Freedom' },
  { key: 'absoluteFreedom', label: 'Absolute Freedom' },
  { key: 'custom', label: 'Custom' },
];

export default function FinancialFreedomTracker({ 
  currentAssets,
  levelTargets,
}: FinancialFreedomTrackerProps) {
  const [current, setCurrent] = useState(0);
  const [goal, setGoal] = useState(600);
  const [selectedLevel, setSelectedLevel] = useState<LevelKey | 'custom'>('security');

  // Handle level selection
  const handleLevelChange = (value: string) => {
    const level = value as LevelKey | 'custom';
    setSelectedLevel(level);
    if (level !== 'custom' && levelTargets[level as LevelKey]) {
      setGoal(levelTargets[level as LevelKey]);
    }
  };

  // Calculate progress
  const progressRaw = goal > 0 ? current / goal : 0;
  const progressPct = Math.round(progressRaw * 1000) / 10; // round to 1 decimal
  const barFill = Math.min(Math.max(progressPct, 0), 100);

  // Determine color
  const getProgressColor = () => {
    if (progressPct < 20) return 'bg-red-500';
    if (progressPct < 60) return 'bg-yellow-500';
    if (progressPct < 100) return 'bg-green-500';
    return 'bg-blue-500';
  };

  // Status text
  const statusText = progressPct >= 100
    ? `Goal reached for ${LEVELS.find(l => l.key === selectedLevel)?.label || 'Custom'}`
    : `Building toward ${LEVELS.find(l => l.key === selectedLevel)?.label || 'Custom'}`;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Financial Freedom Progress</h3>

          {/* Two editable inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">CURRENT</label>
              <Input
                type="number"
                min="0"
                value={current}
                onChange={(e) => setCurrent(Number(e.target.value))}
                className="text-lg font-semibold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">GOAL</label>
              <div className="space-y-2">
                <Select value={selectedLevel} onValueChange={handleLevelChange}>
                  <SelectTrigger className="text-lg font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LEVELS.map((level) => (
                      <SelectItem key={level.key} value={level.key}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedLevel === 'custom' && (
                  <Input
                    type="number"
                    min="0"
                    value={goal}
                    onChange={(e) => setGoal(Number(e.target.value))}
                    className="text-lg font-semibold"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Progress bar with percentage */}
          {goal > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative h-6 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${getProgressColor()}`}
                    style={{ width: `${barFill}%` }}
                  />
                </div>
                <span className="text-sm font-semibold min-w-[60px] text-right">
                  {progressPct.toFixed(1)}%
                </span>
              </div>

              {/* Numbers under bar */}
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Current: {formatCurrency(current)}</span>
                <span>Goal: {formatCurrency(goal)}</span>
              </div>

              {/* Status text */}
              <p className="text-sm text-center text-muted-foreground pt-2">
                {statusText}
              </p>
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              Set a goal to start.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

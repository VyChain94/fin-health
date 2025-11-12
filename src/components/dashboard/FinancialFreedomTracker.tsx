import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LEVEL_INFO, LevelKey } from "@/types/moneyLevels";

interface FinancialFreedomTrackerProps {
  currentAssets: number;
  levelTargets: Record<LevelKey, number>;
  showAmounts?: boolean;
}

const LEVELS: LevelKey[] = ['security', 'vitality', 'independence', 'freedom', 'absoluteFreedom'];

export default function FinancialFreedomTracker({ currentAssets, levelTargets, showAmounts = true }: FinancialFreedomTrackerProps) {
  // Determine current level based on assets
  const getCurrentLevel = (): { level: LevelKey; index: number } | null => {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      const level = LEVELS[i];
      const target = levelTargets[level];
      if (currentAssets >= target && target > 0) {
        return { level, index: i };
      }
    }
    return null;
  };

  const currentLevel = getCurrentLevel();
  const nextLevelIndex = currentLevel ? Math.min(currentLevel.index + 1, LEVELS.length - 1) : 0;
  const nextLevel = LEVELS[nextLevelIndex];
  const nextLevelTarget = levelTargets[nextLevel];
  
  // Calculate overall progress to next level
  const progressToNextLevel = currentLevel && nextLevelTarget > 0
    ? Math.min((currentAssets / nextLevelTarget) * 100, 100)
    : nextLevelTarget > 0 
    ? Math.min((currentAssets / nextLevelTarget) * 100, 100)
    : 0;

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
        <div className="space-y-6">
          {/* Current Number */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Your Financial Freedom Number</p>
            <p className="text-4xl font-bold text-primary">
              {showAmounts ? formatCurrency(currentAssets) : "$•••••"}
            </p>
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

          {/* Progress to Next Level */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {currentLevel && currentLevel.index < LEVELS.length - 1
                  ? `Progress to ${LEVEL_INFO[nextLevel].title}`
                  : currentLevel
                  ? 'Maximum Level Achieved!'
                  : `Progress to ${LEVEL_INFO[nextLevel].title}`
                }
              </span>
              <span className="font-medium">{progressToNextLevel.toFixed(1)}%</span>
            </div>
            <Progress value={progressToNextLevel} className="h-3" />
            {nextLevelTarget > 0 && showAmounts && (
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatCurrency(currentAssets)}</span>
                <span>{formatCurrency(nextLevelTarget)}</span>
              </div>
            )}
          </div>

          {/* All 5 Levels */}
          <div className="space-y-3 pt-2 border-t">
            <p className="text-sm font-semibold text-center mb-3">The 5 Levels of Financial Freedom</p>
            {LEVELS.map((level, index) => {
              const isAchieved = levelTargets[level] > 0 && currentAssets >= levelTargets[level];
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
                      {target > 0 && showAmounts && (
                        <div className="text-right flex-shrink-0">
                          <p className={`text-xs font-medium ${isAchieved ? 'text-primary' : 'text-muted-foreground'}`}>
                            {formatCurrency(target)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
